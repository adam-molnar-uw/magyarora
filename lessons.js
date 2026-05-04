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

window.LESSONS_VERSION = '2026-05-04-1';

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
        hint: '-ban / -ben / -on / -en / -ön (type the FULL word if final a→á or e→é)',
        draws: 4,
        pool: [
          { w: 'Berlin',         a: 'ben', exp: 'high-vowel non-Hungarian city → -ben → Berlinben.' },
          { w: 'Madrid',         a: 'ban', exp: 'deep-vowel foreign city → -ban → Madridban.' },
          { w: 'Kanada',         a: ['Kanadában', 'kanadában'], exp: 'deep-vowel country, final a → á → **Kanadában**. Type the full word — the a lengthens!' },
          { w: 'Olaszország',    a: 'ban', exp: 'deep-vowel country → -ban → Olaszországban.' },
          { w: 'Magyarország',   a: 'on',  exp: 'Hungary uses -n form, not -ban → Magyarországon.' },
          { w: 'Szeged',         a: 'en',  exp: 'Hungarian city → -n form, high-vowel linking e → Szegeden.' },
          { w: 'Budapest',       a: 'en',  exp: 'Hungarian city → -en → Budapesten.' },
          { w: 'Pécs',           a: 'en',  exp: 'Hungarian city, high-vowel → -en → Pécsen.' },
          { w: 'Hollandia',      a: ['Hollandiában', 'hollandiában'], exp: 'foreign country, deep-vowel, final a → á → **Hollandiában**. Type the full word!' },
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
        hint: '-ul (deep) / -ül (high) — type the FULL word if final a→á',
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
          { w: 'francia', a: ['franciául', 'Franciául'], exp: 'deep + i → -ul, but final a → á → **franciául**. Type the full word!' },
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

  // ============================================================
  // LESSON 2A — MagyarOK Chapter 2 (Találkozás), Part 1
  // Covers MagyarOK exercises 1-18: greetings, introductions,
  // countries, nationalities, languages, full verb conjugation.
  // ============================================================
  {
    id: 'lecke-02a',
    week: 2,
    title: 'Második lecke · A',
    subtitle: 'Találkozás — greetings, introductions, full verb conjugation',

    sections: [

      // -------- GREETINGS --------
      {
        type: 'cards',
        title: 'Köszönések',
        subtitle: 'Greetings — formal (Ön) vs. informal (te)',
        intro: 'Hungarian greetings change with the time of day **and** the social register. The formal version usually adds **kívánok** ("I wish you"). Get these into reflexes — they are the very first thing you say in any conversation.',
        columns: 2,
        items: [
          { ruleTitle: 'Reggel · morning', ruleSub: 'until ~9–10am',
            list: ['**F:** Jó reggelt kívánok!', '**I:** Jó reggelt! / Szia!'] },
          { ruleTitle: 'Délben, délután · day', ruleSub: 'late morning to evening',
            list: ['**F:** Jó napot kívánok!', '**I:** Szia! / Szervusz!'] },
          { ruleTitle: 'Este · evening', ruleSub: 'after dark',
            list: ['**F:** Jó estét kívánok!', '**I:** Jó estét! / Szia!'] },
          { ruleTitle: 'Éjjel · night', ruleSub: 'going to bed',
            list: ['**F:** Jó éjszakát kívánok!', '**I:** Jó éjt! / Jó éjszakát!'] },
          { ruleTitle: 'Búcsúzás · parting', ruleSub: 'leaving',
            list: ['**F:** Viszontlátásra! / Viszlát!', '**I:** Szia! / Szervusz!'] },
          { ruleTitle: 'Tisztelet · respect', ruleSub: 'to elders / women',
            list: ['**F:** Csókolom! / Kezét csókolom!', 'literally _"I kiss [your hand]"_ — polite, not romantic'] },
        ],
        callout: { title: 'Plural informal:', body: '**Sziasztok!** / **Szervusztok!** — when greeting a group of friends.' },
      },

      // -------- INTRODUCTION FORMULAS --------
      {
        type: 'phrases',
        title: 'Bemutatkozás',
        subtitle: 'Introducing yourself',
        items: [
          { q: 'X vagyok.',                  en: "I'm X.",                              a: 'Adam vagyok.' },
          { q: 'Nagyon örülök.',             en: 'Very pleased to meet you.',           a: 'Én is nagyon örülök.' },
          { q: 'Elnézést, te vagy X?',       en: 'Excuse me, are you X? (informal)',    a: 'Igen, én vagyok. / Nem, X vagyok.' },
          { q: 'Elnézést, Ön X?',            en: 'Excuse me, are you X? (formal)',      a: '(Jaj,) elnézést! / Semmi baj.' },
          { q: 'Magyar vagy?',               en: 'Are you Hungarian?',                  a: 'Igen, magyar vagyok.' },
          { q: 'Mi a neved? / Mi a neve?',   en: 'What\'s your name? (inf./form.)',     a: 'A nevem Adam.' },
        ],
      },

      // -------- COUNTRIES / NATIONALITIES / LANGUAGES TRIPLET --------
      {
        type: 'cards',
        title: 'Ország · Nemzetiség · Nyelv',
        subtitle: 'Country · Nationality · Language — the three forms',
        intro: 'Every country gives you **three related words**: the country itself, the person from there, and the language. Learn them as a bundle.',
        columns: 1,
        items: [
          { ruleTitle: 'The pattern',
            list: [
              '**Magyarország** → magyar (vagyok) → magyarul (beszélek)',
              '**Németország** → német → németül',
              '**Olaszország** → olasz → olaszul',
              '**Franciaország** → francia → franciául _(a → á before -ul)_',
              '**Svájc** → svájci → német / francia / olasz',
              '**Kanada** → kanadai → angol / francia',
            ] },
        ],
        collapsibles: [
          { title: 'Country naming patterns',
            body: [
              '- **-ország** suffix: most European countries — Németország, Franciaország, Magyarország, Lengyelország, Spanyolország, Csehország…',
              '- **-ia ending**: Anglia, Hollandia, Norvégia, Brazília, Mongólia, Indonézia, Líbia',
              '- **No suffix**: Kanada, Japán, Svájc, Ciprus, India, Kína, Egyiptom',
              '- **az + name**: az USA / az Egyesült Államok (the United States)',
            ] },
          { title: 'When nationality and language differ',
            body: [
              'Sometimes the country, the people, and the dominant language don\'t match neatly. The **language** is what people **speak**, not what they\'re called.',
              '- **Brazília** → brazil → portugál _(Brazilians speak Portuguese)_',
              '- **Egyiptom** → egyiptomi → arab _(Egyptians speak Arabic)_',
              '- **Kanada** → kanadai → angol / francia _(two official languages)_',
              '- **Svájc** → svájci → német / francia / olasz / rétoromán _(four!)_',
              '- **Ciprus** → ciprusi → görög / török',
            ] },
        ],
      },

      // -------- COUNTRIES TABLE --------
      {
        type: 'table',
        title: 'Európai országok',
        subtitle: 'European countries — quick reference',
        headers: ['Ország', 'Nemzetiség', 'Nyelv'],
        accentCols: [0],
        rows: [
          ['Magyarország',   'magyar',    'magyar'],
          ['Németország',    'német',     'német'],
          ['Anglia',         'angol',     'angol'],
          ['Franciaország',  'francia',   'francia'],
          ['Olaszország',    'olasz',     'olasz'],
          ['Spanyolország',  'spanyol',   'spanyol'],
          ['Lengyelország',  'lengyel',   'lengyel'],
          ['Csehország',     'cseh',      'cseh'],
          ['Oroszország',    'orosz',     'orosz'],
          ['Görögország',    'görög',     'görög'],
          ['Törökország',    'török',     'török'],
          ['Hollandia',      'holland',   'holland'],
          ['Norvégia',       'norvég',    'norvég'],
          ['Svédország',     'svéd',      'svéd'],
          ['Finnország',     'finn',      'finn'],
          ['Portugália',     'portugál',  'portugál'],
          ['Ausztria',       'osztrák',   'német'],
          ['Svájc',          'svájci',    'német, francia, olasz'],
        ],
        note: 'The most common pattern is **-ország** (country of …): Németország = "country of the Germans." Note the irregular pairs: **Hollandia → holland**, **Brazília → brazil**, **Ausztria → osztrák**.',
      },

      // -------- CAPITAL ↔ COUNTRY --------
      {
        type: 'wordgrid',
        title: 'Fővárosok',
        subtitle: 'Capital cities — match the country',
        intro: 'A few are deceptive: **Bécs** is Vienna (not "Bach"!), **Varsó** is Warsaw, **Prága** is Prague.',
        items: [
          { base: 'Berlin',     full: 'Németország' },
          { base: 'Párizs',     full: 'Franciaország' },
          { base: 'Róma',       full: 'Olaszország' },
          { base: 'Madrid',     full: 'Spanyolország' },
          { base: 'Bécs',       full: 'Ausztria' },
          { base: 'Varsó',      full: 'Lengyelország' },
          { base: 'Prága',      full: 'Csehország' },
          { base: 'London',     full: 'Anglia' },
          { base: 'Lisszabon',  full: 'Portugália' },
          { base: 'Athén',      full: 'Görögország' },
          { base: 'Budapest',   full: 'Magyarország' },
          { base: 'Moszkva',    full: 'Oroszország' },
        ],
      },

      // -------- VERB CONJUGATION (SINGULAR) --------
      {
        type: 'table',
        title: 'Szabályos igék — egyes szám',
        subtitle: 'Regular verbs — singular conjugation',
        headers: ['', 'él · live', 'beszél · speak', 'tud · know how', 'tanul · learn'],
        accentCols: [1, 2, 3, 4],
        rows: [
          ['én',       'élek',   'beszélek',  'tudok',  'tanulok'],
          ['te',       'élsz',   'beszélsz',  'tudsz',  'tanulsz'],
          ['ő / Ön',   'él',     'beszél',    'tud',    'tanul'],
        ],
        note: 'Pattern: **én** → -ok (deep) / -ek (high) / -ök (round-front), **te** → -sz, **ő/Ön** → bare stem (no ending). The vowel of the ending follows the verb\'s harmony: _élek_ (high), _tudok_ (deep), _ülök_ (round-front).',
      },

      // -------- VERB CONJUGATION (PLURAL) --------
      {
        type: 'table',
        title: 'Szabályos igék — többes szám',
        subtitle: 'Regular verbs — plural conjugation',
        headers: ['', 'ending', 'él', 'beszél', 'tud'],
        accentCols: [2, 3, 4],
        rows: [
          ['mi (we)',          '-unk / -ünk',         'élünk',    'beszélünk',  'tudunk'],
          ['ti (you pl.)',     '-tok / -tek / -tök',  'éltek',    'beszéltek',  'tudtok'],
          ['ők / Önök',        '-nak / -nek',         'élnek',    'beszélnek',  'tudnak'],
        ],
        note: 'Plural endings always begin with a consonant (n, t), so you don\'t need a linking vowel — you just pick the harmony match: deep words take _-unk / -tok / -nak_, high take _-ünk / -tek / -nek_.',
      },

      // -------- DEGREES OF FLUENCY --------
      {
        type: 'cards',
        title: 'Mennyire?',
        subtitle: 'Degrees of fluency — from "not at all" to "very well"',
        intro: 'Hungarian uses an adverb in front of the verb to scale fluency — same structure as English "I speak it _well_."',
        columns: 1,
        items: [
          { ruleTitle: 'Low → High', ruleSub: 'memorize the staircase',
            list: [
              '**(Sajnos) nem** beszélek — sadly, I don\'t speak …',
              '**Egy kicsit** tudok — I know a little …',
              '**Elég jól** beszélek — I speak fairly well',
              '**Jól** beszélek — I speak well',
              '**Nagyon jól** beszélek — I speak very well',
            ] },
        ],
      },

      // -------- USEFUL DIALOGUE PHRASES --------
      {
        type: 'phrases',
        title: 'Hasznos kifejezések',
        subtitle: 'Useful phrases — questions & responses',
        items: [
          { q: 'Hol élsz? / Hol él?',          en: 'Where do you live?',                 a: 'Kanadában élek.' },
          { q: 'Berlini vagy?',                en: 'Are you from Berlin? (-i origin)',   a: 'Igen, az vagyok. / Nem, müncheni.' },
          { q: 'Beszélsz / Beszél magyarul?',  en: 'Do you speak Hungarian?',            a: 'Igen, egy kicsit. / Sajnos nem.' },
          { q: 'Milyen nyelven beszélsz?',     en: 'What language(s) do you speak?',     a: 'Angolul és magyarul.' },
          { q: 'Miért tanulsz magyarul?',      en: 'Why are you learning Hungarian?',    a: 'Mert a családom magyar.' },
          { q: 'Otthon milyen nyelven beszéltek?', en: 'What language(s) at home? (pl.)', a: 'Otthon magyarul beszélünk.' },
          { q: 'Tényleg?',                     en: 'Really?',                            a: 'Igen, tényleg!' },
          { q: 'Érdekes!',                     en: 'Interesting!',                       a: '— ' },
        ],
      },
    ],

    // ============================================================
    // QUIZ — Lesson 2A
    // Heavy emphasis on POOL questions for repeatable variation.
    // ============================================================
    quiz: [

      // STATIC: greeting register recognition
      { type: 'mc', id: 'reggelt-formal',
        q: 'Which is the FORMAL morning greeting?',
        opts: ['Szia!', 'Jó reggelt!', 'Jó reggelt kívánok!'],
        a: 2, exp: '**Kívánok** ("I wish you") makes it formal. Without it, "Jó reggelt!" alone is informal.' },

      { type: 'mc', id: 'parting-formal',
        q: 'Which is the FORMAL way to say goodbye?',
        opts: ['Szia!', 'Viszontlátásra!', 'Szervusz!'],
        a: 1, exp: '**Viszontlátásra** literally = "until we see again." The casual short form is **Viszlát!** (still formal-leaning).' },

      { type: 'mc', id: 'csokolom',
        q: 'Csókolom! is used by…',
        opts: ['lovers, romantically', 'children to adults, or men greeting older women — politely', 'close friends meeting for coffee'],
        a: 1, exp: 'It literally means "I kiss [your hand]" — old-fashioned politeness, not romantic.' },

      // POOL: greeting situation → correct phrase — DRAWS 4
      { type: 'pool-mc', id: 'greeting-situation',
        template: '{w}',
        opts: ['Jó reggelt kívánok!', 'Jó napot kívánok!', 'Jó estét kívánok!', 'Viszontlátásra!'],
        draws: 4,
        pool: [
          { w: 'You greet your manager at 9am.',                       a: 0, exp: 'Reggel + formal → "Jó reggelt kívánok!"' },
          { w: 'You arrive at a doctor\'s office at 2pm.',             a: 1, exp: 'Délután + formal → "Jó napot kívánok!"' },
          { w: 'You enter a restaurant at 7pm.',                       a: 2, exp: 'Este + formal → "Jó estét kívánok!"' },
          { w: 'You\'re leaving a formal meeting.',                    a: 3, exp: 'Búcsúzás + formal → "Viszontlátásra!"' },
          { w: 'You greet a stranger asking for directions at 11am.',  a: 1, exp: 'Délben + formal → "Jó napot kívánok!"' },
          { w: 'You wave goodbye to a colleague at the end of the day.', a: 3, exp: 'Búcsúzás + formal → "Viszontlátásra!"' },
        ],
      },

      // POOL: locative -ban/-ben/-on/-en (recap from L1, fresh items) — DRAWS 4
      // Items where vowel lengthens use full-word answers so the lengthening
      // is actually practiced; simple-suffix items use just the suffix.
      { type: 'pool-fill', id: 'l2a-locative',
        template: '{w}___ élek.',
        translation: 'I live in {w}.',
        hint: '-ban / -ben / -on / -en / -ön (type the FULL word if final a→á or e→é)',
        draws: 4,
        pool: [
          { w: 'Madrid',         a: 'ban',                          exp: 'deep-vowel foreign city → -ban → Madridban.' },
          { w: 'Bécs',           a: 'ben',                          exp: 'high-vowel foreign city → -ben → Bécsben (Vienna).' },
          { w: 'Velence',        a: ['Velencében', 'velencében'],   exp: 'final e → é before -ben → **Velencében**. Type the full word — the e lengthens!' },
          { w: 'Prága',          a: ['Prágában', 'prágában'],       exp: 'final a → á before -ban → **Prágában**. Type the full word — the a lengthens!' },
          { w: 'Mallorca',       a: ['Mallorcán', 'mallorcán'],     exp: 'island → -n form, final a → á → **Mallorcán**. Type the full word!' },
          { w: 'Pécs',           a: 'en',                           exp: 'Hungarian city, high-vowel → -en → Pécsen.' },
          { w: 'Debrecen',       a: 'ben',                          exp: 'Debrecen is one of the few Hungarian cities that takes -ben (not -en) → Debrecenben. Just memorize this exception.' },
          { w: 'Stuttgart',      a: 'ban',                          exp: 'deep-vowel German city → -ban → Stuttgartban.' },
          { w: 'a világ',        a: 'on',                           exp: '"the world" is special → a világon.' },
        ],
      },

      // POOL: capital → country — DRAWS 4
      { type: 'pool-fill', id: 'capital-country',
        template: 'Ha a főváros {w}, akkor az ország ___.',
        translation: 'If the capital is {w}, the country is ___.',
        hint: 'just the country name, no suffix',
        draws: 4,
        pool: [
          { w: 'Berlin',     a: ['Németország'], exp: 'Berlin is the capital of Germany.' },
          { w: 'Madrid',     a: ['Spanyolország'], exp: 'Madrid → Spanyolország.' },
          { w: 'Róma',       a: ['Olaszország'], exp: 'Róma → Olaszország (Rome → Italy).' },
          { w: 'Varsó',      a: ['Lengyelország'], exp: 'Varsó → Lengyelország (Warsaw → Poland).' },
          { w: 'Prága',      a: ['Csehország'], exp: 'Prága → Csehország (Prague → Czech Republic).' },
          { w: 'Bécs',       a: ['Ausztria'], exp: 'Bécs is Vienna — and Austria is **Ausztria**, the only country that takes "Ausztr-" not "-ország".' },
          { w: 'Lisszabon',  a: ['Portugália'], exp: 'Lisszabon → Portugália (note the -ia, not -ország).' },
          { w: 'Athén',      a: ['Görögország'], exp: 'Athén → Görögország (Athens → Greece).' },
          { w: 'Moszkva',    a: ['Oroszország'], exp: 'Moszkva → Oroszország.' },
          { w: 'Budapest',   a: ['Magyarország'], exp: 'Budapest → Magyarország. (Don\'t forget your own!)' },
          { w: 'Tokió',      a: ['Japán'], exp: 'Tokió → Japán (no -ország, just Japan).' },
        ],
      },

      // POOL: country → nationality+language pair recognition — DRAWS 3
      { type: 'pool-mc', id: 'nationality-language',
        template: 'Someone from {w} is called … and speaks …',
        opts: [
          'magyar / magyarul',
          'német / németül',
          'holland / hollandul',
          'brazil / portugálul',
          'osztrák / németül',
          'kanadai / angolul vagy franciául',
        ],
        draws: 3,
        pool: [
          { w: 'Magyarország',  a: 0, exp: 'magyar (person), magyarul (language).' },
          { w: 'Hollandia',     a: 2, exp: 'irregular: Hollandia → **holland** (not "hollandiai") → hollandul.' },
          { w: 'Brazília',      a: 3, exp: 'gotcha! Brazilians are **brazil**, but they speak **portugálul** (Portuguese).' },
          { w: 'Ausztria',      a: 4, exp: 'irregular: Ausztria → **osztrák** (not "ausztriai") → speaks németül.' },
          { w: 'Kanada',        a: 5, exp: 'kanadai → English or French (both official).' },
          { w: 'Németország',   a: 1, exp: 'német, németül — straightforward.' },
        ],
      },

      // POOL: -ul / -ül language adverb (fresh items, more variety) — DRAWS 4
      { type: 'pool-fill', id: 'l2a-language',
        template: 'Beszélek {w}___.',
        translation: 'I speak {w}.',
        hint: '-ul (deep) / -ül (high)',
        draws: 4,
        pool: [
          { w: 'magyar',   a: 'ul', exp: 'deep-vowel → -ul → magyarul.' },
          { w: 'cseh',     a: 'ül', exp: 'high-vowel → -ül → csehül.' },
          { w: 'olasz',    a: 'ul', exp: 'deep-vowel → -ul → olaszul.' },
          { w: 'japán',    a: 'ul', exp: 'deep-vowel → -ul → japánul.' },
          { w: 'holland',  a: 'ul', exp: 'deep-vowel → -ul → hollandul.' },
          { w: 'görög',    a: 'ül', exp: 'high/round-vowel → -ül → görögül.' },
          { w: 'finn',     a: 'ül', exp: 'high-vowel → -ül → finnül.' },
          { w: 'lengyel',  a: 'ül', exp: 'high-vowel → -ül → lengyelül.' },
          { w: 'svéd',     a: 'ül', exp: 'high-vowel → -ül → svédül.' },
          { w: 'arab',     a: 'ul', exp: 'deep-vowel → -ul → arabul.' },
          { w: 'kínai',    a: 'ul', exp: 'deep + i → -ul → kínaiul.' },
          { w: 'héber',    a: 'ül', exp: 'high-vowel → -ül → héberül (Hebrew).' },
        ],
      },

      // POOL: regular verb conjugation — singular — DRAWS 5
      { type: 'pool-fill', id: 'verb-singular',
        template: '{w}',
        hint: 'conjugate the bracketed infinitive',
        draws: 5,
        pool: [
          { w: 'Én Kanadában (élni) ___.',                a: ['élek'],     exp: 'én + él → élek (high-vowel verb, -ek).' },
          { w: 'Te magyarul (tanulni) ___?',              a: ['tanulsz'],  exp: 'te → -sz → tanulsz.' },
          { w: 'Ön angolul (beszélni) ___?',              a: ['beszél'],   exp: 'Ön → bare stem → beszél (no ending).' },
          { w: 'Ő egy kicsit magyarul (tudni) ___.',      a: ['tud'],      exp: 'ő → bare stem → tud.' },
          { w: 'Én németül (beszélni) ___.',              a: ['beszélek'], exp: 'én + beszél → beszélek (-ek for high).' },
          { w: 'Te hol (élni) ___?',                      a: ['élsz'],     exp: 'te + él → élsz.' },
          { w: 'Anna Budapesten (tanulni) ___.',          a: ['tanul'],    exp: 'ő (Anna) → bare stem → tanul.' },
          { w: 'Én sajnos nem (tudni) ___ csehül.',       a: ['tudok'],    exp: 'én + tud → tudok (-ok for deep).' },
          { w: 'Ön Berlinben (élni) ___?',                a: ['él'],       exp: 'Ön → bare stem → él.' },
          { w: 'Én most franciául (tanulni) ___.',        a: ['tanulok'],  exp: 'én + tanul → tanulok (-ok).' },
        ],
      },

      // POOL: regular verb conjugation — plural — DRAWS 4
      { type: 'pool-fill', id: 'verb-plural',
        template: '{w}',
        hint: 'conjugate for the plural pronoun',
        draws: 4,
        pool: [
          { w: 'Mi otthon (beszélni) ___ magyarul.',      a: ['beszélünk'], exp: 'mi + beszél → beszélünk (high → -ünk).' },
          { w: 'Ti hol (élni) ___?',                      a: ['éltek'],     exp: 'ti + él → éltek (-tek for high).' },
          { w: 'Ők németül (tanulni) ___.',               a: ['tanulnak'],  exp: 'ők + tanul → tanulnak (-nak for deep).' },
          { w: 'Mi egy kicsit (tudni) ___ olaszul.',      a: ['tudunk'],    exp: 'mi + tud → tudunk (deep → -unk).' },
          { w: 'Önök milyen nyelven (beszélni) ___?',     a: ['beszélnek'], exp: 'Önök = formal "they" → beszélnek (-nek for high).' },
          { w: 'Anna és Péter Bécsben (élni) ___.',       a: ['élnek'],     exp: 'plural subject → ők → élnek.' },
          { w: 'Ti japánul (tudni) ___?',                 a: ['tudtok'],    exp: 'ti + tud → tudtok (-tok for deep).' },
          { w: 'Mi most franciául (tanulni) ___.',        a: ['tanulunk'],  exp: 'mi + tanul → tanulunk (deep → -unk).' },
          { w: 'Ők elég jól (beszélni) ___ angolul.',     a: ['beszélnek'], exp: 'ők + beszél → beszélnek (-nek for high).' },
          { w: 'Önök Budapesten (élni) ___?',             a: ['élnek'],     exp: 'Önök → 3pl → élnek.' },
        ],
      },

      // POOL: degree of fluency selection — DRAWS 3
      { type: 'pool-mc', id: 'fluency',
        template: 'Hungarian for: "{w}"',
        opts: [
          'Sajnos nem beszélek',
          'Egy kicsit tudok',
          'Elég jól beszélek',
          'Jól beszélek',
          'Nagyon jól beszélek',
        ],
        draws: 3,
        pool: [
          { w: "I sadly don't speak …",         a: 0, exp: '_Sajnos_ = sadly. Pairs with _nem_.' },
          { w: 'I know a little …',             a: 1, exp: '_Egy kicsit_ = a little — used with _tudok_ (know how) more than _beszélek_.' },
          { w: 'I speak fairly well …',         a: 2, exp: '_Elég jól_ — "fairly/quite well." A useful in-between level.' },
          { w: 'I speak … well',                a: 3, exp: '_Jól_ alone is the neutral "well."' },
          { w: 'I speak … very well',           a: 4, exp: '_Nagyon jól_ = very well, the top of the staircase.' },
        ],
      },

      // STATIC: pronunciation gotcha
      { type: 'mc', id: 'becs',
        q: 'What does "Bécs" mean?',
        opts: ['Bach (the composer)', 'Vienna', 'a Hungarian village'],
        a: 1, exp: 'Bécs = Vienna in Hungarian. Pronounced "baych."' },

      // STATIC: linking-vowel awareness for én
      { type: 'mc', id: 'en-linking-vowel',
        q: 'For "én", which set of endings does Hungarian use?',
        opts: [
          '-ok (deep) / -ek (high) / -ök (round-front)',
          '-sz for everyone',
          'just -k for everyone',
        ],
        a: 0, exp: 'The én ending is **-Vk** where V follows vowel harmony: tudok, élek, ülök.' },
    ],
  },

  // ============================================================
  // ADD MORE LESSONS BELOW (lecke-02b, lecke-03, …)
  // Copy the structure above — make sure `id` is unique.
  // ============================================================

];
