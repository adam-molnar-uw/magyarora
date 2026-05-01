import React, { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, Trophy, Check, X, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';

// ---------- DATA ----------

const VOWELS = [
  { letter: 'a, á', desc: '"a" as in "although"  ·  "á" as in "father"', examples: [['ház', 'house'], ['ablak', 'window']] },
  { letter: 'e, é', desc: '"e" as in "less"  ·  "é" as in "café"', examples: [['elefánt', 'elephant'], ['szép', 'beautiful']] },
  { letter: 'i, í', desc: 'short and long "ee"', examples: [['víz', 'water']] },
  { letter: 'o, ó', desc: 'short and long "o"', examples: [['óra', 'clock / hour']] },
  { letter: 'u, ú', desc: 'short and long "oo"', examples: [['kutya', 'dog'], ['út', 'road']] },
  { letter: 'ö, ő', desc: 'rounded — like German "ö"', examples: [['öröm', 'happiness'], ['nő', 'woman']] },
  { letter: 'ü, ű', desc: 'rounded — like German "ü"', examples: [['fürdő', 'bath'], ['tűz', 'fire']] },
];

const CONSONANTS = [
  { letter: 'cs', sound: '"ch" in "check"', ex: 'macska', tr: 'cat' },
  { letter: 'sz', sound: '"s" in "sun"', ex: 'szoba', tr: 'room' },
  { letter: 'zs', sound: '"s" in "pleasure"', ex: 'zseb', tr: 'pocket' },
  { letter: 'gy', sound: '"d" in "during"', ex: 'egy', tr: 'one' },
  { letter: 'ty', sound: 'as in "tube"', ex: 'tyúk', tr: 'hen' },
  { letter: 'ny', sound: '"n" in "new"', ex: 'nyár', tr: 'summer' },
  { letter: 'ly', sound: '"y" in "yes" (= j)', ex: 'folyó', tr: 'river' },
  { letter: 'dz', sound: '"ds" in "kids"', ex: 'edzeni', tr: 'to work out' },
  { letter: 'dzs', sound: '"j" in "juice"', ex: 'dzsungel', tr: 'jungle' },
];

const HARMONY = [
  { type: 'Mély (Deep)', mnem: 'AUTÓ', vowels: 'a · á · o · ó · u · ú', words: [['tyúk', 'hen'], ['ágy', 'bed'], ['joghurt', 'yogurt']], color: 'deep' },
  { type: 'Vegyes (Mixed)', mnem: '— deep + high —', vowels: 'a/á/o + e/é/i', words: [['elefánt', 'elephant'], ['zsiráf', 'giraffe'], ['éjszaka', 'night']], color: 'mixed' },
  { type: 'Magas (High)', mnem: 'TENISZÜTŐ', vowels: 'e · é · i · í · ö · ő · ü · ű', words: [['üveg', 'bottle'], ['öt', 'five'], ['internet', 'internet']], color: 'high' },
];

const QUIZ = [
  { type: 'mc', q: 'What sound does "cs" make?', opts: ['"ch" in "check"', '"k" in "kite"', '"sh" in "shoe"'], a: 0,
    exp: '"cs" → "ch" in "check". Example: macska (cat).' },
  { type: 'mc', q: 'What sound does "gy" make?', opts: ['like "g" in "gate"', 'like "d" in "during"', 'like "j" in "juice"'], a: 1,
    exp: 'A soft palatal sound — egy (one).' },
  { type: 'mc', q: 'What sound does "sz" make?', opts: ['"s" in "sun"', '"sh" in "shoe"', '"z" in "zebra"'], a: 0,
    exp: '"sz" is the regular English "s". (Note: a lone "s" in Hungarian = "sh"!)' },
  { type: 'mc', q: 'Is kutya (dog) deep, mixed, or high?', opts: ['Mély (Deep)', 'Vegyes (Mixed)', 'Magas (High)'], a: 0,
    exp: 'Both "u" and "a" are deep vowels → kutya is deep.' },
  { type: 'mc', q: 'Is elefánt (elephant) deep, mixed, or high?', opts: ['Mély (Deep)', 'Vegyes (Mixed)', 'Magas (High)'], a: 1,
    exp: '"e/é" are high, but "á" is deep → mixed (vegyes).' },
  { type: 'fill', q: 'Berlin___ élsz?', a: ['ben'], hint: '-ban / -ben / -on / -en / -ön',
    exp: 'Berlin is a high-vowel, non-Hungarian city → Berlinben.' },
  { type: 'fill', q: 'Kanada___ él.', a: ['ban'], hint: '-ban / -ben',
    exp: 'Kanada is a deep-vowel country → Kanadában (final "a" lengthens to "á").' },
  { type: 'fill', q: 'Magyarország___ vagyok.', a: ['on'], hint: 'careful — Hungary is special!',
    exp: 'Hungary and Hungarian cities use -n / -on / -en / -ön, NOT -ban/-ben → Magyarországon.' },
  { type: 'fill', q: 'Szeged___ tanulok.', a: ['en'], hint: 'Hungarian city + linking vowel',
    exp: 'Szeged is a Hungarian city → -n form. High-vowel word → linking "e" → Szegeden.' },
  { type: 'fill', q: 'London → ___', a: ['londoni'], hint: 'place of origin: add -i',
    exp: 'londoni = from London.' },
  { type: 'fill', q: 'Svájc → ___', a: ['svájci'], hint: 'place of origin: add -i',
    exp: 'svájci = Swiss.' },
  { type: 'fill', q: 'Beszélek magyar___ (I speak Hungarian).', a: ['ul'], hint: '-ul / -ül',
    exp: 'magyar is deep-vowel → -ul → magyarul.' },
  { type: 'fill', q: 'Egy kicsit tudok török___ (a little Turkish).', a: ['ül'], hint: '-ul / -ül',
    exp: 'török has high/round vowels → -ül → törökül.' },
  { type: 'mc', q: 'Mi ___ Magyarországon. (We are in Hungary.)', opts: ['vagyok', 'vagyunk', 'vannak', 'vagytok'], a: 1,
    exp: '"mi" (we) → vagyunk.' },
  { type: 'mc', q: 'What does "Hány éves vagy?" mean?', opts: ["What's your name?", 'How old are you?', 'Where are you from?'], a: 1,
    exp: 'hány = how many · éves = years old.' },
  { type: 'mc', q: 'What does "Milyen nemzetiségű vagy?" mean?', opts: ["What's your job?", "What's your nationality?", 'How are you?'], a: 1,
    exp: 'nemzetiség = nationality.' },
];

// ---------- STYLES ----------

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap');

.font-display { font-family: 'Fraunces', 'Times New Roman', serif; font-feature-settings: 'ss01'; letter-spacing: -0.02em; }
.font-body { font-family: 'DM Sans', system-ui, sans-serif; }

.paper {
  background-color: #FAF5EF;
  background-image:
    radial-gradient(at 20% 0%, rgba(232, 213, 196, 0.35) 0px, transparent 50%),
    radial-gradient(at 95% 100%, rgba(220, 198, 180, 0.25) 0px, transparent 50%);
}

.grain::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  opacity: 0.06; pointer-events: none; mix-blend-mode: multiply;
}

.divider-folk {
  background-image: radial-gradient(circle, #8B2C24 1.5px, transparent 1.5px);
  background-size: 14px 14px;
  background-position: 0 50%;
  background-repeat: repeat-x;
  height: 14px;
}

.deep-pill { background: #FBE3D6; color: #7A3215; border-color: #E8B89A; }
.mixed-pill { background: #F5E1C8; color: #6B4423; border-color: #D9B591; }
.high-pill { background: #E8DEEA; color: #4A2D5C; border-color: #C9B6CD; }

.btn-primary {
  background: #8B2C24; color: #FAF5EF;
  transition: all 0.2s ease;
}
.btn-primary:hover:not(:disabled) { background: #6B1F18; transform: translateY(-1px); box-shadow: 0 8px 24px -8px rgba(139, 44, 36, 0.4); }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-ghost {
  border: 1.5px solid #2A1810;
  color: #2A1810;
  background: transparent;
  transition: all 0.2s ease;
}
.btn-ghost:hover { background: #2A1810; color: #FAF5EF; }

.opt {
  border: 1.5px solid #D9CBB8;
  background: #FFFCF7;
  transition: all 0.15s ease;
}
.opt:hover:not(:disabled) { border-color: #8B2C24; transform: translateX(2px); }
.opt-correct { border-color: #047857 !important; background: #ECFDF5 !important; }
.opt-wrong { border-color: #B91C1C !important; background: #FEF2F2 !important; }
.opt-disabled { opacity: 0.5; }

.card-hover { transition: all 0.25s ease; }
.card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 32px -12px rgba(42, 24, 16, 0.18); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.fade-up { animation: fadeUp 0.35s ease-out both; }

.serif-num {
  font-family: 'Fraunces', serif;
  font-weight: 300;
  font-style: italic;
  font-feature-settings: 'lnum', 'pnum';
}
`;

// ---------- COMPONENTS ----------

function SectionHeader({ num, hu, en }) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-4">
        <span className="serif-num text-5xl text-[#8B2C24] opacity-80">{num}</span>
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-[#2A1810] font-medium leading-tight">{hu}</h2>
          <p className="font-body text-sm text-[#7A6B5C] tracking-wide uppercase mt-1">{en}</p>
        </div>
      </div>
      <div className="divider-folk mt-4 opacity-60" />
    </div>
  );
}

function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#E8DCC8] py-3">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <span className="font-body font-medium text-[#2A1810]">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#8B2C24]" /> : <ChevronDown className="w-4 h-4 text-[#8B2C24]" />}
      </button>
      {open && <div className="mt-3 fade-up">{children}</div>}
    </div>
  );
}

function VowelsSection() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {VOWELS.map((v, i) => (
        <div key={i} className="card-hover bg-white/70 border border-[#E8DCC8] rounded-lg p-5">
          <div className="font-display text-4xl text-[#8B2C24] font-medium mb-2">{v.letter}</div>
          <p className="font-body text-sm text-[#5C4F42] mb-3 italic">{v.desc}</p>
          <div className="flex flex-wrap gap-2">
            {v.examples.map(([w, t], j) => (
              <div key={j} className="text-xs font-body bg-[#FBE3D6]/60 border border-[#E8B89A]/50 px-2.5 py-1 rounded-full">
                <span className="font-semibold text-[#2A1810]">{w}</span>
                <span className="text-[#7A6B5C]"> — {t}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ConsonantsSection() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {CONSONANTS.map((c, i) => (
        <div key={i} className="card-hover bg-white/70 border border-[#E8DCC8] rounded-lg p-4 text-center">
          <div className="font-display text-3xl text-[#8B2C24] font-medium">{c.letter}</div>
          <p className="font-body text-[11px] text-[#5C4F42] mt-1 leading-tight">{c.sound}</p>
          <div className="mt-2 pt-2 border-t border-[#E8DCC8]/60">
            <div className="font-body text-xs font-semibold text-[#2A1810]">{c.ex}</div>
            <div className="font-body text-[10px] text-[#7A6B5C] italic">{c.tr}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HarmonySection() {
  return (
    <div>
      <p className="font-body text-[#5C4F42] mb-5 leading-relaxed">
        Hungarian sorts every word into one of three vowel-harmony groups. Suffixes change shape to match —
        so knowing the group is essential before you can attach anything.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {HARMONY.map((h, i) => (
          <div key={i} className={`card-hover rounded-lg p-5 border ${h.color === 'deep' ? 'deep-pill' : h.color === 'mixed' ? 'mixed-pill' : 'high-pill'}`}>
            <div className="font-body text-xs uppercase tracking-widest opacity-70">{h.type}</div>
            <div className="font-display text-2xl font-medium mt-1 mb-2">memoriter: {h.mnem}</div>
            <div className="font-body text-sm font-semibold mb-3 opacity-90">{h.vowels}</div>
            <ul className="space-y-1">
              {h.words.map(([w, t], j) => (
                <li key={j} className="font-body text-sm">
                  <span className="font-semibold">{w}</span>
                  <span className="opacity-70 italic"> — {t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-5 bg-[#FFFCF7] border-l-4 border-[#8B2C24] rounded-r-lg p-4">
        <p className="font-body text-sm text-[#2A1810]">
          <strong className="font-display text-base">Round vowels:</strong> ö, ő, ü, ű — these matter for the special <em>-ön</em> suffix.
        </p>
      </div>
    </div>
  );
}

function LocativeSection() {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white/70 border border-[#E8DCC8] rounded-lg p-5">
          <div className="font-display text-2xl text-[#8B2C24]">-ban / -ben</div>
          <p className="font-body text-xs uppercase tracking-widest text-[#7A6B5C] mt-1">"in" — for most places</p>
          <ul className="font-body text-sm text-[#2A1810] mt-3 space-y-1.5">
            <li>Észak-Amerika<strong className="text-[#8B2C24]">ában</strong> — North America</li>
            <li>Kanada<strong className="text-[#8B2C24]">ában</strong> — Canada</li>
            <li>Waterloo<strong className="text-[#8B2C24]">ban</strong> — Waterloo</li>
            <li>Velence<strong className="text-[#8B2C24]">ében</strong> — Venice</li>
          </ul>
        </div>
        <div className="bg-white/70 border border-[#E8DCC8] rounded-lg p-5">
          <div className="font-display text-2xl text-[#8B2C24]">-n / -on / -en / -ön</div>
          <p className="font-body text-xs uppercase tracking-widest text-[#7A6B5C] mt-1">"on" — Hungary, Hungarian cities, islands</p>
          <ul className="font-body text-sm text-[#2A1810] mt-3 space-y-1.5">
            <li>Magyarország<strong className="text-[#8B2C24]">on</strong></li>
            <li>Budapest<strong className="text-[#8B2C24]">en</strong>, Szeged<strong className="text-[#8B2C24]">en</strong></li>
            <li>a világ<strong className="text-[#8B2C24]">on</strong> — in the world</li>
            <li>Cipru<strong className="text-[#8B2C24]">son</strong>, Máltá<strong className="text-[#8B2C24]">n</strong> — islands</li>
          </ul>
        </div>
      </div>
      <Collapsible title="The vowel-lengthening trick (a → á, e → é)" defaultOpen={false}>
        <div className="font-body text-sm text-[#5C4F42] space-y-2">
          <p>When a word ends in <strong>a</strong> or <strong>e</strong>, the vowel lengthens before the suffix:</p>
          <ul className="ml-4 space-y-1">
            <li>• Afrika → Afrik<strong className="text-[#8B2C24]">á</strong>ban</li>
            <li>• Anglia → Angli<strong className="text-[#8B2C24]">á</strong>ban</li>
            <li>• Velence → Velenc<strong className="text-[#8B2C24]">é</strong>ben</li>
            <li>• Chile → Chil<strong className="text-[#8B2C24]">é</strong>ben</li>
          </ul>
        </div>
      </Collapsible>
      <Collapsible title="How to choose the right form" defaultOpen={false}>
        <ul className="font-body text-sm text-[#5C4F42] space-y-2 ml-4">
          <li>• <strong>Deep-vowel word</strong> → -ban (e.g. Kanadában)</li>
          <li>• <strong>High-vowel word</strong> → -ben (e.g. Berlinben)</li>
          <li>• <strong>Round-vowel last syllable</strong> → -ön (e.g. fürdőn)</li>
          <li>• <strong>Compound word</strong> → harmony of the LAST element</li>
        </ul>
      </Collapsible>
    </div>
  );
}

function OriginSection() {
  const items = [
    { cat: 'Continent', ex: ['Európa → európai', 'Ázsia → ázsiai', 'Afrika → afrikai'], note: 'Exception: Ausztrália → ausztrál' },
    { cat: 'Country', ex: ['Svájc → svájci', 'Kanada → kanadai', 'Egyiptom → egyiptomi'], note: '' },
    { cat: 'City', ex: ['Szeged → szegedi', 'London → londoni', 'Párizs → párizsi'], note: '' },
  ];
  return (
    <>
      <p className="font-body text-[#5C4F42] mb-5 leading-relaxed">
        To say "from somewhere" or describe origin, just add <strong className="text-[#8B2C24]">-i</strong> to the place name.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="card-hover bg-white/70 border border-[#E8DCC8] rounded-lg p-5">
            <div className="font-body text-xs uppercase tracking-widest text-[#7A6B5C]">{it.cat}</div>
            <ul className="font-body text-sm text-[#2A1810] mt-2 space-y-1">
              {it.ex.map((e, j) => <li key={j}>{e}</li>)}
            </ul>
            {it.note && <p className="font-body text-xs italic text-[#8B2C24] mt-3">{it.note}</p>}
          </div>
        ))}
      </div>
    </>
  );
}

function LanguageSection() {
  return (
    <>
      <p className="font-body text-[#5C4F42] mb-5 leading-relaxed">
        <strong className="text-[#8B2C24]">-ul / -ül</strong> turns a noun (especially a language or nationality) into an adverb —
        meaning "in [language]" or "in a [way]". Choose by vowel harmony.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          ['magyar', 'magyarul', 'deep'],
          ['angol', 'angolul', 'deep'],
          ['koreai', 'koreaiul', 'deep'],
          ['német', 'németül', 'high'],
          ['török', 'törökül', 'round'],
          ['kínai', 'kínaiul', 'deep'],
          ['lengyel', 'lengyelül', 'high'],
          ['dán', 'dánul', 'deep'],
        ].map(([base, full, type], i) => (
          <div key={i} className="bg-white/70 border border-[#E8DCC8] rounded-lg p-3 text-center">
            <div className="font-body text-xs text-[#7A6B5C]">{base}</div>
            <div className="font-display text-lg text-[#8B2C24] font-medium mt-0.5">{full}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function ToBeSection() {
  const rows = [
    ['én', 'I', 'vagyok', 'mi', 'we', 'vagyunk'],
    ['te / Ön', 'you (s.)', 'vagy / —', 'ti / Önök', 'you (pl.)', 'vagytok / —'],
    ['ő', 'he/she', 'van *', 'ők', 'they', 'vannak *'],
  ];
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full font-body text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-[#2A1810]">
              <th className="text-left py-2 px-3 font-display font-medium text-[#2A1810]">Pronoun</th>
              <th className="text-left py-2 px-3 text-[#7A6B5C] text-xs uppercase tracking-wider">English</th>
              <th className="text-left py-2 px-3 font-display font-medium text-[#8B2C24]">to be</th>
              <th className="text-left py-2 px-3 font-display font-medium text-[#2A1810]">Pronoun</th>
              <th className="text-left py-2 px-3 text-[#7A6B5C] text-xs uppercase tracking-wider">English</th>
              <th className="text-left py-2 px-3 font-display font-medium text-[#8B2C24]">to be</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-[#E8DCC8]">
                {r.map((c, j) => (
                  <td key={j} className={`py-2.5 px-3 ${j === 2 || j === 5 ? 'font-semibold text-[#8B2C24]' : 'text-[#2A1810]'}`}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-xs italic text-[#7A6B5C] mt-3">
        * <strong>van</strong> and <strong>vannak</strong> are dropped when describing identity, profession, or qualities —
        e.g. "Anna tanár." (Anna is a teacher.) But kept for location: "Anna itt <em>van</em>." (Anna is here.)
      </p>
    </>
  );
}

function FunctionsSection() {
  const fns = [
    ['Ki vagy?', 'Who are you?', 'Martin vagyok.'],
    ['Mi vagy? / Mivel foglalkozol?', 'What do you do?', 'Mérnök vagyok.'],
    ['Mi ez / az?', 'What is this / that?', 'Ez egy város.'],
    ['Hány éves vagy?', 'How old are you?', 'Huszonkét éves vagyok.'],
    ['Milyen nemzetiségű vagy?', 'What\'s your nationality?', 'Német vagyok.'],
    ['Milyen Magyarország?', 'What is Hungary like?', 'Magyarország kicsi.'],
  ];
  return (
    <div className="grid md:grid-cols-2 gap-3">
      {fns.map(([q, en, a], i) => (
        <div key={i} className="card-hover bg-white/70 border border-[#E8DCC8] rounded-lg p-4">
          <div className="font-display text-lg text-[#8B2C24] font-medium">{q}</div>
          <div className="font-body text-xs text-[#7A6B5C] italic">{en}</div>
          <div className="mt-2 pt-2 border-t border-[#E8DCC8] font-body text-sm text-[#2A1810]">
            <span className="text-[#7A6B5C] text-xs">→ </span>{a}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------- QUIZ ----------

function Quiz() {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = QUIZ[idx];
  const total = QUIZ.length;

  const checkFill = () => {
    const clean = textInput.trim().toLowerCase().replace(/[.!?]/g, '');
    return q.a.some(ans => ans.toLowerCase() === clean);
  };

  const handleSubmit = () => {
    let correct = false;
    if (q.type === 'mc') correct = selected === q.a;
    else correct = checkFill();
    if (correct) setScore(s => s + 1);
    setSubmitted(true);
  };

  const next = () => {
    if (idx + 1 >= total) {
      setDone(true);
    } else {
      setIdx(idx + 1);
      setSelected(null);
      setTextInput('');
      setSubmitted(false);
    }
  };

  const restart = () => {
    setIdx(0); setSelected(null); setTextInput(''); setSubmitted(false); setScore(0); setDone(false);
  };

  if (done) {
    const pct = Math.round((score / total) * 100);
    let msg = '';
    if (pct === 100) msg = 'Tökéletes! Perfect — you\'ve mastered the first lesson.';
    else if (pct >= 80) msg = 'Nagyon jó! Very strong work.';
    else if (pct >= 60) msg = 'Jól csinálod. Good — review the tricky bits and you\'ve got it.';
    else msg = 'Don\'t worry — review the lesson and try again. Hungarian rewards patience.';

    return (
      <div className="text-center py-10 fade-up">
        <Trophy className="w-14 h-14 text-[#8B2C24] mx-auto mb-4" strokeWidth={1.25} />
        <div className="font-display text-6xl text-[#2A1810] font-medium">{score}<span className="text-[#7A6B5C] text-3xl">/{total}</span></div>
        <p className="font-body text-lg text-[#5C4F42] mt-2">{msg}</p>
        <button onClick={restart} className="btn-ghost mt-6 px-6 py-3 rounded-full font-body text-sm font-medium inline-flex items-center gap-2">
          <RotateCcw className="w-4 h-4" /> Try again
        </button>
      </div>
    );
  }

  const isCorrect = q.type === 'mc' ? selected === q.a : checkFill();
  const canSubmit = q.type === 'mc' ? selected !== null : textInput.trim().length > 0;

  return (
    <div className="fade-up" key={idx}>
      <div className="flex items-center justify-between mb-6">
        <div className="font-body text-xs uppercase tracking-widest text-[#7A6B5C]">
          Question <span className="text-[#8B2C24] font-semibold">{idx + 1}</span> of {total}
        </div>
        <div className="font-body text-xs text-[#7A6B5C]">Score: <span className="text-[#8B2C24] font-semibold">{score}</span></div>
      </div>

      <div className="w-full h-1 bg-[#E8DCC8] rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-[#8B2C24] transition-all duration-500" style={{ width: `${((idx) / total) * 100}%` }} />
      </div>

      <h3 className="font-display text-2xl md:text-3xl text-[#2A1810] font-medium leading-snug mb-6">{q.q}</h3>

      {q.type === 'mc' && (
        <div className="space-y-2.5">
          {q.opts.map((opt, i) => {
            let cls = 'opt';
            if (submitted) {
              if (i === q.a) cls += ' opt-correct';
              else if (i === selected) cls += ' opt-wrong';
              else cls += ' opt-disabled';
            } else if (selected === i) {
              cls += ' !border-[#8B2C24]';
            }
            return (
              <button key={i} disabled={submitted} onClick={() => setSelected(i)}
                className={`${cls} w-full text-left px-5 py-3.5 rounded-lg font-body text-base text-[#2A1810] flex items-center justify-between`}>
                <span>{opt}</span>
                {submitted && i === q.a && <Check className="w-5 h-5 text-emerald-700" />}
                {submitted && i === selected && i !== q.a && <X className="w-5 h-5 text-red-700" />}
              </button>
            );
          })}
        </div>
      )}

      {q.type === 'fill' && (
        <div>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            disabled={submitted}
            onKeyDown={(e) => { if (e.key === 'Enter' && canSubmit && !submitted) handleSubmit(); }}
            placeholder="Type your answer…"
            className={`w-full font-body text-lg px-5 py-3.5 rounded-lg border-1.5 bg-[#FFFCF7] outline-none transition-colors
              ${submitted ? (isCorrect ? 'border-emerald-700 text-emerald-800' : 'border-red-700 text-red-800') : 'border-[#D9CBB8] focus:border-[#8B2C24]'}
            `}
            style={{ borderWidth: '1.5px' }}
            autoFocus
          />
          {q.hint && !submitted && (
            <p className="font-body text-xs text-[#7A6B5C] mt-2 italic">hint: {q.hint}</p>
          )}
        </div>
      )}

      {submitted && (
        <div className={`mt-5 rounded-lg p-4 fade-up border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-700' : 'bg-red-50 border-red-700'}`}>
          <div className="flex items-start gap-2">
            {isCorrect ? <Check className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" /> : <X className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />}
            <div>
              <div className={`font-display text-lg font-medium ${isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                {isCorrect ? 'Helyes! (Correct)' : `Nem egészen. Answer: ${q.type === 'fill' ? q.a[0] : q.opts[q.a]}`}
              </div>
              <p className="font-body text-sm text-[#2A1810] mt-1">{q.exp}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        {!submitted ? (
          <button onClick={handleSubmit} disabled={!canSubmit}
            className="btn-primary px-7 py-3 rounded-full font-body text-sm font-semibold inline-flex items-center gap-2">
            Check <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={next}
            className="btn-primary px-7 py-3 rounded-full font-body text-sm font-semibold inline-flex items-center gap-2">
            {idx + 1 >= total ? 'See results' : 'Next'} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- APP ----------

export default function App() {
  const [view, setView] = useState('lesson'); // 'lesson' or 'quiz'

  return (
    <div className="paper grain relative min-h-screen font-body text-[#2A1810]">
      <style>{styles}</style>

      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#8B2C24]" />
            <span className="font-body text-xs uppercase tracking-[0.2em] text-[#8B2C24]">Magyar · Hungarian</span>
          </div>
          <h1 className="font-display text-6xl sm:text-7xl font-medium text-[#2A1810] leading-none">Első lecke</h1>
          <p className="font-body text-base text-[#5C4F42] mt-3 italic">First lesson — sounds, vowel harmony, basic suffixes & "to be"</p>

          {/* Tabs */}
          <div className="mt-8 inline-flex bg-white/60 border border-[#E8DCC8] rounded-full p-1">
            <button onClick={() => setView('lesson')}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all
                ${view === 'lesson' ? 'bg-[#2A1810] text-[#FAF5EF]' : 'text-[#2A1810] hover:bg-[#E8DCC8]/40'}`}>
              Lesson
            </button>
            <button onClick={() => setView('quiz')}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all
                ${view === 'quiz' ? 'bg-[#2A1810] text-[#FAF5EF]' : 'text-[#2A1810] hover:bg-[#E8DCC8]/40'}`}>
              Quiz
            </button>
          </div>
        </header>

        {view === 'lesson' && (
          <main className="space-y-14 fade-up">
            <section>
              <SectionHeader num="01" hu="Magánhangzók" en="The vowels" />
              <VowelsSection />
            </section>

            <section>
              <SectionHeader num="02" hu="Mássalhangzók" en="Compound consonants" />
              <ConsonantsSection />
            </section>

            <section>
              <SectionHeader num="03" hu="Hangrend" en="Vowel harmony" />
              <HarmonySection />
            </section>

            <section>
              <SectionHeader num="04" hu="Hol vagy?" en="Locative suffixes — 'in' / 'on'" />
              <LocativeSection />
            </section>

            <section>
              <SectionHeader num="05" hu="Honnan jössz?" en="Place of origin: -i" />
              <OriginSection />
            </section>

            <section>
              <SectionHeader num="06" hu="-ul / -ül" en="Languages & manner" />
              <LanguageSection />
            </section>

            <section>
              <SectionHeader num="07" hu="Lenni" en="To be — personal pronouns & conjugation" />
              <ToBeSection />
            </section>

            <section>
              <SectionHeader num="08" hu="Funkciók" en="Question forms & answers" />
              <FunctionsSection />
            </section>

            {/* CTA to quiz */}
            <section className="border-t border-[#E8DCC8] pt-10 text-center">
              <p className="font-display text-2xl text-[#2A1810] mb-4">Készen állsz?<span className="text-[#7A6B5C] text-base italic font-body ml-2">Ready?</span></p>
              <button onClick={() => setView('quiz')}
                className="btn-primary px-8 py-3.5 rounded-full font-body text-sm font-semibold inline-flex items-center gap-2">
                Take the quiz <ArrowRight className="w-4 h-4" />
              </button>
            </section>
          </main>
        )}

        {view === 'quiz' && (
          <main className="bg-white/70 border border-[#E8DCC8] rounded-2xl p-6 sm:p-10 mt-2">
            <Quiz />
          </main>
        )}

        <footer className="mt-16 pt-6 border-t border-[#E8DCC8] flex items-center justify-between">
          <span className="font-body text-xs text-[#7A6B5C]">Első lecke · Hungarian foundations</span>
          <span className="font-display italic text-sm text-[#8B2C24]">Sok szerencsét!</span>
        </footer>
      </div>
    </div>
  );
}
