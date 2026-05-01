# Magyaróra — Hungarian Lessons PWA

A personal Hungarian language study app — *magyaróra* literally means "Hungarian class." Each week you add a new lesson by editing one file (`lessons.js`) and pushing to GitHub.

**Features**
- 📱 Installable PWA — works fully offline once visited
- 🎯 Per-lesson progress tracking
- 🔁 Spaced-repetition review (Leitner 5-box system)
- 🎲 **Random quiz variation** — pool questions draw fresh items each attempt, so you practice the *rule*, not memorize specific examples
- 🌙 Light / dark / auto theme
- 🔊 Audio pronunciation (when device has a Hungarian voice — most modern phones do)

---

## 🚀 Quick start: deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo → **Settings → Pages**.
3. **Source:** `Deploy from a branch`. **Branch:** `main` (or `master`), **Folder:** `/ (root)`. Save.
4. Wait ~30 seconds. Your URL: `https://<your-username>.github.io/<repo-name>/`
5. On your phone, open that URL → browser menu → **Add to Home Screen**.
6. The icon appears like a real app. It works offline.

> **Tip — custom domain or sub-path:** all paths in the code are relative (`./...`) so it works at any URL.

---

## ✏️ Adding a new lesson

Open **`lessons.js`** and:

1. Bump `LESSONS_VERSION` at the top to any new value (date is good — `'2026-05-07-1'`).
2. Add a new lesson object to the `LESSONS` array.
3. Commit and push.
4. Next time the app loads online, you'll see an "update available" banner. Tap **Refresh**. Done.

(Offline users will get the new lesson next time they're online.)

### Minimal lesson skeleton

```js
{
  id: 'lecke-02',                 // must be unique
  week: 2,
  title: 'Második lecke',
  subtitle: 'Numbers, time, days of the week',

  sections: [
    // … see "Section types" below
  ],

  quiz: [
    // … see "Quiz types" below
  ],
}
```

---

## 📚 Section types

The `type` field decides how the section renders. Available types:

### `vowels`
Alphabet-style cards for vowels.
```js
{
  type: 'vowels',
  title: 'Magánhangzók', subtitle: 'The vowels',
  items: [
    { letter: 'a, á', desc: '"a" as in "although" · "á" as in "father"',
      examples: [['ház', 'house'], ['ablak', 'window']] },
  ],
}
```

### `consonants`
Compact 3-column cards for consonants.
```js
{
  type: 'consonants',
  title: 'Mássalhangzók', subtitle: 'Compound consonants',
  items: [
    { letter: 'cs', sound: '"ch" in "check"', ex: 'macska', tr: 'cat' },
  ],
}
```

### `cards` *(most flexible — used for rules, comparisons, examples)*
```js
{
  type: 'cards',
  title: 'Hangrend', subtitle: 'Vowel harmony',
  intro: 'Optional **markdown** intro paragraph.',
  columns: 3,                      // 2 | 3 | 4
  items: [
    // STYLED card (colored background — use 'deep' / 'mixed' / 'high')
    { style: 'deep', eyebrow: 'Mély (Deep)', title: 'memoriter: AUTÓ',
      sub: 'a · á · o · ó · u · ú',
      list: [['tyúk','hen'], ['ágy','bed']] },     // [word, translation] tuples → audio enabled

    // RULE card (white background, more flexible)
    { ruleTitle: '-ban / -ben', ruleSub: '"in" — for most places',
      list: [
        'Kanadáb**an** — Canada',                  // string with markdown
        'Waterloo**ban** — Waterloo',
      ],
      note: 'Optional small italic note at bottom.' },
  ],
  callout: { title: 'Round vowels:', body: 'ö, ő, ü, ű — ...' },
  collapsibles: [
    { title: 'The vowel-lengthening trick',
      body: ['Lead-in line.',
             '- Afrika → Afrik**á**ban',
             '- Anglia → Angli**á**ban'] },        // mix of paragraphs and `- bullet` lines
  ],
}
```

### `wordgrid`
4-column grid of small word-pair cards (good for vocab quick reference).
```js
{
  type: 'wordgrid',
  title: '-ul / -ül', subtitle: 'Languages & manner',
  intro: 'Optional intro **with markdown**.',
  items: [
    { base: 'magyar', full: 'magyarul' },
    { base: 'angol',  full: 'angolul' },
  ],
}
```

### `table`
Conjugation tables and similar grid data.
```js
{
  type: 'table',
  title: 'Lenni', subtitle: 'To be',
  headers: ['Pronoun', 'English', 'to be', 'Pronoun', 'English', 'to be'],
  accentCols: [2, 5],                  // these columns render in accent color
  rows: [
    ['én',      'I',         'vagyok',     'mi',        'we',        'vagyunk'],
    ['te / Ön', 'you (s.)',  'vagy / —',   'ti / Önök', 'you (pl.)', 'vagytok / —'],
    ['ő',       'he/she',    'van *',      'ők',        'they',      'vannak *'],
  ],
  note: '* **van** is dropped when describing identity...',
}
```

### `phrases`
Q&A phrase pairs (e.g. functional questions).
```js
{
  type: 'phrases',
  title: 'Funkciók', subtitle: 'Question forms & answers',
  items: [
    { q: 'Ki vagy?', en: 'Who are you?', a: 'Martin vagyok.' },
  ],
}
```

### Markdown-light cheat sheet
Inside any string, you can use:
- `**bold**` → **bold**
- `_italic_` → *italic*
- `` `code` `` → `code`
- Lines starting with `- ` inside `body: [...]` arrays render as a bulleted list.

---

## 🎯 Quiz types

A quiz is an array of question specs. There are **4 types**:

### `mc` — static multiple choice
```js
{ type: 'mc', id: 'cs-sound',
  q: 'What sound does "cs" make?',
  opts: ['"ch" in "check"', '"k" in "kite"', '"sh" in "shoe"'],
  a: 0,                                // index of correct option
  exp: '"cs" → "ch" in "check".' }
```

### `fill` — static fill-in-the-blank
```js
{ type: 'fill', id: 'budapest',
  q: 'Where is Hungary\'s capital? Buda___',
  a: ['pest', 'Pest'],                 // accepts any (case-insensitive)
  hint: 'one syllable',
  exp: 'Budapest = Buda + Pest.' }
```

### ⭐ `pool-mc` — random multiple choice from a pool
**This is what makes the quiz repeatable.** Define a pool, the app draws `draws` items each attempt — so the rule is what gets practiced, not the specific item.
```js
{ type: 'pool-mc', id: 'harmony',
  template: 'Is "{w}" deep, mixed, or high?',
  opts: ['Mély (Deep)', 'Vegyes (Mixed)', 'Magas (High)'],
  draws: 3,
  pool: [
    { w: 'kutya',   a: 0, exp: 'u and a are both deep.' },
    { w: 'elefánt', a: 1, exp: 'e/é high but á is deep → mixed.' },
    { w: 'üveg',    a: 2, exp: 'ü and e — both high.' },
    // … add as many as you like
  ],
}
```
- `{w}` in the template is replaced by `pool[i].w`
- `a` is the option index for that item
- `exp` is the per-item explanation

### ⭐ `pool-fill` — random fill-in-the-blank from a pool
```js
{ type: 'pool-fill', id: 'locative',
  template: '{w}___ élek.',
  translation: 'I live in {w}.',     // optional small subtitle under the question
  hint: '-ban / -ben / -on / -en / -ön',
  draws: 4,
  pool: [
    { w: 'Berlin',       a: 'ben', exp: 'high-vowel non-Hungarian → -ben.' },
    { w: 'Magyarország', a: 'on',  exp: 'Hungary uses -n form → -on.' },
    // …
  ],
}
```

### How sampling works
The app prefers (in order):
1. Pool items you've gotten **wrong** (low Leitner box) → reinforcement
2. Items **due** for review today
3. **Unseen** items → coverage
4. **Mastered** items → backseat

So the quiz adapts: as you get good at a rule, the harder pool items rise to the top.

---

## 🧠 Spaced repetition (review)

Every quiz answer adds the card to a Leitner 5-box review system:

| Box | Reviewed every |
| --- | --- |
| 1   | 1 day  |
| 2   | 2 days |
| 3   | 4 days |
| 4   | 1 week |
| 5   | 2 weeks |

- ✅ Right → bump up a box (cap at 5).
- ❌ Wrong → drop to box 1.

The home screen shows how many cards are due. Tap the **brain** icon (🧠) to review them — works across all lessons.

---

## 🔊 Audio pronunciation

The app uses your device's built-in speech synthesis. Most modern phones / OSes ship with a Hungarian voice:
- **iOS / macOS**: built in (Mariska)
- **Windows 10+**: install via Settings → Time & Language → Speech → Hungarian
- **Android**: install via Google → Settings → Languages & input → Text-to-speech

If no Hungarian voice is found, audio still works but reads in your default voice (less ideal). You can toggle audio off in Settings.

---

## 🛠 Project structure

```
hungarian-pwa/
├── index.html         # entry point (don't edit unless changing app shell)
├── styles.css         # theme + layout
├── app.js             # main React app (JSX, transpiled in browser via Babel)
├── lessons.js         # 👈 EDIT THIS each week
├── srs.js             # storage + spaced-repetition logic
├── sw.js              # service worker (offline + auto-update)
├── manifest.json      # PWA manifest
├── icon.svg           # app icon
└── README.md          # this file
```

---

## 🐛 Troubleshooting

**New lesson didn't appear after pushing.**
- Check that `LESSONS_VERSION` was bumped — the app uses network-first for `lessons.js`, so a new version forces a refresh next time you're online.
- Hard refresh (long-press refresh on mobile) or use **Settings → Reset** as a last resort.
- Check the browser console for syntax errors in `lessons.js`.

**Service worker won't install / app shell not cached.**
- Make sure you're serving over `https://` (GitHub Pages is automatic). SWs don't work on `http://` (except `localhost`).

**Hungarian voice doesn't sound right / wrong language.**
- Some devices fall back to your default voice. Install a Hungarian TTS voice (see Audio section above).

**App feels stale on iOS.**
- iOS Safari is conservative with PWAs — you may need to remove the home-screen icon and re-add it after a major update.

**Want to test locally?**
- Run any static server in this folder: `python3 -m http.server 8080` then open `http://localhost:8080`.

---

## 📜 License

Personal use. Hungarian language content based on your own study materials. Code yours to modify freely.

**Sok szerencsét a magyar tanuláshoz!** *(Good luck with your Hungarian studies!)*
