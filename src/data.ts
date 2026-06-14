export interface TamilLetter {
  id: string;
  letter: string;
  phonics: string;
  exampleTamil: string;
  exampleEnglish: string;
  examplePronunciation: string;
  illustration: string; // Emoji or SVG reference representing the noun
  type: "uyir" | "mei" | "aytha";
}

export const UYIR_LETTERS: TamilLetter[] = [
  {
    id: "uyir-1",
    letter: "அ",
    phonics: "A (Short 'a' as in 'cup')",
    exampleTamil: "அம்மா",
    exampleEnglish: "Mother",
    examplePronunciation: "Am-maa",
    illustration: "👩‍👦",
    type: "uyir",
  },
  {
    id: "uyir-2",
    letter: "ஆ",
    phonics: "Aa (Long 'aa' as in 'far')",
    exampleTamil: "ஆடு",
    exampleEnglish: "Goat",
    examplePronunciation: "Aa-du",
    illustration: "🐐",
    type: "uyir",
  },
  {
    id: "uyir-3",
    letter: "இ",
    phonics: "I (Short 'i' as in 'pin')",
    exampleTamil: "இலை",
    exampleEnglish: "Leaf",
    examplePronunciation: "I-lai",
    illustration: "🍃",
    type: "uyir",
  },
  {
    id: "uyir-4",
    letter: "ஈ",
    phonics: "Ee (Long 'ee' as in 'bee')",
    exampleTamil: "ஈட்டி",
    exampleEnglish: "Spear",
    examplePronunciation: "Ee-ttiy",
    illustration: "🔱",
    type: "uyir",
  },
  {
    id: "uyir-5",
    letter: "உ",
    phonics: "U (Short 'u' as in 'put')",
    exampleTamil: "உரல்",
    exampleEnglish: "Mortar (Grinder)",
    examplePronunciation: "U-ral",
    illustration: "🥣",
    type: "uyir",
  },
  {
    id: "uyir-6",
    letter: "ஊ",
    phonics: "Oo (Long 'oo' as in 'cool')",
    exampleTamil: "ஊஞ்சல்",
    exampleEnglish: "Swing",
    examplePronunciation: "Oon-jal",
    illustration: "🎪",
    type: "uyir",
  },
  {
    id: "uyir-7",
    letter: "எ",
    phonics: "E (Short 'e' as in 'red')",
    exampleTamil: "எலி",
    exampleEnglish: "Rat",
    examplePronunciation: "E-li",
    illustration: "🐀",
    type: "uyir",
  },
  {
    id: "uyir-8",
    letter: "ஏ",
    phonics: "Ae (Long 'ay' as in 'play')",
    exampleTamil: "ஏணி",
    exampleEnglish: "Ladder",
    examplePronunciation: "Aa-ni",
    illustration: "🪜",
    type: "uyir",
  },
  {
    id: "uyir-9",
    letter: "ஐ",
    phonics: "Ai (Diphthong 'ai' as in 'ice')",
    exampleTamil: "ஐந்து",
    exampleEnglish: "Five",
    examplePronunciation: "Ain-dhu",
    illustration: "🖐️",
    type: "uyir",
  },
  {
    id: "uyir-10",
    letter: "ஒ",
    phonics: "O (Short 'o' as in 'go' - clipped)",
    exampleTamil: "ஒட்டகம்",
    exampleEnglish: "Camel",
    examplePronunciation: "Ot-ta-gam",
    illustration: "🐪",
    type: "uyir",
  },
  {
    id: "uyir-11",
    letter: "ஓ",
    phonics: "Oh (Long 'oh' as in 'boat')",
    exampleTamil: "ஓடம்",
    exampleEnglish: "Boat",
    examplePronunciation: "Oh-dam",
    illustration: "⛵",
    type: "uyir",
  },
  {
    id: "uyir-12",
    letter: "ஔ",
    phonics: "Au (Diphthong 'ow' as in 'cow')",
    exampleTamil: "ஔவையார்",
    exampleEnglish: "Avvaiyar (Poetess)",
    examplePronunciation: "Av-vai-yaar",
    illustration: "👵",
    type: "uyir",
  },
];

export const MEI_LETTERS: TamilLetter[] = [
  {
    id: "mei-1",
    letter: "க்",
    phonics: "Ik (Hard 'k' in sack)",
    exampleTamil: "சக்கரம்",
    exampleEnglish: "Wheel",
    examplePronunciation: "Sak-ka-ram",
    illustration: "⚙️",
    type: "mei",
  },
  {
    id: "mei-2",
    letter: "ங்",
    phonics: "Ing (Nasal 'ng' in sing)",
    exampleTamil: "சிங்கம்",
    exampleEnglish: "Lion",
    examplePronunciation: "Sin-gam",
    illustration: "🦁",
    type: "mei",
  },
  {
    id: "mei-3",
    letter: "ச்",
    phonics: "Ich (Soft 'ch' in rich / 's')",
    exampleTamil: "பச்சை",
    exampleEnglish: "Green",
    examplePronunciation: "Pach-chai",
    illustration: "💚",
    type: "mei",
  },
  {
    id: "mei-4",
    letter: "ஞ்",
    phonics: "Iny (Soft palatal nasal 'ny' in canyon)",
    exampleTamil: "இஞ்சி",
    exampleEnglish: "Ginger",
    examplePronunciation: "In-ji",
    illustration: "🪵",
    type: "mei",
  },
  {
    id: "mei-5",
    letter: "ட்",
    phonics: "It (Hard retroflex 't' as in card)",
    exampleTamil: "கட்டம்",
    exampleEnglish: "Square",
    examplePronunciation: "Kat-tam",
    illustration: "🟩",
    type: "mei",
  },
  {
    id: "mei-6",
    letter: "ண்",
    phonics: "Inr (Retroflex nasal - roll tongue back)",
    exampleTamil: "வண்டு",
    exampleEnglish: "Beetle / Bug",
    examplePronunciation: "Van-du",
    illustration: "🐞",
    type: "mei",
  },
  {
    id: "mei-7",
    letter: "த்",
    phonics: "Ith (Soft dental 'th' as in thin)",
    exampleTamil: "நட்சத்திரம்",
    exampleEnglish: "Star",
    examplePronunciation: "Nat-chat-thi-ram",
    illustration: "⭐",
    type: "mei",
  },
  {
    id: "mei-8",
    letter: "ந்",
    phonics: "In (Dental nasal tongue behind teeth)",
    exampleTamil: "நண்டு",
    exampleEnglish: "Crab",
    examplePronunciation: "Nan-du",
    illustration: "🦀",
    type: "mei",
  },
  {
    id: "mei-9",
    letter: "ப்",
    phonics: "Ip (Plosive 'p' as in cup)",
    exampleTamil: "கப்பல்",
    exampleEnglish: "Ship",
    examplePronunciation: "Kap-pal",
    illustration: "🚢",
    type: "mei",
  },
  {
    id: "mei-10",
    letter: "ம்",
    phonics: "Im (Standard labial 'm')",
    exampleTamil: "மரம்",
    exampleEnglish: "Tree",
    examplePronunciation: "Ma-ram",
    illustration: "🌳",
    type: "mei",
  },
  {
    id: "mei-11",
    letter: "ய்",
    phonics: "Iy (Standard palatal 'y')",
    exampleTamil: "நாய்",
    exampleEnglish: "Dog",
    examplePronunciation: "Naay",
    illustration: "🐕",
    type: "mei",
  },
  {
    id: "mei-12",
    letter: "ர்",
    phonics: "Ir (Alveolar tap R)",
    exampleTamil: "மயில்",
    exampleEnglish: "Peacock",
    examplePronunciation: "Ma-yil",
    illustration: "🦚",
    type: "mei",
  },
  {
    id: "mei-13",
    letter: "ல்",
    phonics: "Il (Alveolar light L behind front teeth)",
    exampleTamil: "சேவல்",
    exampleEnglish: "Rooster",
    examplePronunciation: "Se-val",
    illustration: "🐓",
    type: "mei",
  },
  {
    id: "mei-14",
    letter: "வ்",
    phonics: "Iv (Labiodental fricative 'v')",
    exampleTamil: "வண்டு",
    exampleEnglish: "Wasp / Bug",
    examplePronunciation: "Van-du",
    illustration: "🐝",
    type: "mei",
  },
  {
    id: "mei-15",
    letter: "ழ்",
    phonics: "Izh (Cerebral retroflex approximant - Deep L)",
    exampleTamil: "தமிழ்",
    exampleEnglish: "Tamil (Language)",
    examplePronunciation: "Ta-mizh",
    illustration: "🗣️",
    type: "mei",
  },
  {
    id: "mei-16",
    letter: "ள்",
    phonics: "Ilh (Alveolar retroflex 'L' rolled further back)",
    exampleTamil: "வாள்",
    exampleEnglish: "Sword",
    examplePronunciation: "Vaal",
    illustration: "⚔️",
    type: "mei",
  },
  {
    id: "mei-17",
    letter: "ற்",
    phonics: "Irr (Alveolar trill 'Tr' emphasis)",
    exampleTamil: "பறவை",
    exampleEnglish: "Bird",
    examplePronunciation: "Pa-ra-vai",
    illustration: "🐦",
    type: "mei",
  },
  {
    id: "mei-18",
    letter: "ன்",
    phonics: "In (Alveolar nasal standard N)",
    exampleTamil: "மீன்",
    exampleEnglish: "Fish",
    examplePronunciation: "Meen",
    illustration: "🐟",
    type: "mei",
  },
];

export const AYTHA_LETTER: TamilLetter = {
  id: "aytha-1",
  letter: "ஃ",
  phonics: "Ah-kh (Ayudha eluthu, glottal spec)",
  exampleTamil: "எஃகு",
  exampleEnglish: "Steel / Sword",
  examplePronunciation: "Eh-khu",
  illustration: "⚔️",
  type: "aytha",
};

export interface TamilNumber {
  value: number;
  script: string; // Tamil numeral e.g. ௰
  word: string;   // Tamil word representation
  phonetic: string; // English spelling pronunciations
}

// Key numbers dataset used as base blocks to construct numbers 1-100 phonetically
export const BASE_NUMBERS: Record<number, { word: string; script: string; phonetic: string }> = {
  1: { word: "ஒன்று", script: "௧", phonetic: "Ondru" },
  2: { word: "இரண்டு", script: "௨", phonetic: "Irandu" },
  3: { word: "மூன்று", script: "௩", phonetic: "Moondru" },
  4: { word: "நான்கு", script: "௪", phonetic: "Naangu" },
  5: { word: "ஐந்து", script: "௫", phonetic: "Aindhu" },
  6: { word: "ஆறு", script: "௬", phonetic: "Aaru" },
  7: { word: "ஏழு", script: "௭", phonetic: "Ezhu" },
  8: { word: "எட்டு", script: "௮", phonetic: "Ettu" },
  9: { word: "ஒன்பது", script: "௯", phonetic: "Onbadhu" },
  10: { word: "பத்து", script: "௰", phonetic: "Pathu" },
  20: { word: "இருபது", script: "௨௰", phonetic: "Irubadhu" },
  30: { word: "முப்பது", script: "௩௰", phonetic: "Muppadhu" },
  40: { word: "நாற்பது", script: "௪௰", phonetic: "Naarpadhu" },
  50: { word: "ஐம்பது", script: "௫௰", phonetic: "Aimbadhu" },
  60: { word: "அறுபது", script: "௬௰", phonetic: "Arubadhu" },
  70: { word: "எழுபது", script: "௭௰", phonetic: "Ezhubadhu" },
  80: { word: "எண்பது", script: "௮௰", phonetic: "Enbadhu" },
  90: { word: "தொண்ணூறு", script: "௯௰", phonetic: "Thonnooru" },
  100: { word: "நூறு", script: "௱", phonetic: "Nooru" },
};

/**
 * Mathematically generates the correct Tamil script and spelling for numbers 1 to 100
 */
export function getTamilNumber(num: number): TamilNumber {
  if (BASE_NUMBERS[num]) {
    return {
      value: num,
      script: BASE_NUMBERS[num].script,
      word: BASE_NUMBERS[num].word,
      phonetic: BASE_NUMBERS[num].phonetic,
    };
  }

  if (num > 10 && num < 20) {
    const single = num - 10;
    const suffix = BASE_NUMBERS[single];
    
    // Combining 10 + units (e.g., 11 Pathinondru)
    const prefixes: Record<number, { word: string; phonetic: string }> = {
      1: { word: "பதினொன்று", phonetic: "Pathinondru" },
      2: { word: "பன்னிரண்டு", phonetic: "Pannirandu" },
      3: { word: "பதின்மூன்று", phonetic: "Pathinmoondru" },
      4: { word: "பதினான்கு", phonetic: "Pathinaangu" },
      5: { word: "பதினைந்து", phonetic: "Pathinaindhu" },
      6: { word: "பதினாறு", phonetic: "Pathinaaru" },
      7: { word: "பதினேழு", phonetic: "Pathinezhu" },
      8: { word: "பதினெட்டு", phonetic: "Pathinettu" },
      9: { word: "பத்தொன்பது", phonetic: "Patthonbadhu" },
    };
    return {
      value: num,
      script: `௰${suffix.script}`,
      word: prefixes[single].word,
      phonetic: prefixes[single].phonetic,
    };
  }

  if (num > 20 && num < 100) {
    const tensValue = Math.floor(num / 10) * 10;
    const unitsValue = num % 10;
    const tensObj = BASE_NUMBERS[tensValue];
    const unitsObj = BASE_NUMBERS[unitsValue];

    // Combine tens prefixes for numbers (e.g. Irubathu -> Irubatthu-ondru)
    const prefixes: Record<number, string> = {
      20: "இருபத்தொன்று", // base is இருபத்து-
      30: "முப்பத்து-",
      40: "நாற்பத்து-",
      50: "ஐம்பத்து-",
      60: "அறுபத்து-",
      70: "எழுபத்து-",
      80: "எண்பத்து-",
      90: "தொண்ணூற்று-",
    };

    let prefixesPhonics: Record<number, string> = {
      20: "Irubatthu-",
      30: "Muppatthu-",
      40: "Naarpatthu-",
      50: "Aimbatthu-",
      60: "Arubatthu-",
      70: "Ezhubatthu-",
      80: "Enbatthu-",
      90: "Thonnootru-",
    };

    // Edge cases for exact spellings
    let combinedWord = "";
    if (tensValue === 20) combinedWord = "இருபத்து" + unitsObj.word;
    else if (tensValue === 30) combinedWord = "முப்பத்து" + unitsObj.word;
    else if (tensValue === 40) combinedWord = "நாற்பத்து" + unitsObj.word;
    else if (tensValue === 50) combinedWord = "ஐம்பத்து" + unitsObj.word;
    else if (tensValue === 60) combinedWord = "அறுபத்து" + unitsObj.word;
    else if (tensValue === 70) combinedWord = "எழுபத்து" + unitsObj.word;
    else if (tensValue === 80) combinedWord = "எண்பத்து" + unitsObj.word;
    else if (tensValue === 90) combinedWord = "தொண்ணூற்று" + unitsObj.word;

    // Specific phonetical joins
    if (combinedWord.endsWith("ஒன்று")) combinedWord = combinedWord.slice(0, -5) + "பொன்று"; // standard colloquial shifts
    // Re-ensure grammatical precision
    const basePrefix = prefixes[tensValue].replace("-", "");
    const basePhonics = prefixesPhonics[tensValue];

    return {
      value: num,
      script: tensObj.script + unitsObj.script,
      word: basePrefix + unitsObj.word,
      phonetic: basePhonics + unitsObj.phonetic.toLowerCase(),
    };
  }

  return {
    value: num,
    script: "௧௪",
    word: "ஒன்று",
    phonetic: "Ondru",
  };
}

// Compile a quick list of 1-100 key practicing flashcard numbers
export const DISPLAY_FLASHCARD_NUMBERS: TamilNumber[] = [
  getTamilNumber(1),
  getTamilNumber(2),
  getTamilNumber(3),
  getTamilNumber(4),
  getTamilNumber(5),
  getTamilNumber(6),
  getTamilNumber(7),
  getTamilNumber(8),
  getTamilNumber(9),
  getTamilNumber(10),
  getTamilNumber(11),
  getTamilNumber(12),
  getTamilNumber(15),
  getTamilNumber(20),
  getTamilNumber(21),
  getTamilNumber(30),
  getTamilNumber(40),
  getTamilNumber(50),
  getTamilNumber(60),
  getTamilNumber(70),
  getTamilNumber(80),
  getTamilNumber(90),
  getTamilNumber(99),
  getTamilNumber(100),
];

// Sentence Maker Sandbox Puzzle Items
export interface WordPuzzleItem {
  tamil: string;
  english: string;
  type: "subject" | "verb" | "object" | "adjective";
}

export const PUZZLE_WORDS: WordPuzzleItem[] = [
  { tamil: "நான்", english: "I", type: "subject" },
  { tamil: "நீ", english: "You", type: "subject" },
  { tamil: "அவள்", english: "She", type: "subject" },
  { tamil: "அவன்", english: "He", type: "subject" },
  
  { tamil: "தமிழ்", english: "Tamil", type: "object" },
  { tamil: "பழம்", english: "Fruit", type: "object" },
  { tamil: "தண்ணீர்", english: "Water", type: "object" },
  { tamil: "புத்தகம்", english: "Book", type: "object" },
  { tamil: "பாடல்", english: "Song", type: "object" },

  { tamil: "படிக்கிறேன்", english: "learn / read (I)", type: "verb" },
  { tamil: "படிக்கிறாய்", english: "learn / read (You)", type: "verb" },
  { tamil: "சாப்பிடுகிறேன்", english: "eat (I)", type: "verb" },
  { tamil: "சாப்பிடுகிறாள்", english: "eats (She)", type: "verb" },
  { tamil: "குடிக்கிறேன்", english: "drink (I)", type: "verb" },
  { tamil: "எழுதுகிறேன்", english: "write (I)", type: "verb" },
  { tamil: "பாடுகிறாள்", english: "sings (She)", type: "verb" },

  { tamil: "நல்ல", english: "good", type: "adjective" },
  { tamil: "அழகான", english: "beautiful", type: "adjective" },
];

export interface CorrectSentence {
  words: string[]; // ['நான்', 'தமிழ்', 'படிக்கிறேன்']
  english: string; // "I learn Tamil"
  phonetics: string; // "Naan Tamizh padikkirean"
  explanation: string; // "In Tamil, the sentence order is Subject-Object-Verb (SOV), unlike English's Subject-Verb-Object (SVO)."
}

export const VALID_SENTENCES: CorrectSentence[] = [
  {
    words: ["நான்", "தமிழ்", "படிக்கிறேன்"],
    english: "I learn/read Tamil",
    phonetics: "Naan Ta-mizh pa-di-kki-rean",
    explanation: "Standard Subject - Object - Verb structure. 'நான்' (I) is the Subject, 'தமிழ்' (Tamil) is the Object, and 'படிக்கிறேன்' (learn) is the Verb.",
  },
  {
    words: ["நான்", "பழம்", "சாப்பிடுகிறேன்"],
    english: "I eat fruit",
    phonetics: "Naan pa-zham saap-pi-du-gi-rean",
    explanation: "Excellent! 'பழம்' means fruit, and 'சாப்பிடுகிறேன்' is the first-person singular action of eating.",
  },
  {
    words: ["நீ", "தமிழ்", "படிக்கிறாய்"],
    english: "You learn Tamil",
    phonetics: "Nee Ta-mizh pa-di-kki-raay",
    explanation: "Correct match! 'நீ' matches the verb ending '-ாய்' in 'படிக்கிறாய்' for direct address.",
  },
  {
    words: ["அவள்", "பாடல்", "பாடுகிறாள்"],
    english: "She sings a song",
    phonetics: "A-val paa-dal paa-du-gi-raal",
    explanation: "Awesome! 'அவள்' (She) targets the female verb ending in 'பாடுகிறாள்' (sings).",
  },
  {
    words: ["நான்", "தண்ணீர்", "குடிக்கிறேன்"],
    english: "I drink water",
    phonetics: "Naan than-neer ku-di-kki-rean",
    explanation: "Spot on! 'தண்ணீர்' means water, and 'குடிக்கிறேன்' is the first person drinking action.",
  },
  {
    words: ["நான்", "புத்தகம்", "எழுதுகிறேன்"],
    english: "I write a book",
    phonetics: "Naan puth-tha-gam e-zhu-thu-gi-rean",
    explanation: "Flawless! 'புத்தகம்' is a physical book, and 'எழுதுகிறேன்' is the action of writing.",
  },
  {
    words: ["நான்", "நல்ல", "தமிழ்", "படிக்கிறேன்"],
    english: "I learn good Tamil",
    phonetics: "Naan nal-la Ta-mizh pa-di-kki-rean",
    explanation: "Incredible! You integrated the adjective 'நல்ல' (good) right before the object 'தமிழ்'!",
  },
];
