// ============================================================
// STORAGE + SPACED REPETITION (Leitner 5-box system)
// Exposed as window.Store
// ============================================================

(function () {
  const KEY = 'magyar-store-v1';

  // Leitner box intervals (in days)
  const INTERVALS = { 0: 0, 1: 1, 2: 2, 3: 4, 4: 7, 5: 14 };

  function defaultState() {
    return {
      progress: {},   // { [lessonId]: { firstCompleted, lastAttempted, attempts: [{score,total,date}], best: {score,total} } }
      srs: {},        // { [cardId]: { box, last, next, wrong } }
      settings: {
        theme: 'auto',       // 'light' | 'dark' | 'auto'
        audio: true,         // enable speech synthesis
        autoNext: false,     // auto-advance on correct
      },
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const s = JSON.parse(raw);
      // Merge in defaults so new fields don't break old data
      const def = defaultState();
      return { ...def, ...s, settings: { ...def.settings, ...(s.settings || {}) } };
    } catch (_e) {
      return defaultState();
    }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (_e) { /* storage quota or private mode — ignore */ }
  }

  function todayStr() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function addDays(dateStr, days) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  // -------- SRS update --------
  // Called after answering. correct=true → bump up box (cap 5).
  // correct=false → drop to box 1, increment wrong counter.
  function updateCard(state, cardId, correct) {
    const today = todayStr();
    const cur = state.srs[cardId] || { box: 0, last: null, next: today, wrong: 0 };
    const nextBox = correct ? Math.min(5, cur.box + 1) : 1;
    const interval = INTERVALS[nextBox] ?? 1;
    state.srs[cardId] = {
      box: nextBox,
      last: today,
      next: addDays(today, interval),
      wrong: cur.wrong + (correct ? 0 : 1),
    };
    return state;
  }

  // Get card IDs that are due for review today (across all lessons).
  function dueCards(state) {
    const today = todayStr();
    const out = [];
    for (const [id, card] of Object.entries(state.srs)) {
      if (!card.next || card.next <= today) out.push({ id, ...card });
    }
    // Sort: most overdue first, then by lowest box (struggling cards first)
    out.sort((a, b) => (a.next || '').localeCompare(b.next || '') || a.box - b.box);
    return out;
  }

  // -------- Lesson progress --------
  function recordAttempt(state, lessonId, score, total) {
    const cur = state.progress[lessonId] || { firstCompleted: null, lastAttempted: null, attempts: [], best: null };
    const today = todayStr();
    cur.attempts = (cur.attempts || []).slice(-9); // keep last 10
    cur.attempts.push({ score, total, date: today });
    cur.lastAttempted = today;
    if (!cur.firstCompleted && score >= total * 0.6) cur.firstCompleted = today;
    if (!cur.best || score > cur.best.score || (score === cur.best.score && total > cur.best.total)) {
      cur.best = { score, total };
    }
    state.progress[lessonId] = cur;
    return state;
  }

  // -------- Quiz generation with random pool sampling --------
  // Given a quiz spec from lessons.js, expand pool questions into
  // concrete questions by sampling. Static questions pass through.
  function buildQuizQuestions(quizSpec, srsState, lessonId) {
    const result = [];

    quizSpec.forEach((spec, qIdx) => {

      if (spec.type === 'mc' || spec.type === 'fill') {
        const cardId = `${lessonId}:${spec.id || qIdx}`;
        result.push({
          ...spec,
          cardId,
          renderedQ: spec.q,
        });
        return;
      }

      if (spec.type === 'pool-mc' || spec.type === 'pool-fill') {
        const sampled = sampleFromPool(spec.pool, spec.draws || 3, srsState, lessonId, spec.id || qIdx);
        sampled.forEach((item) => {
          const cardId = `${lessonId}:${spec.id || qIdx}:${item.w}`;
          const q = (spec.template || '{w}').replace(/\{w\}/g, item.w);
          const tr = spec.translation ? spec.translation.replace(/\{w\}/g, item.w) : null;
          if (spec.type === 'pool-mc') {
            result.push({
              type: 'mc',
              cardId,
              renderedQ: q,
              translation: tr,
              opts: spec.opts,
              a: item.a,
              exp: item.exp,
              hint: spec.hint,
              poolWord: item.w,
            });
          } else {
            result.push({
              type: 'fill',
              cardId,
              renderedQ: q,
              translation: tr,
              a: Array.isArray(item.a) ? item.a : [item.a],
              exp: item.exp,
              hint: spec.hint,
              poolWord: item.w,
            });
          }
        });
      }
    });

    return result;
  }

  // Smart sampling: prefer cards the user has gotten wrong, items
  // they haven't seen in a while, and new (unseen) items. Randomize
  // among the priority tier so the quiz feels different each time.
  function sampleFromPool(pool, draws, srsState, lessonId, qSpecId) {
    const today = todayStr();
    const scored = pool.map((item) => {
      const cardId = `${lessonId}:${qSpecId}:${item.w}`;
      const card = srsState.srs[cardId];
      let priority;
      if (!card)                priority = 2;          // unseen — show
      else if (card.box <= 1)   priority = 3;          // struggling — boost
      else if (card.next && card.next <= today) priority = 2;  // due
      else                      priority = 1;          // mastered — backseat
      // Add tiny random tiebreaker
      return { item, priority, jitter: Math.random() };
    });

    scored.sort((a, b) => b.priority - a.priority || b.jitter - a.jitter);
    return scored.slice(0, Math.min(draws, pool.length)).map((s) => s.item);
  }

  // -------- Speech synthesis (audio pronunciation) --------
  let voicesLoaded = false;
  let huVoice = null;
  function getHungarianVoice() {
    if (voicesLoaded) return huVoice;
    const all = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
    if (all.length === 0) return null;
    voicesLoaded = true;
    huVoice = all.find((v) => /hu(-|_)?/i.test(v.lang)) || all.find((v) => /hungar/i.test(v.name)) || null;
    return huVoice;
  }
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.onvoiceschanged = () => { voicesLoaded = false; getHungarianVoice(); };
    setTimeout(getHungarianVoice, 200);
  }
  function speak(text) {
    if (!('speechSynthesis' in window)) return;
    if (!text) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hu-HU';
      const v = getHungarianVoice();
      if (v) u.voice = v;
      u.rate = 0.9;
      u.pitch = 1.0;
      speechSynthesis.speak(u);
    } catch (_e) {}
  }
  function hasHungarianVoice() {
    return !!getHungarianVoice();
  }

  // -------- Theme detection --------
  function effectiveTheme(setting) {
    if (setting === 'dark') return 'dark';
    if (setting === 'light') return 'light';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // -------- Markdown-light: support **bold** and `code` and _italic_ --------
  // Returns array of React elements OR strings — caller handles rendering.
  function renderMarkdown(text) {
    if (!text) return text;
    const parts = [];
    let rest = text;
    // Very small parser: handle **bold** then _italic_ then `code`
    const tokens = [];
    const regex = /(\*\*[^*]+\*\*)|(_[^_]+_)|(`[^`]+`)/g;
    let last = 0;
    let m;
    while ((m = regex.exec(rest)) !== null) {
      if (m.index > last) tokens.push({ type: 'text', value: rest.slice(last, m.index) });
      const t = m[0];
      if (t.startsWith('**')) tokens.push({ type: 'b', value: t.slice(2, -2) });
      else if (t.startsWith('_')) tokens.push({ type: 'i', value: t.slice(1, -1) });
      else if (t.startsWith('`')) tokens.push({ type: 'code', value: t.slice(1, -1) });
      last = m.index + t.length;
    }
    if (last < rest.length) tokens.push({ type: 'text', value: rest.slice(last) });
    return tokens;
  }

  // -------- Public API --------
  window.Store = {
    load, save,
    updateCard, dueCards, recordAttempt,
    buildQuizQuestions,
    speak, hasHungarianVoice,
    effectiveTheme, renderMarkdown,
    todayStr,
  };
})();
