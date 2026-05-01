// ============================================================
// LESSONS DATA — edit this file to add a new lesson each week
// ============================================================
//
// HOW TO ADD A LESSON:
// 1. Bump LESSONS_VERSION below (any new value — date is good).
// 2. Add a new object to the LESSONS array, following the pattern.
// 3. Commit + push. The PWA picks up the new lesson automatically.
//
// See README.md for full docs on section types & quiz types.
// ============================================================

window.LESSONS_VERSION = '2026-04-30-1';

window.LESSONS = [

  // ============================================================
  // LESSON 1
  // ============================================================
  {
    id: 'lecke-01',
    week: 1,
    title: 'Első lecke',
    subtitle: 'First lesson — sounds, vowel harmony, suffixes & "to be"',

    sections: [

      // -------- VOWELS --------
      {
        type: 'vowels',
        title: 'Magánhangzók',
        subtitle: 'The vowels',
        items: [
          { letter: 'a, á',  desc: '"a" as in "although"  ·  "á" as in "father"', examples: [['ház', 'house'], ['ablak', 'window']] },
          { letter: 'e, é',  desc: '"e" as in "less"  ·  "é" as in "café"',       examples: [['elefánt', 'elephant'], ['szép', 'beautiful']] },
          { letter: 'i, í',  desc: 'short and long "ee"',                          examples: [['víz', 'water']] },
          { letter: 'o, ó',  desc: 'short and long "o"',                           examples: [['óra', 'clock / hour']] },
          { letter: 'u, ú',  desc: 'short and long "oo"',                          examples: [['kutya', 'dog'], ['út', 'road']] },
          { letter: 'ö, ő',  desc: 'rounded — like German "ö"',                    examples: [['öröm', 'happiness'], ['nő', 'woman']] },
          { letter: 'ü, ű',  desc: 'rounded — like German "ü"',                    examples: [['fürdő', 'bath'], ['tűz', 'fire']] },
        ],
      },

      // -------- COMPOUND CONSONANTS --------
      {
        type: 'consonants',
        title: 'Mássalhangzók',
        subtitle: 'Compound consonants',
        items: [
          { letter: 'cs',  sound: '"ch" in "check"',     ex: 'macska',   tr: 'cat' },
          { letter: 'sz',  sound: '"s" in "sun"',        ex: 'szoba',    tr: 'room' },
          { letter: 'zs',  sound: '"s" in "pleasure"',   ex: 'zseb',     tr: 'pocket' },
          { letter: 'gy',  sound: '"d" in "during"',     ex: 'egy',      tr: 'one' },
          { letter: 'ty',  sound: 'as in "tube"',        ex: 'tyúk',     tr: 'hen' },
          { letter: 'ny',  sound: '"n" in "new"',        ex: 'nyár',     tr: 'summer' },
          { letter: 'ly',  sound: '"y" in "yes" (= j)',  ex: 'folyó',    tr: 'river' },
          { letter: 'dz',  sound: '"ds" in "kids"',      ex: 'edzeni',   tr: 'to work out' },
          { letter: 'dzs', sound: '"j" in "juice"',      ex: 'dzsungel', tr: 'jungle' },
        ],
      },

      // -------- VOWEL HARMONY --------
      {
        type: 'cards',
        title: 'Hangrend',
        subtitle: 'Vowel harmony',
        intro: 'Hungarian sorts every word into one of three vowel-harmony groups. Suffixes change shape to match — so knowing the group is essential before you can attach anything.',
        columns: 3,
        items: [
          { style: 'deep',  eyebrow: 'Mély (Deep)',    title: 'memoriter: AUTÓ',       sub: 'a · á · o · ó · u · ú',           list: [['tyúk','hen'],['ágy','bed'],['joghurt','yogurt']] },
          { style: 'mixed', eyebrow: 'Vegyes (Mixed)', title: 'deep + high',           sub: 'a/á/o + e/é/i',                    list: [['elefánt','elephant'],['zsiráf','giraffe'],['éjszaka','night']] },
          { style: 'high',  eyebrow: 'Magas (High)',   title: 'memoriter: TENISZÜTŐ', sub: 'e · é · i · í · ö · ő · ü · ű', list: [['üveg','bottle'],['öt','five'],['internet','internet']] },
        ],
        callout: { title: 'Round vowels:', body: 'ö, ő, ü, ű — these matter for the special -ön suffix.' },
      },

      // -------- LOCATIVE SUFFIXES --------
      {
        type: 'cards',
        title: 'Hol vagy?',
        subtitle: "Locative suffixes — 'in' / 'on'",
        columns: 2,
        items: [
          { ruleTitle: '-ban / -ben',          ruleSub: '"in" — for most places',
            list: ['Észak-Amerikáb**an** — North America', 'Kanadáb**an** — Canada', 'Waterloo**ban** — Waterloo', 'Velencéb**en** — Venice'] },
          { ruleTitle: '-n / -on / -en / -ön', ruleSub: '"on" — Hungary, Hungarian cities, islands',
            list: ['Magyarország**on**', 'Budapest**en**, Szeged**en**', 'a világ**on** — in the world', 'Cipru**son**, Máltá**n** — islands'] },
        ],
        collapsibles: [
          { title: 'The vowel-lengthening trick (a → á, e → é)',
            body: ['When a word ends in **a** or **e**, the vowel lengthens before the suffix:',
                   '- Afrika → Afrik**á**ban',
                   '- Anglia → Angli**á**ban',
                   '- Velence → Velenc**é**ben',
                   '- Chile → Chil**é**ben'] },
          { title: 'How to choose the right form',
            body: ['- **Deep-vowel word** → -ban (e.g. Kanadában)',
                   '- **High-vowel word** → -ben (e.g. Berlinben)',
                   '- **Round-vowel last syllable** → -ön (e.g. fürdőn)',
                   '- **Compound word** → harmony of the LAST element'] },
        ],
      },

      // -------- PLACE OF ORIGIN -i --------
      {
        type: 'cards',
        title: 'Honnan jössz?',
        subtitle: 'Place of origin: -i',
        intro: 'To say "from somewhere" or describe origin, just add **-i** to the place name.',
        columns: 3,
        items: [
          { ruleTitle: 'Continent', list: ['Európa → európai', 'Ázsia → ázsiai', 'Afrika → afrikai'], note: 'Exception: Ausztrália → ausztrál' },
          { ruleTitle: 'Country',   list: ['Svájc → svájci',  'Kanada → kanadai', 'Egyiptom → egyiptomi'] },
          { ruleTitle: 'City',      list: ['Szeged → szegedi', 'London → londoni', 'Párizs → párizsi'] },
        ],
      },

      // -------- LANGUAGES -ul/-ül --------
      {
        type: 'wordgrid',
        title: '-ul / -ül',
        subtitle: 'Languages & manner',
        intro: '**-ul / -ül** turns a noun (especially a language or nationality) into an adverb — meaning "in [language]" or "in a [way]". Choose by vowel harmony.',
        items: [
          { base: 'magyar',  full: 'magyarul' },
          { base: 'angol',   full: 'angolul' },
          { base: 'koreai',  full: 'koreaiul' },
          { base: 'német',   full: 'németül' },
          { base: 'török',   full: 'törökül' },
          { base: 'kínai',   full: 'kínaiul' },
          { base: 'lengyel', full: 'lengyelül' },
          { base: 'dán',     full: 'dánul' },
        ],
      },

      // -------- TO BE --------
      {
        type: 'table',
        title: 'Lenni',
        subtitle: 'To be — pronouns & conjugation',
        headers: ['Pronoun', 'English', 'to be', 'Pronoun', 'English', 'to be'],
        accentCols: [2, 5],
        rows: [
          ['én',       'I',         'vagyok',     'mi',        'we',        'vagyunk'],
          ['te / Ön',  'you (s.)',  'vagy / —',   'ti / Önök', 'you (pl.)', 'vagytok / —'],
          ['ő',        'he/she',    'van *',      'ők',        'they',      'vannak *'],
        ],
        note: '* **van** and **vannak** are dropped when describing identity, profession, or qualities — e.g. "Anna tanár." (Anna is a teacher.) But kept for location: "Anna itt _van_." (Anna is here.)',
      },

      // -------- FUNCTIONS --------
      {
        type: 'phrases',
        title: 'Funkciók',
        subtitle: 'Question forms & answers',
        items: [
          { q: 'Ki vagy?',                       en: 'Who are you?',          a: 'Martin vagyok.' },
          { q: 'Mi vagy? / Mivel foglalkozol?',  en: 'What do you do?',       a: 'Mérnök vagyok.' },
          { q: 'Mi ez / az?',                    en: 'What is this / that?',  a: 'Ez egy város.' },
          { q: 'Hány éves vagy?',                en: 'How old are you?',      a: 'Huszonkét éves vagyok.' },
          { q: 'Milyen nemzetiségű vagy?',       en: "What's your nationality?", a: 'Német vagyok.' },
          { q: 'Milyen Magyarország?',           en: 'What is Hungary like?', a: 'Magyarország kicsi.' },
        ],
      },
    ],

    // ============================================================
    // QUIZ
    // Mix static questions with POOL questions for random variation.
    // Pool questions draw N items from the pool each attempt — so
    // the rule is what gets practiced, not the specific example.
    // ============================================================
    quiz: [

      // STATIC: pronunciation
      { type: 'mc', id: 'cs-sound',
        q: 'What sound does "cs" make?',
        opts: ['"ch" in "check"', '"k" in "kite"', '"sh" in "shoe"'],
        a: 0, exp: '"cs" → "ch" in "check". Example: macska (cat).' },

      { type: 'mc', id: 'gy-sound',
        q: 'What sound does "gy" make?',
        opts: ['like "g" in "gate"', 'like "d" in "during"', 'like "j" in "juice"'],
        a: 1, exp: 'A soft palatal sound — egy (one).' },

      { type: 'mc', id: 'sz-sound',
        q: 'What sound does "sz" make?',
        opts: ['"s" in "sun"', '"sh" in "shoe"', '"z" in "zebra"'],
        a: 0, exp: '"sz" is the regular English "s". (Note: a lone "s" in Hungarian = "sh"!)' },

      // POOL: vowel harmony classification — DRAWS 3 each attempt
      { type: 'pool-mc', id: 'harmony',
        template: 'Is "{w}" deep, mixed, or high?',
        opts: ['Mély (Deep)', 'Vegyes (Mixed)', 'Magas (High)'],
        draws: 3,
        pool: [
          { w: 'kutya',    a: 0, exp: 'u and a are both deep → mély.' },
          { w: 'tyúk',     a: 0, exp: 'only ú → mély (deep).' },
          { w: 'ablak',    a: 0, exp: 'a and a → mély.' },
          { w: 'autó',     a: 0, exp: 'a, u, ó — all deep.' },
          { w: 'elefánt',  a: 1, exp: 'e/é high but á is deep → vegyes (mixed).' },
          { w: 'zsiráf',   a: 1, exp: 'i high, á deep → vegyes.' },
          { w: 'éjszaka',  a: 1, exp: 'é high but a is deep → vegyes.' },
          { w: 'üveg',     a: 2, exp: 'ü and e — both high → magas.' },
          { w: 'öt',       a: 2, exp: 'ö is high → magas.' },
          { w: 'fürdő',    a: 2, exp: 'ü and ő — both high (and round) → magas.' },
          { w: 'internet', a: 2, exp: 'i, e, e — all high → magas.' },
          { w: 'tűz',      a: 2, exp: 'ű is high → magas.' },
        ],
      },

      // POOL: locative suffix — DRAWS 4 each attempt
      { type: 'pool-fill', id: 'locative',
        template: '{w}___ élek.',
        translation: 'I live in {w}.',
        hint: '-ban / -ben / -on / -en / -ön',
        draws: 4,
        pool: [
          { w: 'Berlin',         a: 'ben', exp: 'high-vowel non-Hungarian city → -ben → Berlinben.' },
          { w: 'Madrid',         a: 'ban', exp: 'deep-vowel foreign city → -ban → Madridban.' },
          { w: 'Kanada',         a: 'ban', exp: 'deep-vowel country → -ban (final a → á) → Kanadában.' },
          { w: 'Olaszország',    a: 'ban', exp: 'deep-vowel country → -ban → Olaszországban.' },
          { w: 'Magyarország',   a: 'on',  exp: 'Hungary uses -n form, not -ban → Magyarországon.' },
          { w: 'Szeged',         a: 'en',  exp: 'Hungarian city → -n form, high-vowel linking e → Szegeden.' },
          { w: 'Budapest',       a: 'en',  exp: 'Hungarian city → -en → Budapesten.' },
          { w: 'Pécs',           a: 'en',  exp: 'Hungarian city, high-vowel → -en → Pécsen.' },
          { w: 'Hollandia',      a: 'ban', exp: 'foreign country, deep-vowel → -ban (final a → á) → Hollandiában.' },
          { w: 'Lisszabon',      a: 'ban', exp: 'foreign city, deep-vowel → -ban → Lisszabonban.' },
        ],
      },

      // POOL: place of origin -i — DRAWS 3 each attempt
      { type: 'pool-fill', id: 'origin',
        template: '{w} → ___',
        translation: 'place of origin (add -i)',
        hint: 'add -i (some words drop final vowel)',
        draws: 3,
        pool: [
          { w: 'London',     a: 'londoni',    exp: 'add -i → londoni.' },
          { w: 'Párizs',     a: 'párizsi',    exp: 'add -i → párizsi.' },
          { w: 'Szeged',     a: 'szegedi',    exp: 'add -i → szegedi.' },
          { w: 'Kecskemét',  a: 'kecskeméti', exp: 'add -i → kecskeméti.' },
          { w: 'Svájc',      a: 'svájci',     exp: 'add -i → svájci (Swiss).' },
          { w: 'Kanada',     a: 'kanadai',    exp: 'add -i → kanadai.' },
          { w: 'Libanon',    a: 'libanoni',   exp: 'add -i → libanoni.' },
          { w: 'Egyiptom',   a: 'egyiptomi',  exp: 'add -i → egyiptomi.' },
          { w: 'Európa',     a: 'európai',    exp: 'continent + -i → európai.' },
          { w: 'Afrika',     a: 'afrikai',    exp: 'continent + -i → afrikai.' },
        ],
      },

      // POOL: -ul / -ül language adverb — DRAWS 3 each attempt
      { type: 'pool-fill', id: 'language',
        template: 'Beszélek {w}___ (I speak {w}).',
        hint: '-ul (deep) / -ül (high)',
        draws: 3,
        pool: [
          { w: 'magyar',  a: 'ul', exp: 'deep-vowel → -ul → magyarul.' },
          { w: 'angol',   a: 'ul', exp: 'deep-vowel → -ul → angolul.' },
          { w: 'spanyol', a: 'ul', exp: 'deep-vowel → -ul → spanyolul.' },
          { w: 'olasz',   a: 'ul', exp: 'deep-vowel → -ul → olaszul.' },
          { w: 'orosz',   a: 'ul', exp: 'deep-vowel → -ul → oroszul.' },
          { w: 'török',   a: 'ül', exp: 'high/round-vowel → -ül → törökül.' },
          { w: 'német',   a: 'ül', exp: 'high-vowel → -ül → németül.' },
          { w: 'görög',   a: 'ül', exp: 'high/round-vowel → -ül → görögül.' },
          { w: 'francia', a: 'ul', exp: 'deep + i → -ul → franciául.' },
        ],
      },

      // POOL: 'to be' conjugation — DRAWS 3 each attempt
      { type: 'pool-mc', id: 'lenni',
        template: '___ {w}.',
        opts: ['vagyok', 'vagy', 'vagyunk', 'vagytok'],
        draws: 3,
        pool: [
          { w: 'tanár (én)',     a: 0, exp: 'én → vagyok. "Tanár vagyok." = I am a teacher.' },
          { w: 'fáradt (te)',    a: 1, exp: 'te → vagy. "Fáradt vagy." = You are tired.' },
          { w: 'orvosok (mi)',   a: 2, exp: 'mi → vagyunk. "Orvosok vagyunk." = We are doctors.' },
          { w: 'okosak (ti)',    a: 3, exp: 'ti → vagytok. "Okosak vagytok." = You (pl.) are smart.' },
          { w: 'magyar (én)',    a: 0, exp: 'én → vagyok.' },
          { w: 'itthon (mi)',    a: 2, exp: 'mi → vagyunk. "Itthon vagyunk." = We are home.' },
        ],
      },

      // STATIC: meaning recognition
      { type: 'mc', id: 'hany-eves',
        q: 'What does "Hány éves vagy?" mean?',
        opts: ["What's your name?", 'How old are you?', 'Where are you from?'],
        a: 1, exp: 'hány = how many · éves = years old.' },

      { type: 'mc', id: 'milyen-nemz',
        q: 'What does "Milyen nemzetiségű vagy?" mean?',
        opts: ["What's your job?", "What's your nationality?", 'How are you?'],
        a: 1, exp: 'nemzetiség = nationality.' },
    ],
  },

  // ============================================================
  // ADD MORE LESSONS BELOW (lecke-02, lecke-03, …)
  // Copy the structure above — make sure `id` is unique.
  // ============================================================

];
