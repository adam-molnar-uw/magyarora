// ============================================================
// MAGYAR — Hungarian Lessons PWA — Main App
// ============================================================

const { useState, useEffect, useMemo, useCallback, useRef } = React;
const { speak, hasHungarianVoice, effectiveTheme, renderMarkdown, todayStr } = window.Store;

// ============================================================
// ICONS
// ============================================================
const Svg = ({ d, size = 16, sw = 2, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);
const I = {
  Sparkles:  () => <Svg size={13} d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3z" />,
  Sun:       () => <Svg d="M12 3v1m0 16v1M5.6 5.6l.7.7m11.4 11.4l.7.7M3 12h1m16 0h1M5.6 18.4l.7-.7m11.4-11.4l.7-.7"><circle cx="12" cy="12" r="4" /></Svg>,
  Moon:      () => <Svg d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  Book:      () => <Svg d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />,
  Brain:     () => <Svg d="M9.5 2A2.5 2.5 0 0 0 7 4.5v15A2.5 2.5 0 0 0 9.5 22h.5V2zM14 2v20h.5a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 14.5 2z" />,
  Settings:  () => <Svg d="M12 1l1.5 4.5L18 7l-3 3.5L16 15l-4-2-4 2 1-4.5L6 7l4.5-1.5z" />,
  Trophy:    ({size=56}) => <Svg size={size} sw={1.25} d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z" />,
  Check:     ({size=16}) => <Svg size={size} d="M20 6L9 17l-5-5" />,
  X:         ({size=16}) => <Svg size={size} d="M18 6L6 18M6 6l12 12" />,
  Arrow:     () => <Svg d="M5 12h14M12 5l7 7-7 7" />,
  ArrowL:    () => <Svg d="M19 12H5M12 19l-7-7 7-7" />,
  ChevD:     () => <Svg d="M6 9l6 6 6-6" />,
  Rotate:    () => <Svg d="M3 12a9 9 0 1 0 9-9M3 12V4M3 12h8" />,
  Volume:    ({size=14}) => <Svg size={size} sw={1.8} d="M11 5L6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />,
  Calendar:  () => <Svg d="M3 4h18v18H3zM3 10h18M8 2v4M16 2v4" />,
  Award:     ({size=32}) => <Svg size={size} sw={1.5}><circle cx="12" cy="9" r="6" /><path d="M9 14l-2 8 5-3 5 3-2-8" /></Svg>,
  Flame:     () => <Svg d="M14 2c0 4-2 6-2 6s-2 0-3 3 1 6 1 6-3 0-3 4 4 5 7 5 7-3 7-7c0-7-7-12-7-17z" />,
};

// ============================================================
// MARKDOWN-LIGHT RENDER
// ============================================================
function MD({ text }) {
  if (!text) return null;
  const tokens = renderMarkdown(text);
  if (typeof tokens === 'string') return tokens;
  return tokens.map((t, i) => {
    if (t.type === 'b')    return <b key={i}>{t.value}</b>;
    if (t.type === 'i')    return <em key={i}>{t.value}</em>;
    if (t.type === 'code') return <code key={i}>{t.value}</code>;
    return <React.Fragment key={i}>{t.value}</React.Fragment>;
  });
}
function MDLines({ lines }) {
  return lines.map((line, i) => {
    if (line.startsWith('- ')) {
      return <li key={i}><MD text={line.slice(2)} /></li>;
    }
    return <p key={i}><MD text={line} /></p>;
  });
}
function MDBlock({ body }) {
  if (!body) return null;
  if (Array.isArray(body)) {
    // Group consecutive `- ` lines into a <ul>
    const out = [];
    let buf = [];
    body.forEach((line, i) => {
      if (line.startsWith('- ')) buf.push(line);
      else {
        if (buf.length) { out.push(<ul key={'u' + i}>{buf.map((l, j) => <li key={j}><MD text={l.slice(2)} /></li>)}</ul>); buf = []; }
        out.push(<p key={i}><MD text={line} /></p>);
      }
    });
    if (buf.length) out.push(<ul key="u-last">{buf.map((l, j) => <li key={j}><MD text={l.slice(2)} /></li>)}</ul>);
    return <>{out}</>;
  }
  return <p><MD text={body} /></p>;
}

// ============================================================
// AUDIO BUTTON
// ============================================================
function Speak({ text, size }) {
  const [audio, setAudio] = useState(true);
  useEffect(() => {
    const s = window.Store.load();
    setAudio(!!s.settings.audio);
  }, []);
  if (!audio) return null;
  return (
    <button className={`speak-btn ${size === 'lg' ? 'lg' : ''}`} aria-label={`Speak ${text}`}
      onClick={(e) => { e.stopPropagation(); speak(text); }}>
      <I.Volume size={size === 'lg' ? 16 : 14} />
    </button>
  );
}

// ============================================================
// SECTION RENDERERS
// ============================================================

function SectionShell({ num, title, subtitle, children }) {
  return (
    <section className="lesson-sec">
      <div className="sec-head">
        <span className="sec-num">{String(num).padStart(2, '0')}</span>
        <div className="sec-titles">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="divider" />
      {children}
    </section>
  );
}

function VowelsSection({ items }) {
  return (
    <div className="grid-2">
      {items.map((v, i) => (
        <div key={i} className="card card-hover">
          <div className="card-letter">{v.letter}</div>
          <div className="card-desc">{v.desc}</div>
          <div className="pills">
            {v.examples.map(([w, t], j) => (
              <div key={j} className="pill">
                <b>{w}</b>
                <Speak text={w} />
                <span className="opacity">— {t}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ConsonantsSection({ items }) {
  return (
    <div className="grid-cons">
      {items.map((c, i) => (
        <div key={i} className="card card-hover cons-card">
          <div className="card-letter" style={{ fontSize: '28px', marginBottom: 0 }}>{c.letter}</div>
          <div className="lbl">{c.sound}</div>
          <div className="ex" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            {c.ex} <Speak text={c.ex} />
          </div>
          <div className="tr">{c.tr}</div>
        </div>
      ))}
    </div>
  );
}

function CardsSection({ section }) {
  const cols = section.columns === 2 ? 'grid-2' : section.columns === 4 ? 'grid-4' : 'grid-3';
  return (
    <>
      {section.intro && <p className="intro-text"><MD text={section.intro} /></p>}
      <div className={cols}>
        {section.items.map((item, i) => {
          if (item.style) {
            // styled card (deep / mixed / high)
            return (
              <div key={i} className={`styled-card ${item.style}`}>
                {item.eyebrow && <div className="styled-eyebrow">{item.eyebrow}</div>}
                {item.title && <div className="styled-title">{item.title}</div>}
                {item.sub && <div className="styled-sub">{item.sub}</div>}
                {item.list && (
                  <ul className="styled-list">
                    {item.list.map((entry, j) => {
                      if (Array.isArray(entry)) {
                        return (
                          <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <b>{entry[0]}</b>
                            <Speak text={entry[0]} />
                            <em>— {entry[1]}</em>
                          </li>
                        );
                      }
                      return <li key={j}><MD text={entry} /></li>;
                    })}
                  </ul>
                )}
              </div>
            );
          }
          // rule card
          return (
            <div key={i} className="card card-hover">
              {item.ruleTitle && <div className="rule-title">{item.ruleTitle}</div>}
              {item.ruleSub && <div className="rule-sub">{item.ruleSub}</div>}
              {item.list && (
                <ul className="rule-list">
                  {item.list.map((entry, j) => (
                    <li key={j}><MD text={entry} /></li>
                  ))}
                </ul>
              )}
              {item.note && <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--accent)', marginTop: 12 }}>{item.note}</p>}
            </div>
          );
        })}
      </div>
      {section.callout && (
        <div className="callout">
          {section.callout.title && <span className="callout-title">{section.callout.title} </span>}
          <MD text={section.callout.body} />
        </div>
      )}
      {section.collapsibles && section.collapsibles.length > 0 && (
        <div className="collap-wrap">
          {section.collapsibles.map((c, i) => <Collapsible key={i} title={c.title} body={c.body} />)}
        </div>
      )}
    </>
  );
}

function Collapsible({ title, body }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`collap ${open ? 'open' : ''}`}>
      <button className="collap-trigger" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <I.ChevD />
      </button>
      {open && <div className="collap-body"><MDBlock body={body} /></div>}
    </div>
  );
}

function WordgridSection({ section }) {
  return (
    <>
      {section.intro && <p className="intro-text"><MD text={section.intro} /></p>}
      <div className="grid-4">
        {section.items.map((it, i) => (
          <div key={i} className="card card-hover wg-card">
            <div className="wg-base">{it.base}</div>
            <div className="wg-full">{it.full} <Speak text={it.full} /></div>
          </div>
        ))}
      </div>
    </>
  );
}

function TableSection({ section }) {
  const accentSet = new Set(section.accentCols || []);
  return (
    <>
      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              {section.headers.map((h, i) => (
                <th key={i} className={accentSet.has(i) ? 'accent' : (i % 3 === 1 ? 'muted' : '')}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={i}>
                {row.map((c, j) => <td key={j} className={accentSet.has(j) ? 'bold' : ''}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.note && <p className="table-note"><MD text={section.note} /></p>}
    </>
  );
}

function PhrasesSection({ section }) {
  return (
    <div className="grid-2">
      {section.items.map((item, i) => (
        <div key={i} className="card card-hover fn-card">
          <div className="fn-q">{item.q} <Speak text={item.q} /></div>
          <div className="fn-en">{item.en}</div>
          <div className="fn-a"><span className="arrow">→</span> {item.a} <Speak text={item.a} /></div>
        </div>
      ))}
    </div>
  );
}

const SECTION_RENDERERS = {
  vowels:     ({ section }) => <VowelsSection items={section.items} />,
  consonants: ({ section }) => <ConsonantsSection items={section.items} />,
  cards:      CardsSection,
  wordgrid:   WordgridSection,
  table:      TableSection,
  phrases:    PhrasesSection,
};

// ============================================================
// LESSON VIEW
// ============================================================
function LessonView({ lesson, onBack, onStartQuiz }) {
  return (
    <div className="fade-up">
      <button className="back-btn" onClick={onBack}><I.ArrowL /> All lessons</button>

      <div className="hero">
        <div className="hero-eyebrow"><I.Sparkles /> <span>Magyar · Week {lesson.week}</span></div>
        <h1 className="hero-title">{lesson.title}</h1>
        <p className="hero-sub">{lesson.subtitle}</p>
      </div>

      {lesson.sections.map((sec, i) => {
        const Renderer = SECTION_RENDERERS[sec.type];
        if (!Renderer) return null;
        return (
          <SectionShell key={i} num={i + 1} title={sec.title} subtitle={sec.subtitle}>
            <Renderer section={sec} />
          </SectionShell>
        );
      })}

      <div className="cta">
        <p className="cta-line">Készen állsz?<span>Ready?</span></p>
        <button onClick={onStartQuiz} className="btn-primary">Take the quiz <I.Arrow /></button>
      </div>
    </div>
  );
}

// ============================================================
// QUIZ VIEW
// ============================================================
function QuizView({ lesson, onBack, onComplete }) {
  // Build randomized questions once per quiz attempt
  const questions = useMemo(() => {
    const state = window.Store.load();
    return window.Store.buildQuizQuestions(lesson.quiz, state, lesson.id);
  }, [lesson.id]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);

  const q = questions[idx];
  const total = questions.length;

  useEffect(() => {
    if (q && q.type === 'fill' && inputRef.current) inputRef.current.focus();
  }, [idx, q]);

  if (!q && !done) {
    return <div className="quiz-box"><p>No quiz questions available.</p></div>;
  }

  const isFillCorrect = () => {
    const clean = text.trim().toLowerCase().replace(/[.!?,]/g, '');
    return q.a.some((ans) => String(ans).toLowerCase() === clean);
  };
  const correct = q && (q.type === 'mc' ? selected === q.a : isFillCorrect());
  const canSubmit = q && (q.type === 'mc' ? selected !== null : text.trim().length > 0);

  const submit = () => {
    if (correct) setScore((s) => s + 1);
    // Update SRS
    const state = window.Store.load();
    window.Store.updateCard(state, q.cardId, !!correct);
    window.Store.save(state);
    setSubmitted(true);
  };

  const next = () => {
    if (idx + 1 >= total) {
      const state = window.Store.load();
      window.Store.recordAttempt(state, lesson.id, score, total);
      window.Store.save(state);
      setDone(true);
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setText('');
      setSubmitted(false);
    }
  };

  const restart = () => {
    onComplete && onComplete();
  };

  if (done) {
    const pct = Math.round((score / total) * 100);
    let msg = '';
    if (pct === 100)      msg = "Tökéletes! Perfect — you've mastered this lesson.";
    else if (pct >= 80)   msg = 'Nagyon jó! Very strong work.';
    else if (pct >= 60)   msg = "Jól csinálod. Good — review the tricky bits and try again.";
    else                  msg = "Don't worry — review the lesson and try again. Hungarian rewards patience.";
    return (
      <div className="quiz-box">
        <div className="results">
          <I.Trophy />
          <div className="results-score">{score}<span>/{total}</span></div>
          <p className="results-msg">{msg}</p>
          <div className="results-actions">
            <button onClick={() => { setIdx(0); setSelected(null); setText(''); setSubmitted(false); setScore(0); setDone(false); }} className="btn-ghost"><I.Rotate /> Try again</button>
            <button onClick={onBack} className="btn-primary">Back to lesson <I.Arrow /></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={onBack}><I.ArrowL /> Back to lesson</button>

      <div className="quiz-box">
        <div className="quiz-meta">
          <span>Question <b>{idx + 1}</b> of {total}</span>
          <span>Score: <b>{score}</b></span>
        </div>
        <div className="progress"><div className="progress-bar" style={{ width: `${(idx / total) * 100}%` }} /></div>

        <div className="fade-up" key={idx}>
          <h3 className="quiz-q">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {q.renderedQ}
              {q.poolWord && <Speak text={q.poolWord} size="lg" />}
            </span>
          </h3>
          {q.translation && <p className="hint" style={{ marginTop: -16, marginBottom: 18 }}>{q.translation}</p>}

          {q.type === 'mc' && (
            <div className="opts">
              {q.opts.map((opt, i) => {
                let cls = 'opt';
                if (submitted) {
                  if (i === q.a) cls += ' correct';
                  else if (i === selected) cls += ' wrong';
                  else cls += ' dim';
                } else if (selected === i) cls += ' selected';
                return (
                  <button key={i} disabled={submitted} onClick={() => setSelected(i)} className={cls}>
                    <span>{opt}</span>
                    {submitted && i === q.a && <I.Check size={20} />}
                    {submitted && i === selected && i !== q.a && <I.X size={20} />}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === 'fill' && (
            <div>
              <input
                ref={inputRef}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={submitted}
                onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit && !submitted) submit(); }}
                placeholder="Type your answer…"
                className={`fill-input ${submitted ? (correct ? 'correct' : 'wrong') : ''}`}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {q.hint && !submitted && <p className="hint">hint: {q.hint}</p>}
            </div>
          )}

          {submitted && (
            <div className={`feedback ${correct ? 'ok' : 'no'}`}>
              {correct ? <I.Check size={20} /> : <I.X size={20} />}
              <div>
                <div className="ttl">
                  {correct ? 'Helyes! (Correct)' : `Nem egészen. Answer: ${q.type === 'fill' ? q.a[0] : q.opts[q.a]}`}
                </div>
                <div className="exp">{q.exp}</div>
              </div>
            </div>
          )}

          <div className="quiz-actions">
            {!submitted ? (
              <button onClick={submit} disabled={!canSubmit} className="btn-primary">Check <I.Arrow /></button>
            ) : (
              <button onClick={next} className="btn-primary">{idx + 1 >= total ? 'See results' : 'Next'} <I.Arrow /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// REVIEW VIEW (spaced repetition)
// ============================================================
function ReviewView({ lessons, onBack }) {
  // Build a map of cardId → lesson + question spec
  const cardIndex = useMemo(() => {
    const map = {};
    lessons.forEach((lesson) => {
      lesson.quiz.forEach((spec, qi) => {
        if (spec.type === 'mc' || spec.type === 'fill') {
          const id = `${lesson.id}:${spec.id || qi}`;
          map[id] = { lessonId: lesson.id, lessonTitle: lesson.title, spec, qi };
        } else if (spec.type === 'pool-mc' || spec.type === 'pool-fill') {
          spec.pool.forEach((item) => {
            const id = `${lesson.id}:${spec.id || qi}:${item.w}`;
            map[id] = { lessonId: lesson.id, lessonTitle: lesson.title, spec, qi, poolItem: item };
          });
        }
      });
    });
    return map;
  }, [lessons]);

  const [storeState] = useState(() => window.Store.load());
  const dueIds = useMemo(() => window.Store.dueCards(storeState).map((c) => c.id).filter((id) => cardIndex[id]), [storeState, cardIndex]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [stats, setStats] = useState({ right: 0, wrong: 0 });
  const [done, setDone] = useState(false);

  if (dueIds.length === 0) {
    const totalLearned = Object.keys(storeState.srs).length;
    return (
      <div>
        <button className="back-btn" onClick={onBack}><I.ArrowL /> Back</button>
        <div className="hero">
          <div className="hero-eyebrow"><I.Brain /> <span>Review</span></div>
          <h1 className="hero-title">Nincs mit átnézni</h1>
          <p className="hero-sub">Nothing to review right now.</p>
        </div>
        <div className="empty">
          <div className="empty-title">{totalLearned > 0 ? 'You\'re up to date.' : 'Take a quiz first'}</div>
          <p>{totalLearned > 0
            ? `${totalLearned} card${totalLearned === 1 ? '' : 's'} in your review queue. Come back tomorrow!`
            : 'Cards you answer in lesson quizzes will appear here for spaced-repetition review.'}</p>
          <button onClick={onBack} className="btn-ghost" style={{ marginTop: 20 }}>Browse lessons</button>
        </div>
      </div>
    );
  }

  const current = cardIndex[dueIds[idx]];
  const isPool = !!current.poolItem;
  const item = current.poolItem || {};
  const spec = current.spec;

  // Build a pseudo-question for rendering
  const q = isPool
    ? (spec.type === 'pool-mc'
        ? { type: 'mc', renderedQ: spec.template.replace('{w}', item.w), opts: spec.opts, a: item.a, exp: item.exp, hint: spec.hint, poolWord: item.w, translation: spec.translation ? spec.translation.replace('{w}', item.w) : null }
        : { type: 'fill', renderedQ: spec.template.replace('{w}', item.w), a: [item.a], exp: item.exp, hint: spec.hint, poolWord: item.w, translation: spec.translation ? spec.translation.replace('{w}', item.w) : null })
    : { type: spec.type, renderedQ: spec.q, opts: spec.opts, a: spec.a, exp: spec.exp, hint: spec.hint };

  const isFillCorrect = () => {
    const clean = text.trim().toLowerCase().replace(/[.!?,]/g, '');
    return q.a.some((ans) => String(ans).toLowerCase() === clean);
  };
  const correct = q.type === 'mc' ? selected === q.a : isFillCorrect();
  const canSubmit = q.type === 'mc' ? selected !== null : text.trim().length > 0;

  const submit = () => {
    setStats((s) => ({ right: s.right + (correct ? 1 : 0), wrong: s.wrong + (correct ? 0 : 1) }));
    const state = window.Store.load();
    window.Store.updateCard(state, dueIds[idx], !!correct);
    window.Store.save(state);
    setSubmitted(true);
  };

  const next = () => {
    if (idx + 1 >= dueIds.length) setDone(true);
    else { setIdx(idx + 1); setSelected(null); setText(''); setSubmitted(false); }
  };

  if (done) {
    return (
      <div>
        <button className="back-btn" onClick={onBack}><I.ArrowL /> Back</button>
        <div className="quiz-box">
          <div className="results">
            <I.Award size={56} />
            <div className="results-score">{stats.right}<span>/{stats.right + stats.wrong}</span></div>
            <p className="results-msg">Review complete. Cards you got right move up; misses come back sooner.</p>
            <div className="results-actions">
              <button onClick={onBack} className="btn-primary">Done <I.Arrow /></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button className="back-btn" onClick={onBack}><I.ArrowL /> Back</button>

      <div className="review-summary">
        <I.Brain />
        <div>
          <div className="text">
            <b>{dueIds.length - idx} card{dueIds.length - idx === 1 ? '' : 's'} due</b>
            From {current.lessonTitle}
          </div>
        </div>
      </div>

      <div className="quiz-box">
        <div className="quiz-meta">
          <span>Card <b>{idx + 1}</b> of {dueIds.length}</span>
          <span><b style={{ color: 'var(--success-text)' }}>{stats.right}</b> · <b style={{ color: 'var(--error-text)' }}>{stats.wrong}</b></span>
        </div>
        <div className="progress"><div className="progress-bar" style={{ width: `${(idx / dueIds.length) * 100}%` }} /></div>

        <div className="fade-up" key={idx}>
          <h3 className="quiz-q">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {q.renderedQ}
              {q.poolWord && <Speak text={q.poolWord} size="lg" />}
            </span>
          </h3>
          {q.translation && <p className="hint" style={{ marginTop: -16, marginBottom: 18 }}>{q.translation}</p>}

          {q.type === 'mc' && (
            <div className="opts">
              {q.opts.map((opt, i) => {
                let cls = 'opt';
                if (submitted) {
                  if (i === q.a) cls += ' correct';
                  else if (i === selected) cls += ' wrong';
                  else cls += ' dim';
                } else if (selected === i) cls += ' selected';
                return (
                  <button key={i} disabled={submitted} onClick={() => setSelected(i)} className={cls}>
                    <span>{opt}</span>
                    {submitted && i === q.a && <I.Check size={20} />}
                    {submitted && i === selected && i !== q.a && <I.X size={20} />}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === 'fill' && (
            <div>
              <input
                type="text" autoFocus value={text}
                onChange={(e) => setText(e.target.value)} disabled={submitted}
                onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit && !submitted) submit(); }}
                placeholder="Type your answer…"
                className={`fill-input ${submitted ? (correct ? 'correct' : 'wrong') : ''}`}
                autoCapitalize="off" autoCorrect="off" spellCheck="false"
              />
              {q.hint && !submitted && <p className="hint">hint: {q.hint}</p>}
            </div>
          )}

          {submitted && (
            <div className={`feedback ${correct ? 'ok' : 'no'}`}>
              {correct ? <I.Check size={20} /> : <I.X size={20} />}
              <div>
                <div className="ttl">
                  {correct ? 'Helyes!' : `Nem egészen. Answer: ${q.type === 'fill' ? q.a[0] : q.opts[q.a]}`}
                </div>
                <div className="exp">{q.exp}</div>
              </div>
            </div>
          )}

          <div className="quiz-actions">
            {!submitted ? (
              <button onClick={submit} disabled={!canSubmit} className="btn-primary">Check <I.Arrow /></button>
            ) : (
              <button onClick={next} className="btn-primary">{idx + 1 >= dueIds.length ? 'See results' : 'Next'} <I.Arrow /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// HOME (LESSONS LIST)
// ============================================================
function Home({ lessons, storeState, onPickLesson, onReview }) {
  const dueCount = window.Store.dueCards(storeState).length;
  const completedCount = Object.values(storeState.progress).filter((p) => p.firstCompleted).length;
  const totalCards = Object.keys(storeState.srs).length;

  return (
    <div className="fade-up">
      <div className="hero">
        <div className="hero-eyebrow"><I.Sparkles /> <span>Magyar · Hungarian</span></div>
        <h1 className="hero-title">Üdvözöllek</h1>
        <p className="hero-sub">Welcome — pick up where you left off.</p>
      </div>

      <div className="stats">
        <div className="stat">
          <div className="stat-num">{lessons.length}</div>
          <div className="stat-label">Lessons</div>
        </div>
        <div className="stat">
          <div className="stat-num">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <button className="stat" onClick={onReview} style={{ border: 'none', cursor: 'pointer' }}>
          <div className="stat-num">{dueCount}</div>
          <div className="stat-label">{dueCount === 0 ? 'Up to date' : 'Due review'}</div>
        </button>
      </div>

      {lessons.length === 0 ? (
        <div className="empty">
          <div className="empty-title">No lessons yet</div>
          <p>Edit <code>lessons.js</code> to add your first lesson.</p>
        </div>
      ) : (
        <div className="lesson-list">
          {lessons.map((lesson) => {
            const prog = storeState.progress[lesson.id];
            return (
              <button key={lesson.id} className="lesson-card" onClick={() => onPickLesson(lesson)}>
                <div className="lesson-num">{String(lesson.week).padStart(2, '0')}</div>
                <div className="lesson-info">
                  <div className="lesson-title">{lesson.title}</div>
                  <div className="lesson-sub">{lesson.subtitle}</div>
                </div>
                <div className="lesson-meta">
                  {prog && prog.best && (
                    <span className="lesson-meta-item complete">
                      <I.Check size={11} /> {prog.best.score}/{prog.best.total}
                    </span>
                  )}
                  {prog && prog.attempts && prog.attempts.length > 0 && (
                    <span className="lesson-meta-item">
                      <I.Rotate /> {prog.attempts.length}×
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// SETTINGS VIEW
// ============================================================
function SettingsView({ onBack, onChange }) {
  const [state, setState] = useState(() => window.Store.load());

  const updateSetting = (key, value) => {
    const next = { ...state, settings: { ...state.settings, [key]: value } };
    setState(next);
    window.Store.save(next);
    onChange && onChange(next);
  };

  const setTheme = (theme) => updateSetting('theme', theme);

  const reset = () => {
    if (!confirm('Reset all progress and review history? This cannot be undone.')) return;
    const fresh = { progress: {}, srs: {}, settings: state.settings };
    setState(fresh);
    window.Store.save(fresh);
    onChange && onChange(fresh);
  };

  const hasHuVoice = hasHungarianVoice();

  return (
    <div className="fade-up">
      <button className="back-btn" onClick={onBack}><I.ArrowL /> Back</button>

      <div className="hero">
        <div className="hero-eyebrow"><I.Settings /> <span>Settings</span></div>
        <h1 className="hero-title">Beállítások</h1>
      </div>

      <div className="card">

        <div className="settings-row">
          <div>
            <div className="settings-label">Theme</div>
            <div className="settings-desc">Light, dark, or follow your device</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['auto', 'light', 'dark'].map((t) => (
              <button key={t} onClick={() => setTheme(t)}
                className="opt" style={{ padding: '8px 14px', fontSize: 13, textTransform: 'capitalize',
                  borderColor: state.settings.theme === t ? 'var(--accent)' : 'var(--border-input)',
                  background: state.settings.theme === t ? 'var(--accent-soft)' : 'var(--surface-solid)' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">Audio pronunciation</div>
            <div className="settings-desc">{hasHuVoice ? 'Tap 🔊 buttons to hear Hungarian words' : 'No Hungarian voice on this device — words will read in default voice'}</div>
          </div>
          <button className={`toggle ${state.settings.audio ? 'on' : ''}`} onClick={() => updateSetting('audio', !state.settings.audio)} aria-label="Toggle audio" />
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">App version</div>
            <div className="settings-desc">Lessons: {window.LESSONS_VERSION || 'unknown'}</div>
          </div>
        </div>

        <div className="settings-row">
          <div>
            <div className="settings-label">Reset everything</div>
            <div className="settings-desc">Clears progress, scores, and review queue</div>
          </div>
          <button onClick={reset} className="danger-btn">Reset</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function App() {
  const [view, setView] = useState({ name: 'home' });
  const [storeState, setStoreState] = useState(() => window.Store.load());
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // Apply theme on mount and whenever setting changes
  useEffect(() => {
    const apply = () => {
      const theme = effectiveTheme(storeState.settings.theme);
      document.documentElement.dataset.theme = theme;
    };
    apply();
    if (storeState.settings.theme === 'auto' && window.matchMedia) {
      const m = window.matchMedia('(prefers-color-scheme: dark)');
      m.addEventListener('change', apply);
      return () => m.removeEventListener('change', apply);
    }
  }, [storeState.settings.theme]);

  // Update banner
  useEffect(() => {
    const handler = () => setUpdateAvailable(true);
    window.addEventListener('app-update-available', handler);
    return () => window.removeEventListener('app-update-available', handler);
  }, []);

  // Refresh store state when relevant
  const refreshStore = () => setStoreState(window.Store.load());

  const lessons = window.LESSONS || [];

  const handleSettingsChange = (next) => setStoreState(next);

  let content;
  if (view.name === 'home') {
    content = <Home lessons={lessons} storeState={storeState}
      onPickLesson={(l) => setView({ name: 'lesson', lesson: l })}
      onReview={() => setView({ name: 'review' })} />;
  } else if (view.name === 'lesson') {
    content = <LessonView lesson={view.lesson}
      onBack={() => { refreshStore(); setView({ name: 'home' }); }}
      onStartQuiz={() => setView({ name: 'quiz', lesson: view.lesson })} />;
  } else if (view.name === 'quiz') {
    content = <QuizView lesson={view.lesson}
      onBack={() => { refreshStore(); setView({ name: 'lesson', lesson: view.lesson }); }}
      onComplete={() => { refreshStore(); }} />;
  } else if (view.name === 'review') {
    content = <ReviewView lessons={lessons} onBack={() => { refreshStore(); setView({ name: 'home' }); }} />;
  } else if (view.name === 'settings') {
    content = <SettingsView onBack={() => setView({ name: 'home' })} onChange={handleSettingsChange} />;
  }

  const dueCount = window.Store.dueCards(storeState).length;
  const onHome = view.name === 'home';

  return (
    <div className="app-shell">
      <header className="header">
        <div className="header-brand" onClick={() => setView({ name: 'home' })}>
          <div className="header-icon">M</div>
          <div className="header-title">Magyaróra</div>
        </div>
        <div className="header-actions">
          {onHome && (
            <button className={`icon-btn ${dueCount > 0 ? 'active' : ''}`} onClick={() => setView({ name: 'review' })} aria-label="Review">
              <I.Brain />
            </button>
          )}
          <button className="icon-btn" onClick={() => setView({ name: 'settings' })} aria-label="Settings">
            <I.Settings />
          </button>
        </div>
      </header>

      {content}

      <footer>
        <span className="left">Magyaróra · Hungarian foundations</span>
        <span className="right">Sok szerencsét!</span>
      </footer>

      {updateAvailable && (
        <div className="update-banner">
          <span className="update-banner-text">New lesson available — refresh to load.</span>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
