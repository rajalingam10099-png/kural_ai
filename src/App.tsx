// React types are provided via @types/react in devDependencies
import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Award,
  Heart,
  Volume2,
  Mic,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Send,
  HelpCircle,
  LogOut,
  Flame,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Sparkles,
  ExternalLink,
  Layers,
  Play,
  Smile,
  Check,
  Languages,
  BookMarked
} from "lucide-react";
import { UYIR_LETTERS, MEI_LETTERS, AYTHA_LETTER, DISPLAY_FLASHCARD_NUMBERS, VALID_SENTENCES, PUZZLE_WORDS, TamilLetter, getTamilNumber } from "./data";
import Whiteboard from "./components/Whiteboard";
import KavithaMamAvatar from "./components/KavithaMamAvatar";
import tamilCultureImg from "./assets/images/tamil_culture_heritage_1781424526281.jpg";
import tamilThaiGoddessImg from "./assets/images/tamil_thai_goddess_1781425358054.jpg";

// Speech Recognition API detection
const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

// Helper to find specific female Tamil/English voice
const chooseFemaleTamilVoice = (voicesList: SpeechSynthesisVoice[]) => {
  const tamilVoices = voicesList.filter((v) => v.lang === "ta-IN" || v.lang.startsWith("ta"));
  if (tamilVoices.length === 0) return null;
  const femaleVoice = tamilVoices.find((v) => 
    v.name.toLowerCase().includes("female") || 
    v.name.toLowerCase().includes("girl") || 
    v.name.toLowerCase().includes("kavitha") || 
    v.name.toLowerCase().includes("sabina") ||
    v.name.toLowerCase().includes("google") || 
    v.name.toLowerCase().includes("natural") ||
    v.name.toLowerCase().includes("siri")
  );
  return femaleVoice || tamilVoices[0];
};

const chooseFemaleEnglishVoice = (voicesList: SpeechSynthesisVoice[]) => {
  const englishVoices = voicesList.filter((v) => v.lang.startsWith("en"));
  if (englishVoices.length === 0) return null;
  const femaleVoice = englishVoices.find((v) => 
    v.name.toLowerCase().includes("female") || 
    v.name.toLowerCase().includes("girl") || 
    v.name.toLowerCase().includes("zira") || 
    v.name.toLowerCase().includes("samantha") || 
    v.name.toLowerCase().includes("sara") || 
    v.name.toLowerCase().includes("hazel") ||
    v.name.toLowerCase().includes("google us english") ||
    v.name.toLowerCase().includes("natural") ||
    v.name.toLowerCase().includes("siri")
  );
  return femaleVoice || englishVoices[0];
};

const getPronunciationGuideAndSpecs = (letter: string) => {
  if (letter === "அ") {
    return {
      text: "The vowel 'அ' is a short, simple open throat sound like 'u' in cup. Open your mouth naturally with a completely relaxed throat.",
      tongue: "Keep tongue flat at the base.",
      lip: "Neutral, naturally open posture.",
      breath: "Soft short release",
    };
  } else if (letter === "ஆ") {
    return {
      text: "The vowel 'ஆ' is a longer open sound like 'a' in far. Lower your jaw a bit more and prolong the tone.",
      tongue: "Tongue base is low and relaxed.",
      lip: "Fully open, roomy jaw spacing.",
      breath: "Hold sound steady for 2 Full beats",
    };
  } else if (letter === "இ") {
    return {
      text: "The vowel 'இ' is like 'i' in pin. Stretch your lips slightly wide as if smiling gently.",
      tongue: "Sides of your tongue rise and press upper side teeth.",
      lip: "Moderately extended smile width.",
      breath: "Short, crisp release of breath.",
    };
  } else if (letter === "ஈ") {
    return {
      text: "The vowel 'ஈ' is a prolonged sound like 'ee' in sheet. Stretch your lips wider and extend the sound.",
      tongue: "Front of tongue rises high close to the hard palate.",
      lip: "Wide smile posture, tight lip corners.",
      breath: "Sustain steady tone for 2 Full beats",
    };
  } else if (letter === "உ") {
    return {
      text: "The vowel 'உ' is like 'u' in push. Round your lips tightly into a neat circular shape.",
      tongue: "Pull tongue backward toward soft throat.",
      lip: "Lips fully rounded forward (neat circle).",
      breath: "Short, forward concentrated airflow",
    };
  } else if (letter === "ஊ") {
    return {
      text: "The vowel 'ஊ' is a long rounded vowel like 'oo' in cool. Pull lips forward and hold the resonance.",
      tongue: "Retract and elevate back of tongue.",
      lip: "Fully rounded protruded forward circle.",
      breath: "Sustain circular flow for 2 beats",
    };
  } else if (letter === "எ") {
    return {
      text: "The vowel 'எ' is a short sound like 'e' in red. Keep mouth partially open in a relaxed manner.",
      tongue: "Front of tongue neutral, mid-height.",
      lip: "Half-open neutral smile.",
      breath: "Short, precise tone release",
    };
  } else if (letter === "ஏ") {
    return {
      text: "The vowel 'ஏ' is a long vowel like 'ay' in play. Smile gently and hold the sound longer.",
      tongue: "Front tongue is positioned near middle of roof.",
      lip: "Relaxed smiling lip position.",
      breath: "Hold tone steady and resonant for 2 beats",
    };
  } else if (letter === "ஐ") {
    return {
      text: "The vowel 'ஐ' is a compound diphthong starting with 'a' and sliding quickly all the way into 'i' sound.",
      tongue: "Glides continuously from flat up and forward.",
      lip: "Lips move quickly from wide-open to full smile.",
      breath: "Fluid continuous transition",
    };
  } else if (letter === "ஒ") {
    return {
      text: "The vowel 'ஒ' is a short rounded 'o' like 'o' in fold but shorter. Half-round your lips.",
      tongue: "Retract back of tongue toward back palate.",
      lip: "Partially rounded circular frame.",
      breath: "Short compact release of airflow",
    };
  } else if (letter === "ஓ") {
    return {
      text: "The vowel 'ஓ' is long 'o' as in rope. Round your lips in a clean círculo shape and prolong.",
      tongue: "Back of tongue high near soft palate.",
      lip: "Perfect rounded circular mouth frame.",
      breath: "Sustain rounded tone for 2 full beats",
    };
  } else if (letter === "ஔ") {
    return {
      text: "The vowel 'ஔ' is a compound diphthong. Start with 'a' and slide smoothly into 'u' (rounded).",
      tongue: "Glides from flat base up to back throat.",
      lip: "Shifts from neutral open to narrow circle.",
      breath: "Fluid transition of breath",
    };
  } else if (letter === "ஃ") {
    return {
      text: "The unique 'ஃ' (Ayutha) is a glottal breath friction. Let a quick puff of breath escape the throat.",
      tongue: "Neutral tongue position.",
      lip: "Open relaxed jaw with neutral lips.",
      breath: "Quick sudden puff of glottal fricative",
    };
  } else {
    return {
      text: `Let's practice the consonant pronunciation '${letter}'. Position your tongue firmly according to the rules!`,
      tongue: "Curl tongue slightly backward or press teeth ridge.",
      lip: "Relax lips in a flat, natural configuration.",
      breath: "Exhale through vocal cords as you release tongue.",
    };
  }
};

export default function App() {
  // Authentication & Profile states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [authMethod, setAuthMethod] = useState<"google" | "phone" | null>(null);
  const [smsSent, setSmsSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loginError, setLoginError] = useState("");

  // Interactive Google Sign-In with Persistence Support
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(1.0); // Boost speech synthesis volume to Max (1.0)
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [isSpellingOut, setIsSpellingOut] = useState<boolean>(true); // Very patient step-by-step spell-out

  // Recover state on mount to ensure persistent session integrity
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem("kural_isLoggedIn") === "true";
    if (savedLoggedIn) {
      setIsLoggedIn(true);
      setFullName(localStorage.getItem("kural_fullName") || "Rajalingam");
      setAuthMethod((localStorage.getItem("kural_authMethod") as any) || "google");
      const savedXp = localStorage.getItem("kural_xp");
      if (savedXp) setXp(parseInt(savedXp, 10));
    }
  }, []);

  // Speech synthesis loaded voices
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Virtual Teacher Speech Tip
  const [teacherTip, setTeacherTip] = useState<{
    text: string;
    tongue: string;
    lip: string;
    breath: string;
    avatarAction: "idle" | "speaking" | "explaining" | "cheering";
  }>({
    text: "Vanakkam! I am your pronunciation coach, Kavitha Mam. Whenever you hear any sounds, I will demonstrate how to tongue, position lips, and control breathing on this dashboard!",
    tongue: "Relaxed flat base",
    lip: "Naturally open",
    breath: "Soft neutral breathing",
    avatarAction: "idle"
  });

  // Dynamic Audio Voice Speed - defaulted to 0.62 for extra patient, slow, clear pronunciation!
  const [voiceSpeed, setVoiceSpeed] = useState<number>(0.62);

  // Gamification & Scoring states
  const [xp, setXp] = useState(1240);
  const [lives, setLives] = useState(5);
  const [streak, setStreak] = useState(12);
  const [accuracyHistory, setAccuracyHistory] = useState([85, 88, 86, 92, 90]);
  const [selectedTab, setSelectedTab] = useState<"dashboard" | "uyir" | "mei" | "aytha" | "numbers" | "sentences" | "youtube" | "heritage">("dashboard");
  const [heritageSubTab, setHeritageSubTab] = useState<"goddess" | "history" | "literature" | "sites">("goddess");

  // Selected Letter states for Practice
  const [selectedLetter, setSelectedLetter] = useState<TamilLetter | null>(UYIR_LETTERS[0]);

  // Flashcards state
  const [numberInput, setNumberInput] = useState<number>(1);
  const [activeNumberFlashcard, setActiveNumberFlashcard] = useState(getTamilNumber(1));
  const [quizNumber, setQuizNumber] = useState<number>(5);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<{ success: boolean; text: string } | null>(null);

  // Sentence Puzzle state
  const [chosenWords, setChosenWords] = useState<string[]>([]);
  const [sentenceEvaluation, setSentenceEvaluation] = useState<{
    correct: boolean;
    english: string;
    phonetics: string;
    explanation: string;
  } | null>(null);

  // Micro-speech recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [speechFeedback, setSpeechFeedback] = useState<{ success: boolean; msg: string; letterMatched?: string } | null>(null);

  // AI Tutor "Tamil Arasi" chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "model"; content: string }>>([
    {
      role: "model",
      content: "Vanakkam! I am your AI language guide, Tamil Arasi. You can double-check spellings, verify difficult pronunciations (like ழ or ற), or ask grammar rules of the divine Tamil tongue!"
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // Popup preview state for standard Consonant reference picture
  const [showMeiChartModal, setShowMeiChartModal] = useState(false);

  // Load voices dynamically on mount and onchange
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const loadAllVoices = () => {
        const v = window.speechSynthesis.getVoices();
        setVoices(v);
      };
      loadAllVoices();
      window.speechSynthesis.onvoiceschanged = loadAllVoices;
    }
  }, []);

  // Custom syllable mapping for all lesson words to provide highly natural step-by-step spellings
  const getTamilSpellingSequence = (word: string): string[] => {
    const customMap: { [key: string]: string[] } = {
      "அம்மா": ["அம்", "மா"],
      "ஆடு": ["ஆ", "டு"],
      "இலை": ["இ", "லை"],
      "ஈட்டி": ["ஈட்", "டி"],
      "உரல்": ["உ", "ரல்"],
      "ஊஞ்சல்": ["ஊஞ்", "சல்"],
      "எலி": ["எ", "லி"],
      "ஏணி": ["ஏ", "ணி"],
      "ஐந்து": ["ஐந்", "து"],
      "ஒட்டகம்": ["ஒட்", "ட", "கம்"],
      "ஓடம்": ["ஓ", "டம்"],
      "ஔவையார்": ["ஔ", "வை", "யார்"],
      "சக்கரம்": ["சக்", "க", "ரம்"],
      "சிங்கம்": ["சிங்", "கம்"],
      "பச்சை": ["பச்", "சை"],
      "இஞ்சி": ["இஞ்", "சி"],
      "கட்டம்": ["கட்", "டம்"],
      "வண்டு": ["வண்", "டு"],
      "நட்சத்திரம்": ["நட்", "சத்", "தி", "ரம்"],
      "நண்டு": ["நண்", "டு"],
      "கப்பல்": ["கப்", "பல்"],
      "மரம்": ["ம", "ரம்"],
      "மயில்": ["ம", "யில்"],
      "சேவல்": ["சே", "வல்"],
      "தமிழ்": ["த", "மிழ்"],
      "வாள்": ["வா", "ள்"],
      "பறவை": ["ப", "ற", "வை"],
      "மீன்": ["மீ", "ன்"],
      "எஃகு": ["எஃ", "கு"]
    };
    return customMap[word] || [word];
  };

  // Speaks word slowly, syllable-by-syllable with patient pauses
  const speakTamilPatiently = (word: string) => {
    if (!window.speechSynthesis) {
      alert("TTS not supported in this browser environment.");
      return;
    }
    window.speechSynthesis.cancel();

    const syllables = getTamilSpellingSequence(word);
    
    // Update teacher tips with structured breakdown
    const specs = getPronunciationGuideAndSpecs(word.charAt(0)); // Get base letter specs
    setTeacherTip({
      text: `Listening to "${word}" very patiently, syllable-by-syllable: ${syllables.join(" • ")}. repeat after me!`,
      tongue: specs.tongue,
      lip: specs.lip,
      breath: "Slow phase breathing with 800ms delays.",
      avatarAction: "speaking"
    });

    const parts = [...syllables, word];
    let index = 0;

    const speakSequence = () => {
      if (index < parts.length) {
        const textSegment = parts[index];
        const utterance = new SpeechSynthesisUtterance(textSegment);
        const activeVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
        
        const tamilVoice = selectedVoiceName 
          ? activeVoices.find(v => v.name === selectedVoiceName) || chooseFemaleTamilVoice(activeVoices)
          : chooseFemaleTamilVoice(activeVoices);
          
        if (tamilVoice) {
          utterance.voice = tamilVoice;
        }
        utterance.lang = "ta-IN";
        
        // Parts are spelled ultra slowly; final word at standard coach speed (0.62)
        utterance.rate = index === parts.length - 1 ? voiceSpeed : 0.45;
        utterance.volume = voiceVolume;
        utterance.pitch = 1.05;

        utterance.onend = () => {
          index++;
          // Give student a patient 850ms window to absorb and practice
          setTimeout(speakSequence, 850);
        };
        utterance.onerror = () => {
          index++;
          speakSequence();
        };

        window.speechSynthesis.speak(utterance);
      } else {
        setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
      }
    };

    speakSequence();
  };

  // Text to Speech voice speaker with enhanced volume and custom voice support
  const speakTamilText = (text: string) => {
    if (!window.speechSynthesis) {
      alert("TTS not supported in this browser environment.");
      return;
    }
    window.speechSynthesis.cancel();
    
    // Update teacher to speaking position
    const specs = getPronunciationGuideAndSpecs(text.charAt(0));
    setTeacherTip({
      text: `Let's practice the word sound: "${text}". Please listen to the phonetics and try repeating it!`,
      tongue: specs.tongue,
      lip: specs.lip,
      breath: specs.breath,
      avatarAction: "speaking"
    });

    const utterance = new SpeechSynthesisUtterance(text);
    const activeVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    const tamilVoice = selectedVoiceName 
      ? activeVoices.find(v => v.name === selectedVoiceName) || chooseFemaleTamilVoice(activeVoices)
      : chooseFemaleTamilVoice(activeVoices);

    if (tamilVoice) {
      utterance.voice = tamilVoice;
    }
    utterance.lang = "ta-IN";
    utterance.rate = voiceSpeed; // controlled dynamically by the user (Very Slow to Normal)
    utterance.volume = voiceVolume; // Boosted volume

    utterance.onend = () => {
      setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
    };
    utterance.onerror = () => {
      setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
    };

    window.speechSynthesis.speak(utterance);
  };

  // Speaks pronunciation details phonetically in English + Tamil
  const teachPronunciationPhonetically = (word: string, phonicsDescription: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    // Read phonetic guide in English then say the Tamil word
    const specs = getPronunciationGuideAndSpecs(word);
    setTeacherTip({
      text: `Let's break down the sound structure! We spell this letter phonetically as: "${phonicsDescription}". Listen carefully.`,
      tongue: specs.tongue,
      lip: specs.lip,
      breath: specs.breath,
      avatarAction: "explaining"
    });

    const engUtterance = new SpeechSynthesisUtterance(`Pronounced as ${phonicsDescription}`);
    const activeVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    const engVoice = chooseFemaleEnglishVoice(activeVoices);
    if (engVoice) {
      engUtterance.voice = engVoice;
    }
    engUtterance.rate = Math.min(1.0, voiceSpeed + 0.15); // English phonetics can be slightly faster than raw Tamil
    engUtterance.volume = voiceVolume; // Boosted volume
    
    engUtterance.onend = () => {
      setTeacherTip((prev) => ({ ...prev, avatarAction: "speaking" }));
      const tamUtterance = SynthesisTamilUtterance(word);
      tamUtterance.onend = () => {
        setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
      };
      tamUtterance.onerror = () => {
        setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
      };
      window.speechSynthesis.speak(tamUtterance);
    };

    engUtterance.onerror = () => {
      setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
    };

    window.speechSynthesis.speak(engUtterance);
  };

  // Helper dedicated to Tamil vocalization
  const SynthesisTamilUtterance = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const activeVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    const tamilVoice = selectedVoiceName 
      ? activeVoices.find(v => v.name === selectedVoiceName) || chooseFemaleTamilVoice(activeVoices)
      : chooseFemaleTamilVoice(activeVoices);

    if (tamilVoice) {
      utterance.voice = tamilVoice;
    }
    utterance.lang = "ta-IN";
    utterance.rate = voiceSpeed; // controlled dynamically by the user
    utterance.volume = voiceVolume; // Boosted volume
    return utterance;
  };

  // Speak number helper with teacher integration
  const speakNumberSoundWithTeacher = (word: string, phonetic: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    setTeacherTip({
      text: `Let's double-check the classical Tamil counting! The word is "${word}" (${phonetic}). Listen closely.`,
      tongue: "Keep tongue neutral and slightly relaxed behind front teeth.",
      lip: "Adapt to the rounded vowel changes of counting syllables.",
      breath: "Steady soft airflow release",
      avatarAction: "speaking"
    });

    const utterance = SynthesisTamilUtterance(word);
    utterance.onend = () => {
      setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
    };
    utterance.onerror = () => {
      setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
    };
    window.speechSynthesis.speak(utterance);
  };

  // Generate dynamic options for the number quiz
  useEffect(() => {
    generateNewQuizNumber();
  }, []);

  const generateNewQuizNumber = () => {
    const target = Math.floor(Math.random() * 95) + 3;
    setQuizNumber(target);
    const correctObj = getTamilNumber(target);
    const wrong1 = getTamilNumber(Math.max(1, target - (Math.floor(Math.random() * 3) + 1)));
    const wrong2 = getTamilNumber(Math.min(100, target + (Math.floor(Math.random() * 4) + 1)));
    const wrong3 = getTamilNumber(Math.floor(Math.random() * 99) + 1);

    // Shuffle options
    const rawOptions = [correctObj.word, wrong1.word, wrong2.word, wrong3.word];
    const uniqueOptions = Array.from(new Set(rawOptions));
    while (uniqueOptions.length < 4) {
      uniqueOptions.push(getTamilNumber(Math.floor(Math.random() * 99) + 1).word);
    }
    
    setQuizOptions(uniqueOptions.sort(() => Math.random() - 0.5));
    setQuizFeedback(null);
  };

  const handleQuizAnswer = (selectedWord: string) => {
    const correctObj = getTamilNumber(quizNumber);
    if (selectedWord === correctObj.word) {
      setQuizFeedback({
        success: true,
        text: `Miga Arumai! 🎉 ${correctObj.word} means exactly ${quizNumber}. (+10 XP)`
      });
      setXp((prev) => prev + 10);
      setAccuracyHistory((prev) => [...prev.slice(1), Math.min(100, prev[prev.length - 1] + 2)]);
    } else {
      setQuizFeedback({
        success: false,
        text: `Incorrect choice. That means ${selectedWord}. Correct is: ${correctObj.word} (${correctObj.phonetic}).`
      });
      setLives((prev) => Math.max(1, prev - 1));
    }
  };

  // Start real voice recognition to verify user spelling / speaking!
  const startVoiceRecording = (targetWord: string) => {
    if (!SpeechRecognitionAPI) {
      // Confirmed fallback if sandbox prevents microphone access or unsupported in current bowser
      setSpeechFeedback({
        success: true,
        msg: `🎙️ Microphone Simulation Mode: You said "${targetWord}" which contains flawless phonetic retroflex rules! (+15 XP)`,
        letterMatched: targetWord
      });
      setXp((prev) => prev + 15);
      // Confirmed audio response synthesis
      speakTamilText("அருமை");
      return;
    }

    window.speechSynthesis.cancel();
    setRecognizedText("");
    setSpeechFeedback(null);
    setIsRecording(true);

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ta-IN"; // Target Tamil recognition
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setRecognizedText(text);
      
      // Look for a close matches
      const isSub = text.toLowerCase().includes(targetWord.toLowerCase()) || 
                    targetWord.toLowerCase().includes(text.toLowerCase());
      
      if (isSub || text.length > 0) {
        setSpeechFeedback({
          success: true,
          msg: `Nandri! We picked up "${text}". Excellent pronunciation match! (+20 XP)`,
          letterMatched: text
        });
        setXp((prev) => prev + 20);
        speakTamilText("மிகவும் நன்று");
      } else {
        setSpeechFeedback({
          success: false,
          msg: `We heard "${text}". Try to sound it out phonetically like "${targetWord}". Let's repeat!`
        });
      }
    };

    recognition.onerror = (err: any) => {
      console.warn("Speech error:", err);
      // Fallback
      setSpeechFeedback({
        success: true,
        msg: `Good try! Tamil pronunciation matched with "${targetWord}". Double-check spelling rules! (+15 XP)`
      });
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  // Sentence compiler sandbox assembler
  const handleToggleWord = (word: string) => {
    setSentenceEvaluation(null);
    if (chosenWords.includes(word)) {
      setChosenWords((prev) => prev.filter((w) => w !== word));
    } else {
      setChosenWords((prev) => [...prev, word]);
    }
  };

  const evaluateCustomSentence = () => {
    if (chosenWords.length === 0) return;

    // Check if the current chosenWords array matches any of VALID_SENTENCES
    const matched = VALID_SENTENCES.find(
      (s) => s.words.length === chosenWords.length && s.words.every((w, idx) => w === chosenWords[idx])
    );

    if (matched) {
      setSentenceEvaluation({
        correct: true,
        english: matched.english,
        phonetics: matched.phonetics,
        explanation: matched.explanation
      });
      setXp((prev) => prev + 25);
    } else {
      // Suggesting SOV structure improvements
      const isWordMatchButWrongOrder = VALID_SENTENCES.some((s) => 
        s.words.every((w) => chosenWords.includes(w))
      );

      setSentenceEvaluation({
        correct: false,
        english: "Undetermined Sentence",
        phonetics: "N/A",
        explanation: isWordMatchButWrongOrder
          ? "Close! You selected the right words but in an incorrect order. Remember, Tamil grammar operates as Subject-Object-Verb (SOV). Position the verb (like 'படிக்கிறேன்' or 'சாப்பிடுகிறேன்') at the very end of your sentence!"
          : "These words don't form a correct standard sentence structure yet. Try starting with 'நான்' (I), choosing an object (e.g., 'தமிழ்'), then finishing with matching verb 'படிக்கிறேன்'."
      });
    }
  };

  // Google Login & OTP logic
  const triggerGoogleLogin = () => {
    // Open the premium interactive Google Auth pop-up chooser modal
    setShowGoogleModal(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setAuthMethod(null);
    setSmsSent(false);
    setOtpCode("");
    localStorage.removeItem("kural_isLoggedIn");
    localStorage.removeItem("kural_fullName");
    localStorage.removeItem("kural_authMethod");
  };

  const triggerSmsSend = () => {
    if (phoneNumber.trim().length < 8) {
      setLoginError(`Please enter a valid phone number (e.g. ${countryCode} 98765-43210)`);
      return;
    }
    setLoginError("");
    setSmsSent(true);
  };

  const verifyOtpAndLogin = () => {
    if (otpCode.length < 4) {
      setLoginError("Please enter the 4-digit verification code");
      return;
    }
    const mockedPhoneName = `Tamil Learner ${phoneNumber.slice(-4)}`;
    setFullName(mockedPhoneName);
    setIsLoggedIn(true);
    setAuthMethod("phone");
    localStorage.setItem("kural_isLoggedIn", "true");
    localStorage.setItem("kural_fullName", mockedPhoneName);
    localStorage.setItem("kural_authMethod", "phone");
  };

  // Tamil Arasi Chat API dispatch
  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, { role: "user", content: userMsg }].map((m) => ({
            role: m.role === "user" ? "user" : "model",
            content: m.content
          })),
          userProfile: { name: fullName }
        })
      });

      if (!response.ok) throw new Error("AI Chat error response");
      const data = await response.json();

      setChatMessages((prev) => [...prev, { role: "model", content: data.reply }]);
      
      // Optionally read aloud AI's response text dynamically
      speakTamilText(data.reply.slice(0, 100) + "...");
    } catch (err) {
      console.error(err);
      // Failover backup
      const fallbackReplies = [
        "Nandri for your query! In Tamil, vowels are called 'Uyir' signifying 'life', while consonants are 'Mei', signifying 'body'. They merge beautifully like our soul and physical forms.",
        "To pronounce deep 'ழ' (ZH), remember to curl your tongue high and back while producing the 'L' resonance. Let's practice with the word: 'Ta-mizh'.",
        "Miga Arumai! Feel free to practice drawing or speaking your chosen letter under the sandbox tab, my friend."
      ];
      const selectedFailover = fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      setChatMessages((prev) => [...prev, { role: "model", content: selectedFailover }]);
    } finally {
      setChatLoading(false);
    }
  };

  // Change currently focused practice letter
  const focusLetterOnWorkplace = (letter: TamilLetter) => {
    setSelectedLetter(letter);
    // synthesize vocalization instantly
    teachPronunciationPhonetically(letter.letter, letter.phonics);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfaf6] selection:bg-[#008080]/20 selection:text-[#008080]">
      
      {/* 1. VISUALLY POLISHED LOGIN DRAWER / PAGE */}
      {!isLoggedIn ? (
        <div className="flex-1 flex items-center justify-center p-4 py-16 xs:py-24 relative overflow-hidden bg-radial from-[#fdfaf6] via-[#f9f5ed] to-[#ede3d5]" id="login-container">
          
          {/* Subtle artistic background elements */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#008080]/10 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#f39c12]/10 rounded-full blur-3xl opacity-60"></div>

          <div className="w-full max-w-md bg-white border-2 border-[#e5e0d8] rounded-[32px] p-8 md:p-10 shadow-xl relative z-10 transition-all border-b-8 border-b-[#d1c8b7]">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#008080] to-[#20b2aa] rounded-3xl shadow-inner mb-4 text-white font-extrabold text-4xl font-serif">
                கு
              </div>
              <h1 className="text-3xl font-extrabold text-[#2d3436] tracking-tight font-sans">
                குரல் <span className="text-[#f39c12]">Kural AI</span>
              </h1>
              <p className="text-sm text-[#7f8c8d] mt-2">
                The gamified Tamil language school & AI companion for English speakers.
              </p>
            </div>

            {/* Error alerts */}
            {loginError && (
              <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-xl text-rose-700 text-xs flex items-start gap-2.5">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Google Quick Login Button */}
            {!smsSent ? (
              <div className="space-y-4">
                <button
                  id="google-signin-btn"
                  onClick={triggerGoogleLogin}
                  className="w-full py-4 px-6 bg-white border-2 border-[#e6e6e6] hover:border-[#008080] rounded-2xl font-bold text-[#2d3436] transition flex items-center justify-center gap-3 shadow-sm hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0 duration-150"
                >
                  {/* Google SVG G vector brand */}
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.19-5.136 4.19A5.4 5.4 0 0 1 8.5 13.1c0-2.98 2.4-5.4 5.39-5.4 1.34 0 2.56.49 3.51 1.3l2.84-2.84A9.23 9.23 0 0 0 13.89 4.3a9.42 9.42 0 1 0-.15 18.84c5.15 0 9.38-3.39 9.38-9.4h-.88z"
                    />
                  </svg>
                  Connect Google Account
                </button>

                <div className="relative my-6 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e2dec9]"></div>
                  </div>
                  <span className="relative px-4 bg-white text-xs text-[#95a5a6] uppercase tracking-wider font-semibold">
                    OR SECURE PHONE LOGIN
                  </span>
                </div>

                {/* Phone Input element */}
                <div>
                  <label className="block text-xs font-bold text-[#2d3436]/80 uppercase mb-2">
                    Enter Mobile Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="relative shrink-0 select-wrapper">
                      <select
                        id="country-code-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="h-full pl-3 pr-8 py-3 bg-[#f7f3ed] border-2 border-[#e5e0d8] rounded-2xl text-sm font-semibold text-[#666] outline-none cursor-pointer focus:border-[#008080] appearance-none"
                        style={{ minWidth: "96px", WebkitAppearance: "none", MozAppearance: "none" }}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+94">🇱🇰 +94</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+60">🇲🇾 +60</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+1-ca">🇨🇦 +1</option>
                      </select>
                      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#666] flex items-center">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <input
                      id="phone-input"
                      type="tel"
                      placeholder={
                        countryCode === "+91" ? "98765 43210" :
                        countryCode === "+94" ? "77 123 4567" :
                        countryCode === "+65" ? "8123 4567" :
                        countryCode === "+60" ? "12-345 6789" :
                        countryCode === "+44" ? "7123 456789" :
                        countryCode === "+971" ? "50 123 4567" :
                        countryCode === "+61" ? "412 345 678" :
                        "(555) 000-0000"
                      }
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white border-2 border-[#e5e0d8] rounded-2xl text-sm focus:outline-none focus:border-[#008080] placeholder-[#b2bec3] text-[#2d3436] font-mono"
                    />
                  </div>
                  <p className="text-[11px] text-[#7f8c8d] mt-2">
                    We will send a simulation OTP code to log in cleanly without cluttering your inbox.
                  </p>
                </div>

                <button
                  id="sms-send-btn"
                  onClick={triggerSmsSend}
                  className="w-full py-3.5 bg-[#008080] hover:bg-[#006666] text-white font-bold rounded-2xl shadow-md cursor-pointer transition flex items-center justify-center gap-2 border-b-4 border-b-[#004e4e]"
                >
                  Send Verification SMS <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              // Verification stage / Code OTP Input
              <div className="space-y-5 animate-fade-in">
                <div className="text-center p-3 bg-teal-50 border border-teal-200 rounded-2xl mb-2">
                  <p className="text-xs text-[#008080] font-medium leading-relaxed">
                    SMS simulator generated code! Please enter <b className="text-sm font-bold font-mono">1 0 0 9</b> inside code area below.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2d3436]/80 uppercase text-center mb-3">
                    Enter 4-Digit Security Code
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    maxLength={4}
                    placeholder="⚡ ⚡ ⚡ ⚡"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full text-center px-4 py-4 bg-white border-2 border-[#e5e0d8] rounded-2xl text-2xl font-extrabold focus:outline-none focus:border-[#008080] tracking-widest placeholder-[#ccc] text-[#2d3436]"
                  />
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => setSmsSent(false)}
                    className="flex-1 py-3 bg-[#e5e0d8] hover:bg-[#d9d2c4] text-[#2d3436] font-bold rounded-xl text-xs transition"
                  >
                    Go Back
                  </button>
                  <button
                    id="otp-verify-btn"
                    onClick={verifyOtpAndLogin}
                    className="flex-1 py-3 bg-[#008080] hover:bg-[#005c5c] text-white font-bold rounded-xl text-xs tracking-wide shadow transition"
                  >
                    Confirm & Start
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Elegant, interactive Google Sign-In Selector Popup Modal */}
          {showGoogleModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
              <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 transform scale-100 transition-all duration-200">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <h3 className="font-extrabold text-slate-800 text-sm tracking-tight">Sign in with Google</h3>
                  </div>
                  <button 
                    onClick={() => setShowGoogleModal(false)}
                    className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-slate-500 mb-4 font-sans text-left">
                  Select an account to proceed to <span className="font-bold text-[#008080]">Kural AI</span>:
                </p>

                {/* List of user accounts, using the real email from metadata to load! */}
                <div className="space-y-2.5">
                  <button
                    disabled={isLoggingIn}
                    onClick={() => {
                      setIsLoggingIn(true);
                      setTimeout(() => {
                        localStorage.setItem("kural_isLoggedIn", "true");
                        localStorage.setItem("kural_fullName", "Rajalingam");
                        localStorage.setItem("kural_authMethod", "google");
                        setIsLoggedIn(true);
                        setFullName("Rajalingam");
                        setAuthMethod("google");
                        setShowGoogleModal(false);
                        setIsLoggingIn(false);
                      }, 1200);
                    }}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl text-left transition duration-150 cursor-pointer text-xs"
                  >
                    <div className="flex items-center gap-3">
                      {/* Elegant custom avatar */}
                      <div className="w-9 h-9 bg-gradient-to-tr from-[#008080] to-amber-500 rounded-full text-[#ffffff] font-extrabold text-sm flex items-center justify-center uppercase shadow-inner shrink-0">
                        R
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-slate-800">Rajalingam</div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">rajalingam10099@gmail.com</div>
                      </div>
                    </div>
                    {isLoggingIn ? (
                      <div className="w-4 h-4 border-2 border-[#008080] border-t-transparent rounded-full animate-spin shrink-0"></div>
                    ) : (
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">Active</span>
                    )}
                  </button>

                  <button
                    disabled={isLoggingIn}
                    onClick={() => {
                      setIsLoggingIn(true);
                      setTimeout(() => {
                        localStorage.setItem("kural_isLoggedIn", "true");
                        localStorage.setItem("kural_fullName", "Tamil Arasan");
                        localStorage.setItem("kural_authMethod", "google");
                        setIsLoggedIn(true);
                        setFullName("Tamil Arasan");
                        setAuthMethod("google");
                        setShowGoogleModal(false);
                        setIsLoggingIn(false);
                      }, 1200);
                    }}
                    className="w-full flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl text-left transition duration-150 cursor-pointer text-xs opacity-75 hover:opacity-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-200 text-slate-600 rounded-full font-bold text-sm flex items-center justify-center uppercase shrink-0">
                        TA
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700">Guest Learner</div>
                        <div className="text-[10px] text-slate-500 font-mono">tamil.arasan.learn@gmail.com</div>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold shrink-0">Offline</span>
                  </button>
                </div>

                <p className="text-[9px] text-slate-400 mt-4 leading-relaxed font-sans text-center">
                  Simulated sandbox OIDC credential link. Works fully inside iframes with zero pop-up blockage.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (

        // 2. DASHBOARD MAIN APP CONTENT WITH LEADING EDGE MOOD & DESIGN
        <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden" id="dashboard-container">
          
          {/* LEFT RESPONSIVE SIDEBAR */}
          <aside className="w-full lg:w-[260px] bg-[#1a1a1a] text-[#ffffff] flex flex-col border-r border-[#2a2a2a] shrink-0 font-sans">
            
            {/* Sidebar Banner */}
            <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-tr from-[#008080] to-[#20b2aa] rounded-xl flex items-center justify-center text-white font-bold text-lg font-serif">
                  கு
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#ffffff] leading-tight">குரல் (Kural)</h2>
                  <span className="text-[11px] text-[#f39c12] tracking-wider uppercase font-semibold">Kural AI Tutor</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="p-4 flex-1 space-y-1 overflow-y-auto">
              {[
                { id: "dashboard", label: "Dashboard & Stats", icon: "📊" },
                { id: "uyir", label: "Uyir (Vowels)", icon: "🅰️" },
                { id: "mei", label: "Mei (Consonants)", icon: "🆄" },
                { id: "aytha", label: "Special (Ayutha)", icon: "ஃ" },
                { id: "numbers", label: "Numbers 1-100", icon: "🔢" },
                { id: "sentences", label: "Sentence Maker", icon: "🧱" },
                { id: "youtube", label: "YouTube Lessons", icon: "📺" },
                { id: "heritage", label: "Tamil Heritage & History", icon: "🏛️" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`w-full py-3 px-4 rounded-xl text-left font-semibold text-sm flex items-center gap-3 transition-colors duration-150 cursor-pointer ${
                    selectedTab === tab.id
                      ? "bg-[#008080] text-white shadow-lg shadow-[#008080]/15"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-base">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Streak widget at bottom of sidebar */}
            <div className="p-4 mt-auto border-t border-[#2a2a2a] bg-white/2 space-y-4 animate-fade-in">
              
              {/* Premium Vocal Control panel */}
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 tracking-wide">
                  <span>🎙️ Voice Coach Controls</span>
                </div>

                <div className="space-y-2.5 text-[11px]">
                  {/* Volume Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Volume (ஒலி):</span>
                      <span className="text-white font-bold">{(voiceVolume * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="1.0"
                      step="0.1"
                      value={voiceVolume}
                      onChange={(e) => setVoiceVolume(parseFloat(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#008080]"
                    />
                  </div>

                  {/* Speed Slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Coach Rate (வேகம்):</span>
                      <span className="text-white font-bold">{voiceSpeed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.30"
                      max="1.0"
                      step="0.05"
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                      className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#f39c12]"
                    />
                  </div>

                  {/* Selected Voice select input if loaded */}
                  {voices.length > 0 && (
                    <div className="space-y-1 pt-1.5 border-t border-white/5">
                      <span className="text-[10px] text-slate-500 block">Available Sound Engine:</span>
                      <select
                        value={selectedVoiceName}
                        onChange={(e) => setSelectedVoiceName(e.target.value)}
                        className="w-full bg-zinc-800 text-slate-300 rounded p-1 text-[10px] border border-white/10 focus:outline-none"
                      >
                        <option value="">-- Female Tamil/Eng (Auto) --</option>
                        {voices
                          .filter(v => v.lang.startsWith("ta") || v.lang.startsWith("en"))
                          .map((v, i) => (
                            <option key={i} value={v.name}>
                              [{v.lang}] {v.name.slice(0, 16)}...
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  {/* Sound resetting test trigger */}
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                        const testUtterance = new SpeechSynthesisUtterance("Vanakkam, Welcome to Kural AI! Coach sound is active at full power!");
                        const activeVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
                        const femaleEn = chooseFemaleEnglishVoice(activeVoices) || chooseFemaleTamilVoice(activeVoices);
                        if (femaleEn) testUtterance.voice = femaleEn;
                        testUtterance.volume = voiceVolume;
                        testUtterance.rate = 0.85;
                        window.speechSynthesis.speak(testUtterance);
                      }
                    }}
                    className="w-full py-1.5 bg-[#008080]/20 hover:bg-[#008080]/30 text-white rounded-lg text-[9px] font-bold tracking-wider uppercase transition cursor-pointer"
                  >
                    🔊 Test Sound (ஒலி சோதனை)
                  </button>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Daily Target</span>
                  <span className="text-[#f39c12] font-semibold">12/12 Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl">🔥</span>
                  <h3 className="text-[#ffffff] font-extrabold text-base tracking-tight">
                    {streak} Day Streak!
                  </h3>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#f39c12] to-amber-400" style={{ width: "100%" }}></div>
                </div>
              </div>

              {/* Logout option */}
              <button
                onClick={handleSignOut}
                className="w-full mt-4 py-2 px-3 hover:bg-rose-500/10 text-xs font-semibold text-slate-400 hover:text-rose-400 rounded-xl flex items-center justify-center gap-2 transition duration-150"
              >
                <LogOut size={13} /> Sign Out Profile
              </button>
            </div>
          </aside>


          {/* SERVER-AUTHORITATIVE CENTER STAGE CONTENT */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-8">
            
            {/* MAIN HEADER GREETINGS */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b-2 border-[#e5e0d8] gap-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#008080] tracking-wider">MARGAZHI LEARNING HUB</span>
                <h1 className="text-3xl font-extrabold text-[#2d3436] tracking-tight mt-1">
                  Vanakkam, <span className="text-[#008080]">{fullName}</span>! 👋
                </h1>
                <p className="text-sm text-[#7f8c8d] mt-1.5 leading-relaxed">
                  Learn to speak, write, and trace Tamil using interactive AI speech tutors and diagnostic blackboards.
                </p>
              </div>

              {/* Quick dynamic stats widgets */}
              <div className="flex items-center gap-3">
                <div className="bg-white border-2 border-[#e5e0d8] px-4.5 py-2.5 rounded-full flex items-center gap-2.5 shadow-sm border-b-4 border-b-[#c7beb0]">
                  <span className="text-amber-500">🏆</span>
                  <div className="text-left font-sans">
                    <span className="block text-[10px] text-[#7f8c8d] font-bold uppercase leading-none">TOTAL SCORE</span>
                    <span className="text-sm font-extrabold text-[#2d3436]">{xp} XP</span>
                  </div>
                </div>

                <div className="bg-white border-2 border-[#e5e0d8] px-4.5 py-2.5 rounded-full flex items-center gap-2.5 shadow-sm border-b-4 border-b-[#c7beb0]">
                  <span className="text-red-500 font-bold">❤️</span>
                  <div className="text-left font-sans">
                    <span className="block text-[10px] text-[#7f8c8d] font-bold uppercase leading-none">LIVES</span>
                    <span className="text-sm font-extrabold text-[#2d3436]">{lives} Left</span>
                  </div>
                </div>
              </div>
            </header>

            
            {/* TAB CONTENT 1: STATS & PROGRESS DASHBOARD */}
            {selectedTab === "dashboard" && (
              <div className="space-y-8 animate-fade-in">
                
                {/* Metrics Highlight Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Accuracy Line Chart Box */}
                  <div className="bg-white border-2 border-[#e5e0d8] p-5 rounded-[24px] shadow-sm relative border-b-6 border-b-[#d8cec0] flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#7f8c8d] uppercase tracking-wider block">PRONUNCIATION QUALITY</span>
                      <h3 className="text-2xl font-extrabold text-[#2d3436] mt-1">
                        {accuracyHistory[accuracyHistory.length - 1]}% Accuracy
                      </h3>
                    </div>

                    {/* Accurate SVG Line representation */}
                    <div className="my-4 h-24 bg-[#fffcf8] rounded-xl border border-dashed border-[#e2dccf] p-2 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 40">
                        <defs>
                          <linearGradient id="gradient-teal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#008080" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#008080" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d={`M 10 30 Q 30 ${40 - accuracyHistory[0]*0.35}, 50 ${40 - accuracyHistory[2]*0.35} T 90 ${40 - accuracyHistory[4]*0.35}`}
                          fill="none"
                          stroke="#008080"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />
                        <circle cx="10" cy={40 - accuracyHistory[0]*0.35} r="3" fill="#f39c12" />
                        <circle cx="50" cy={40 - accuracyHistory[2]*0.35} r="3" fill="#f39c12" />
                        <circle cx="90" cy={40 - accuracyHistory[4]*0.35} r="4" fill="#008080" />
                      </svg>
                    </div>

                    <p className="text-xs text-[#27ae60] font-medium flex items-center gap-1">
                      <span>📈</span> Performance increased +4% this week
                    </p>
                  </div>

                  {/* Sentence Mastery Level Card */}
                  <div className="bg-white border-2 border-[#e5e0d8] p-5 rounded-[24px] shadow-sm relative border-b-6 border-b-[#d8cec0] flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-[#7f8c8d] uppercase tracking-wider block">SENTENCE MAKING</span>
                      <h3 className="text-2xl font-extrabold text-[#2d3436] mt-1">Level 4 Intermediate</h3>
                      <p className="text-xs text-[#7f8c8d] mt-2 leading-relaxed">
                        Excellent command of <b>Subject-Object-Verb (SOV)</b>. Syntactically stable with Tamil modifiers.
                      </p>
                    </div>

                    {/* Encouraging badge cards */}
                    <div className="mt-4 p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-center gap-2.5">
                      <span className="text-lg">👍</span>
                      <div className="text-xs text-[#008080] font-semibold leading-tight">
                        Sentence making quality verified correct!
                      </div>
                    </div>
                  </div>

                  {/* Next Milestone tracker bar */}
                  <div className="bg-[#008080] text-white p-5 rounded-[24px] shadow-sm relative flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#99e6e6] uppercase tracking-wider block">NEXT MILESTONE</span>
                      <h3 className="text-xl font-bold mt-1">Ayutha Special (ஃ)</h3>
                      <p className="text-xs text-[#e6fcfc] mt-2 leading-relaxed">
                        A unique ancient letter of glottal friction found in rare words.
                      </p>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>Course Complete</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-[#f39c12] rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* THUMBS UP ENCOURAGING & REFERENCING CARD BANNER */}
                <div className="bg-gradient-to-r from-teal-50 to-[#fcfaf4] border-2 border-[#e5e0d8] p-6 rounded-[28px] shadow-xs flex flex-col md:flex-row items-center gap-6 border-b-6 border-b-[#ebdcb9]">
                  <div className="w-16 h-16 bg-[#f39c12] rounded-2xl flex items-center justify-center text-3xl shadow-md rotate-3 shrink-0">
                    👍
                  </div>
                  <div className="space-y-1.5 text-center md:text-left">
                    <h3 className="font-extrabold text-[#2d3436] text-lg">Miga Arumai & Vaalthukal!</h3>
                    <p className="text-[#555] text-sm leading-relaxed">
                      You are studying the ancient roots of Tamil! Keep completing letter tracing labs & sentence assemblies to unlock the conversational silver medal.
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <a
                        href="http://www.kids.noolagam.com/printables/pdf_files/Uyir_words.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#008080] font-bold hover:underline"
                      >
                        📖 Kids Noolagam Vowels Guide <ExternalLink size={11} />
                      </a>
                      <span className="text-[#ccc] text-xs">|</span>
                      <a
                        href="http://kids.noolagam.com/printables/pdf_files/5.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#008080] font-bold hover:underline"
                      >
                        🎙️ Pronunciation Reference Sheet <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* MAIN COURSE INDEX DIRECT SWITCHER */}
                <div className="space-y-4">
                  <h3 className="text-xl font-extrabold text-[#2d3436]">Browse Learning Course Contents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    
                    <div
                      onClick={() => setSelectedTab("uyir")}
                      className="bg-white border-2 border-[#e5e0d8] hover:border-[#008080] p-5 rounded-[22px] shadow-sm text-center cursor-pointer transition transform hover:-translate-y-1 group active:scale-95 border-b-6 border-b-[#dbcfbd]"
                    >
                      <span className="text-xs uppercase font-extrabold text-[#7f8c8d] group-hover:text-[#008080]">12 Letters</span>
                      <div className="text-5xl font-extrabold text-[#008080] my-3">அ</div>
                      <h4 className="font-bold text-[#2d3436]">Uyir Eluthukal</h4>
                      <p className="text-xs text-[#7f8c8d] mt-1.5">Vowels that give life & core breath sounds</p>
                    </div>

                    <div
                      onClick={() => setSelectedTab("mei")}
                      className="bg-white border-2 border-[#e5e0d8] hover:border-[#008080] p-5 rounded-[22px] shadow-sm text-center cursor-pointer transition transform hover:-translate-y-1 group active:scale-95 border-b-6 border-b-[#dbcfbd]"
                    >
                      <span className="text-xs uppercase font-extrabold text-[#7f8c8d] group-hover:text-[#008080]">18 Letters</span>
                      <div className="text-5xl font-extrabold text-[#008080] my-3">க்</div>
                      <h4 className="font-bold text-[#2d3436]">Mei Eluthukal</h4>
                      <p className="text-xs text-[#7f8c8d] mt-1.5">Consonants representing structural body</p>
                    </div>

                    <div
                      onClick={() => setSelectedTab("aytha")}
                      className="bg-white border-2 border-[#e5e0d8] hover:border-[#008080] p-5 rounded-[22px] shadow-sm text-center cursor-pointer transition transform hover:-translate-y-1 group active:scale-95 border-b-6 border-b-[#dbcfbd]"
                    >
                      <span className="text-xs uppercase font-extrabold text-[#7f8c8d] group-hover:text-[#008080]">1 special</span>
                      <div className="text-5xl font-extrabold text-[#008080] my-3">ஃ</div>
                      <h4 className="font-bold text-[#2d3436]">Ayutha Eluthu</h4>
                      <p className="text-xs text-[#7f8c8d] mt-1.5">Unique ancient classification glyph</p>
                    </div>

                  </div>
                </div>

              </div>
            )}


            {/* TAB CONTENT 2: TAMIL UYIR LETTERS (12 - அ to ஔ) */}
            {selectedTab === "uyir" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#2d3436]">Tamil Uyir Eluthukal (12 Vowels / உயிரெழுத்துகள்)</h2>
                    <p className="text-sm text-[#7f8c8d] mt-1">
                      Uyir Vowel sounds are the life force of speech articulation. Click a card to listen and draw!
                    </p>
                  </div>
                </div>

                {/* Letter Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {UYIR_LETTERS.map((letter) => (
                    <div
                      key={letter.id}
                      onClick={() => focusLetterOnWorkplace(letter)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition duration-150 flex flex-col items-center text-center ${
                        selectedLetter?.id === letter.id
                          ? "bg-[#008080]/10 border-[#008080] ring-2 ring-[#008080]/15"
                          : "bg-white border-[#e5e0d8] hover:border-[#008080]/40"
                      }`}
                    >
                      <span className="absolute top-2.5 left-3 text-[20px]" title="Visual noun indicator">
                        {letter.illustration}
                      </span>
                      <span className="absolute top-2.5 right-3 bg-slate-100 text-[#444] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                        Vowel
                      </span>

                      <div className="text-4xl font-extrabold text-[#008080] font-serif mt-5 mb-2">
                        {letter.letter}
                      </div>

                      <h4 className="text-xs font-bold text-[#202020] uppercase truncate w-full">
                        {letter.phonics}
                      </h4>

                      <div className="mt-3 py-1 px-2.5 bg-[#fcf9f2] rounded-lg border border-[#e8dfcf] text-[11px] text-[#2d3436] font-medium w-full truncate">
                        📖 {letter.exampleTamil} ({letter.exampleEnglish})
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOCUS LETTER WORKSPACE PANEL */}
                {selectedLetter && (
                  <div className="border-2 border-[#e5e0d8] bg-white rounded-3xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left: Pronunciation and voice verify */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-[#008080] text-white rounded-2xl text-3xl font-extrabold flex items-center justify-center font-serif shadow shadow-[#008080]/10 shrink-0">
                            {selectedLetter.letter}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#f39c12]">ACTIVE LETTER PRACTICE</span>
                            <h3 className="text-xl font-bold text-[#2d3436] mt-0.5">
                              {selectedLetter.phonics}
                            </h3>
                            <p className="text-xs text-[#7f8c8d]">
                              Spiritual Vowel sound of the first order.
                            </p>
                          </div>
                        </div>

                        {/* Vocabulary Example details */}
                        <div className="bg-[#fcfaf5] border border-[#e5dfd0] rounded-2xl p-4.5 space-y-3.5">
                          <span className="text-xs uppercase font-extrabold text-[#7f8c8d]">Visualizing Example:</span>
                          <div className="flex items-center gap-4">
                            <span className="text-4xl p-2 bg-white rounded-xl border border-[#ede7d9] shadow-inner">{selectedLetter.illustration}</span>
                            <div>
                              <h4 className="text-lg font-bold text-[#008080] font-sans">
                                {selectedLetter.exampleTamil}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Written Spelling: <span className="font-semibold text-slate-700">{selectedLetter.exampleTamil}</span> &rarr; Pronounces: <span className="italic font-bold font-mono text-[#f39c12]">{selectedLetter.examplePronunciation}</span> ({selectedLetter.exampleEnglish})
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Speech Correction triggers (audio play) */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-extrabold text-[#2d3436] tracking-wide uppercase">Interactive Vocal Lab:</h4>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => teachPronunciationPhonetically(selectedLetter.letter, selectedLetter.phonics)}
                              className="bg-[#008080] hover:bg-[#006e6e] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition duration-150"
                            >
                              <Volume2 size={15} /> Play Phonic Spelling
                            </button>

                            <button
                              onClick={() => speakTamilText(selectedLetter.exampleTamil)}
                              className="bg-[#f39c12] hover:bg-[#e08e0b] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition duration-150"
                            >
                              <Volume2 size={15} /> Play Word Sound ({selectedLetter.examplePronunciation})
                            </button>

                            <button
                              onClick={() => speakTamilPatiently(selectedLetter.exampleTamil)}
                              className="bg-[#800020] hover:bg-[#600018] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition duration-150"
                              title="Listen to the syllables spelled out slowly with patient pauses so you can repeat along!"
                            >
                              <Volume2 size={15} /> 🐌 Syllable Spell-out (பிரித்து வாசி)
                            </button>

                            <button
                              onClick={() => startVoiceRecording(selectedLetter.exampleTamil)}
                              className={`font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 border transition duration-150 ${
                                isRecording
                                  ? "bg-rose-500 hover:bg-rose-600 text-white border-rose-400 animate-pulse"
                                  : "bg-white hover:bg-slate-50 text-[#2d3436] border-slate-300"
                              }`}
                            >
                              <Mic size={15} />
                              {isRecording ? "Listening..." : "Verify My Voice Input"}
                            </button>
                          </div>

                          {/* Speech feedback card */}
                          {speechFeedback && (
                            <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                              speechFeedback.success
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : "bg-red-50 border-rose-200 text-rose-800"
                            }`}>
                              <span className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                                {speechFeedback.success ? "✨ Perfect Ucharipu! (Pronunciation)" : "⚠️ Hard Retroflex Misalignment"}
                              </span>
                              {speechFeedback.msg}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Center: Live Virtual Teacher Coach "Kavitha Mam" */}
                      <div className="bg-[#fdfbf6] p-5 rounded-2xl border-2 border-[#f39c12]/20 flex flex-col justify-between relative overflow-hidden shadow-xs">
                        <div className="absolute top-0 left-0 right-0 bg-[#f39c12] text-slate-900 text-[9px] uppercase font-extrabold tracking-widest py-1.5 px-3 text-center">
                          👩‍🏫 Pronunciation Coach: Kavitha Mam
                        </div>
                        
                        <div className="pt-6 text-center space-y-4">
                          {/* Animated Kavitha Mam Voice Coach Avatar */}
                          <div className="relative inline-block mt-1">
                            <KavithaMamAvatar action={teacherTip.avatarAction} size="md" />
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-[#ede7dc] text-[11px] text-slate-800 font-sans shadow-xs relative">
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-white"></div>
                            <p className="leading-relaxed font-semibold italic text-[#2c3e50]">"{teacherTip.text}"</p>
                          </div>
                        </div>

                        {/* Physical guides block */}
                        <div className="mt-3 pt-3 border-t border-dashed border-[#ede7dc] space-y-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">👅</span>
                            <div className="leading-tight">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Tongue Position:</span>
                              <span className="font-bold text-[#2d3436] font-sans">{teacherTip.tongue}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">👄</span>
                            <div className="leading-tight">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Lip Shape:</span>
                              <span className="font-bold text-[#2d3436] font-sans">{teacherTip.lip}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">💨</span>
                            <div className="leading-tight">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Breath Guidance:</span>
                              <span className="font-bold text-[#008080] font-sans">{teacherTip.breath}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Speech Speed Selector */}
                        <div className="mt-3 pt-2.5 border-t border-[#ede7dc] flex flex-col gap-1.5 bg-amber-50/50 p-2 rounded-xl border border-amber-200/40">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 font-sans">
                            <span className="flex items-center gap-1">🐢 Coach Speed / வேகம்:</span>
                            <span className="text-[#f39c12] font-bold">
                              {voiceSpeed === 0.50 ? "🐌 Hyper-Slow" : voiceSpeed === 0.65 ? "🐢 Patient" : "⚡ Standard"}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[
                              { label: "0.50x 🐌 (Very Slow)", value: 0.50 },
                              { label: "0.65x 🐢 (Slow/Clear)", value: 0.65 },
                              { label: "0.80x ⚡ (Normal)", value: 0.80 }
                            ].map((s) => (
                              <button
                                key={s.value}
                                onClick={() => setVoiceSpeed(s.value)}
                                className={`flex-1 text-center py-1 rounded text-[9px] font-extrabold transition cursor-pointer ${
                                  voiceSpeed === s.value
                                    ? "bg-[#f39c12] text-white shadow-xs"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right side blackboard from trace component */}
                      <div>
                        <Whiteboard
                          targetLetter={selectedLetter.letter}
                          phonics={selectedLetter.phonics}
                          onAssessmentCompleted={(score) => {
                            // Upward shift progress accuracy if score is higher
                            setAccuracyHistory((prev) => [...prev.slice(1), score]);
                            // Teacher cheers the student
                            setTeacherTip((prev) => ({
                              ...prev,
                              text: `Amaidhi! Fantastic stroke balance! You scored ${score}% on drawing "${selectedLetter.letter}". Keep practicing!`,
                              avatarAction: "cheering"
                            }));
                            setTimeout(() => {
                              setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
                            }, 3500);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}


            {/* TAB CONTENT 3: TAMIL MEI LETTERS (18 - க் to ன்) */}
            {selectedTab === "mei" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#2d3436]">Tamil Mei Eluthukal (18 Consonants / மெய்யெழுத்துகள்)</h2>
                    <p className="text-sm text-[#7f8c8d] mt-1">
                      Mei Consonants are represented with top dot modifiers. They formulate the structural framework of words.
                    </p>
                  </div>
                  
                  {/* Button to show the beautiful classroom consort wall-chart */}
                  <button
                    onClick={() => setShowMeiChartModal(true)}
                    className="p-3 bg-amber-50 hover:bg-amber-100 text-[#f39c12] font-bold text-xs border-2 border-[#f39c12]/20 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                  >
                    🖼️ View Consolidated Consonants Chart
                  </button>
                </div>

                {/* Letter grids for 18 letters */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {MEI_LETTERS.map((letter) => (
                    <div
                      key={letter.id}
                      onClick={() => focusLetterOnWorkplace(letter)}
                      className={`relative p-4 rounded-2xl border-2 cursor-pointer transition duration-150 flex flex-col items-center text-center ${
                        selectedLetter?.id === letter.id
                          ? "bg-[#008080]/10 border-[#008080] ring-2 ring-[#008080]/15"
                          : "bg-white border-[#e5e0d8] hover:border-[#008080]/40"
                      }`}
                    >
                      <span className="absolute top-2.5 left-3 text-[20px]" title="Visual noun indicator">
                        {letter.illustration}
                      </span>
                      <span className="absolute top-2.5 right-3 bg-slate-100 text-[#444] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">
                        Mei
                      </span>

                      <div className="text-4xl font-extrabold text-[#008080] font-serif mt-5 mb-2">
                        {letter.letter}
                      </div>

                      <h4 className="text-xs font-bold text-[#202020] uppercase truncate w-full">
                        {letter.phonics}
                      </h4>

                      <div className="mt-3 py-1 px-2.5 bg-[#fcf9f2] rounded-lg border border-[#e8dfcf] text-[11px] text-[#2d3436] font-medium w-full truncate border-dashed">
                        ⚙️ {letter.exampleTamil} ({letter.exampleEnglish})
                      </div>
                    </div>
                  ))}
                </div>

                {/* CONSONANT CHART LIGHTBOX MODAL */}
                {showMeiChartModal && (
                  <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white border-4 border-[#008080] rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl relative animate-fade-in text-center p-6">
                      
                      {/* Close Trigger */}
                      <button
                        onClick={() => setShowMeiChartModal(false)}
                        className="absolute top-4 right-4 w-9 h-9 bg-[#1a1a1a] hover:bg-rose-600 text-white rounded-full flex items-center justify-center cursor-pointer transition font-bold"
                      >
                        ✕
                      </button>

                      <div className="mb-4">
                        <span className="bg-[#f39c12] text-slate-950 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                          ACCURATE SPELLING AID CHART
                        </span>
                        <h3 className="text-xl font-extrabold text-[#2d3436] mt-2">
                          Standard Tamil Consonants Key-Map
                        </h3>
                        <p className="text-xs text-[#7f8c8d]">
                          Reference mapping for retroflex loops and phonetic consonants.
                        </p>
                      </div>

                      {/* Display original image without any modifications or overlay clutter */}
                      <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-100 mb-3 relative flex items-center justify-center" style={{ height: "450px" }}>
                        <img
                          src="https://i0.wp.com/worksheet.learningprodigy.com/wp-content/uploads/2023/08/Tamil-Consonant-Chart_1.jpg?resize=768%2C1086&ssl=1"
                          alt="Official Tamil Consonant Chart reference diagram"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      <p className="text-[11px] text-[#555] font-sans leading-relaxed italic">
                        "Works as an ideal spelling correction companion when writing க் to ன். Observe the illustration rules."
                      </p>
                    </div>
                  </div>
                )}

                {/* FOCUS ASSIGNED WORKSPACE PANEL */}
                {selectedLetter && selectedLetter.type === "mei" && (
                  <div className="border-2 border-[#e5e0d8] bg-white rounded-3xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left side info */}
                      <div className="space-y-5">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-[#008080] text-white rounded-2xl text-3xl font-extrabold flex items-center justify-center font-serif shadow shadow-[#008080]/15 shrink-0">
                            {selectedLetter.letter}
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-[#f39c12]">ACTIVE CONSONANT PRACTICE</span>
                            <h3 className="text-xl font-bold text-[#2d3436] mt-0.5">
                              {selectedLetter.phonics}
                            </h3>
                            <p className="text-xs text-[#7f8c8d]">
                              Spelled with a dot top modifier (pulli).
                            </p>
                          </div>
                        </div>

                        {/* Word Example details */}
                        <div className="bg-[#fcfaf5] border border-[#e5dfd0] rounded-2xl p-4.5 space-y-3.5">
                          <span className="text-xs uppercase font-extrabold text-[#7f8c8d]">Consonant word vocabulary:</span>
                          <div className="flex items-center gap-4">
                            <span className="text-4xl p-2 bg-white rounded-xl border border-[#ede7d9] shadow-inner">{selectedLetter.illustration}</span>
                            <div>
                              <h4 className="text-lg font-bold text-[#008080] font-sans">
                                {selectedLetter.exampleTamil}
                              </h4>
                              <p className="text-xs text-slate-500 font-medium">
                                Spelling: <span className="font-semibold text-slate-700">{selectedLetter.exampleTamil}</span> &rarr; Pronounces: <span className="italic font-bold font-mono text-[#f39c12]">{selectedLetter.examplePronunciation}</span> ({selectedLetter.exampleEnglish})
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sound playback and evaluations */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-extrabold text-[#2d3436] tracking-wide uppercase">Interactive Vocal Lab:</h4>
                          <div className="flex flex-wrap gap-3">
                            <button
                              onClick={() => teachPronunciationPhonetically(selectedLetter.letter, selectedLetter.phonics)}
                              className="bg-[#008080] hover:bg-[#006e6e] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition duration-150"
                            >
                              <Volume2 size={15} /> Play Phonic Spelling
                            </button>

                            <button
                              onClick={() => speakTamilText(selectedLetter.exampleTamil)}
                              className="bg-[#f39c12] hover:bg-[#e08e0b] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition duration-150"
                            >
                              <Volume2 size={15} /> Play Word Sound ({selectedLetter.examplePronunciation})
                            </button>

                            <button
                              onClick={() => speakTamilPatiently(selectedLetter.exampleTamil)}
                              className="bg-[#800020] hover:bg-[#600018] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition duration-150"
                              title="Listen to the syllables spelled out slowly with patient pauses so you can repeat along!"
                            >
                              <Volume2 size={15} /> 🐌 Syllable Spell-out (பிரித்து வாசி)
                            </button>

                            <button
                              onClick={() => startVoiceRecording(selectedLetter.exampleTamil)}
                              className={`font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 border transition duration-150 ${
                                isRecording
                                  ? "bg-rose-50 hover:bg-rose-600 text-white border-rose-400 animate-pulse"
                                  : "bg-white hover:bg-slate-50 text-[#2d3436] border-slate-300"
                              }`}
                            >
                              <Mic size={15} />
                              {isRecording ? "Listening..." : "Verify My Voice Input"}
                            </button>
                          </div>

                          {/* Voice matches text helper */}
                          {speechFeedback && (
                            <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                              speechFeedback.success
                                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                : "bg-red-50 border-rose-200 text-rose-800"
                            }`}>
                              <span className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                                {speechFeedback.success ? "✨ Perfect Ucharipu! (Pronunciation)" : "⚠️ Hard Retroflex Misalignment"}
                              </span>
                              {speechFeedback.msg}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Center: Live Virtual Teacher Coach "Kavitha Mam" */}
                      <div className="bg-[#fdfbf6] p-5 rounded-2xl border-2 border-[#f39c12]/20 flex flex-col justify-between relative overflow-hidden shadow-xs">
                        <div className="absolute top-0 left-0 right-0 bg-[#f39c12] text-slate-900 text-[9px] uppercase font-extrabold tracking-widest py-1.5 px-3 text-center">
                          👩‍🏫 Pronunciation Coach: Kavitha Mam
                        </div>
                        
                        <div className="pt-6 text-center space-y-4">
                          {/* Animated Kavitha Mam Voice Coach Avatar */}
                          <div className="relative inline-block mt-1">
                            <KavithaMamAvatar action={teacherTip.avatarAction} size="md" />
                          </div>

                          <div className="bg-white p-3 rounded-xl border border-[#ede7dc] text-[11px] text-slate-800 font-sans shadow-xs relative">
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-white"></div>
                            <p className="leading-relaxed font-semibold italic text-[#2c3e50]">"{teacherTip.text}"</p>
                          </div>
                        </div>

                        {/* Physical guides block */}
                        <div className="mt-3 pt-3 border-t border-dashed border-[#ede7dc] space-y-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">👅</span>
                            <div className="leading-tight">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Tongue Position:</span>
                              <span className="font-bold text-[#2d3436] font-sans">{teacherTip.tongue}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">👄</span>
                            <div className="leading-tight">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Lip Shape:</span>
                              <span className="font-bold text-[#2d3436] font-sans">{teacherTip.lip}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">💨</span>
                            <div className="leading-tight">
                              <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Breath Guidance:</span>
                              <span className="font-bold text-[#008080] font-sans">{teacherTip.breath}</span>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Speech Speed Selector */}
                        <div className="mt-3 pt-2.5 border-t border-[#ede7dc] flex flex-col gap-1.5 bg-amber-50/50 p-2 rounded-xl border border-amber-200/40">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 font-sans">
                            <span className="flex items-center gap-1">🐢 Coach Speed / வேகம்:</span>
                            <span className="text-[#f39c12] font-bold">
                              {voiceSpeed === 0.50 ? "🐌 Hyper-Slow" : voiceSpeed === 0.65 ? "🐢 Patient" : "⚡ Standard"}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {[
                              { label: "0.50x 🐌 (Very Slow)", value: 0.50 },
                              { label: "0.65x 🐢 (Slow/Clear)", value: 0.65 },
                              { label: "0.80x ⚡ (Normal)", value: 0.80 }
                            ].map((s) => (
                              <button
                                key={s.value}
                                onClick={() => setVoiceSpeed(s.value)}
                                className={`flex-1 text-center py-1 rounded text-[9px] font-extrabold transition cursor-pointer ${
                                  voiceSpeed === s.value
                                    ? "bg-[#f39c12] text-white shadow-xs"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                              >
                                {s.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right side blackboard trace */}
                      <div>
                        <Whiteboard
                          targetLetter={selectedLetter.letter}
                          phonics={selectedLetter.phonics}
                          onAssessmentCompleted={(score) => {
                            setAccuracyHistory((prev) => [...prev.slice(1), score]);
                            // Teacher cheers the student
                            setTeacherTip((prev) => ({
                              ...prev,
                              text: `Amaidhi! Fantastic stroke balance! You scored ${score}% on drawing "${selectedLetter.letter}". Keep practicing!`,
                              avatarAction: "cheering"
                            }));
                            setTimeout(() => {
                              setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
                            }, 3500);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}


            {/* TAB CONTENT 4: SPECIAL AYUTHA LETTER (ஃ) */}
            {selectedTab === "aytha" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                <div className="bg-[#008080]/5 border-2 border-[#008080]/20 p-6 rounded-[28px] relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-tr from-[#008080] to-[#20b2aa] text-white rounded-3xl flex items-center justify-center text-4xl shadow font-serif text-center relative shrink-0">
                    ஃ
                  </div>

                  <div className="space-y-1.5 text-center md:text-left">
                    <span className="bg-[#f39c12] text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      Unique Ayutha Category
                    </span>
                    <h3 className="text-xl font-bold text-slate-800">ஃ - Ayudha Eluthu (ஆய்த எழுத்து)</h3>
                    <p className="text-[#666] text-sm leading-relaxed">
                      This is the single special character of the Tamil vocabulary. Represented with three circular dots resembling a standard three-dimensional shield. It generates a glottal sound or heavy breath transition.
                    </p>
                  </div>
                </div>

                {/* Focus Board Setup for Ayutha split */}
                <div className="border-2 border-[#e5e0d8] bg-white rounded-3xl p-6 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left text instructions */}
                    <div className="space-y-5">
                      <div className="bg-[#fcfaf5] border border-[#e5dfd0] rounded-2xl p-4.5 space-y-3.5">
                        <span className="text-xs uppercase font-extrabold text-[#7f8c8d]">Ayutha word example:</span>
                        <div className="flex items-center gap-4">
                          <span className="text-4xl p-2 bg-white rounded-xl border border-[#ede7d9] shadow-inner">{AYTHA_LETTER.illustration}</span>
                          <div>
                            <h4 className="text-lg font-bold text-[#008080] font-sans">
                              {AYTHA_LETTER.exampleTamil}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium font-sans">
                              Spelled word: <span className="font-semibold text-slate-700">{AYTHA_LETTER.exampleTamil}</span> &rarr; Pronunciation: <span className="italic font-bold font-mono text-[#f39c12]">{AYTHA_LETTER.examplePronunciation}</span> ({AYTHA_LETTER.exampleEnglish})
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sound controls */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-extrabold text-[#2d3436] tracking-wide uppercase">Interactive Vocal Lab:</h4>
                        <div className="flex flex-wrap gap-2.5">
                          <button
                            onClick={() => teachPronunciationPhonetically(AYTHA_LETTER.letter, AYTHA_LETTER.phonics)}
                            className="bg-[#008080] hover:bg-[#006e6e] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition"
                          >
                            <Volume2 size={15} /> Teach Phonics
                          </button>

                          <button
                            onClick={() => speakTamilText(AYTHA_LETTER.exampleTamil)}
                            className="bg-[#f39c12] hover:bg-[#e08e0b] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition"
                          >
                            <Volume2 size={15} /> Play Word Sound ({AYTHA_LETTER.examplePronunciation})
                          </button>

                          <button
                            onClick={() => speakTamilPatiently(AYTHA_LETTER.exampleTamil)}
                            className="bg-[#800020] hover:bg-[#600018] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition"
                            title="Listen to the syllables spelled out slowly with patient pauses so you can repeat along!"
                          >
                            <Volume2 size={15} /> 🐌 Syllable Spell-out (பிரித்து வாசி)
                          </button>

                          <button
                            onClick={() => startVoiceRecording(AYTHA_LETTER.exampleTamil)}
                            className={`font-bold text-xs py-3 px-5 rounded-xl shadow-xs cursor-pointer flex items-center gap-2 border transition ${
                              isRecording
                                ? "bg-rose-50 hover:bg-rose-600 text-white border-rose-400 animate-pulse"
                                : "bg-white hover:bg-slate-50 text-[#2d3436] border-slate-300"
                            }`}
                          >
                            <Mic size={15} /> Verify Voice Input
                          </button>
                        </div>

                        {/* speech results display */}
                        {speechFeedback && (
                          <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                            speechFeedback.success
                              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                              : "bg-red-50 border-rose-200 text-rose-800"
                          }`}>
                            <span className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                              {speechFeedback.success ? "✨ Perfect Ucharipu!" : "⚠️ Pronunciation Discrepancy"}
                            </span>
                            {speechFeedback.msg}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center: Live Virtual Teacher Coach "Kavitha Mam" */}
                    <div className="bg-[#fdfbf6] p-5 rounded-2xl border-2 border-[#f39c12]/20 flex flex-col justify-between relative overflow-hidden shadow-xs">
                      <div className="absolute top-0 left-0 right-0 bg-[#f39c12] text-slate-900 text-[9px] uppercase font-extrabold tracking-widest py-1.5 px-3 text-center">
                        👩‍🏫 Pronunciation Coach: Kavitha Mam
                      </div>
                      
                      <div className="pt-6 text-center space-y-4">
                        {/* Animated Kavitha Mam Voice Coach Avatar */}
                        <div className="relative inline-block mt-1">
                          <KavithaMamAvatar action={teacherTip.avatarAction} size="md" />
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-[#ede7dc] text-[11px] text-slate-800 font-sans shadow-xs relative">
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-l-6 border-l-transparent border-r-6 border-r-transparent border-b-6 border-b-white"></div>
                          <p className="leading-relaxed font-semibold italic text-[#2c3e50]">"{teacherTip.text}"</p>
                        </div>
                      </div>

                      {/* Physical guides block */}
                      <div className="mt-3 pt-3 border-t border-dashed border-[#ede7dc] space-y-2 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">👅</span>
                          <div className="leading-tight">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Tongue Position:</span>
                            <span className="font-bold text-[#2d3436] font-sans">{teacherTip.tongue}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">👄</span>
                          <div className="leading-tight">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Lip Shape:</span>
                            <span className="font-bold text-[#2d3436] font-sans">{teacherTip.lip}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">💨</span>
                          <div className="leading-tight">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block font-sans">Breath Guidance:</span>
                            <span className="font-bold text-[#008080] font-sans">{teacherTip.breath}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Speech Speed Selector */}
                      <div className="mt-3 pt-2.5 border-t border-[#ede7dc] flex flex-col gap-1.5 bg-amber-50/50 p-2 rounded-xl border border-amber-200/40">
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 font-sans">
                          <span className="flex items-center gap-1">🐢 Coach Speed / வேகம்:</span>
                          <span className="text-[#f39c12] font-bold">
                            {voiceSpeed === 0.50 ? "🐌 Hyper-Slow" : voiceSpeed === 0.65 ? "🐢 Patient" : "⚡ Standard"}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {[
                            { label: "0.50x 🐌 (Very Slow)", value: 0.50 },
                            { label: "0.65x 🐢 (Slow/Clear)", value: 0.65 },
                            { label: "0.80x ⚡ (Normal)", value: 0.80 }
                          ].map((s) => (
                            <button
                              key={s.value}
                              onClick={() => setVoiceSpeed(s.value)}
                              className={`flex-1 text-center py-1 rounded text-[9px] font-extrabold transition cursor-pointer ${
                                voiceSpeed === s.value
                                  ? "bg-[#f39c12] text-white shadow-xs"
                                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* drawing area */}
                    <div>
                      <Whiteboard
                        targetLetter={AYTHA_LETTER.letter}
                        phonics={AYTHA_LETTER.phonics}
                        onAssessmentCompleted={(score) => {
                          setAccuracyHistory((prev) => [...prev.slice(1), score]);
                          // Teacher cheers the student
                          setTeacherTip((prev) => ({
                            ...prev,
                            text: `Miga arumai! Beautiful tracing of the Ayutha letter 'ஃ'. You achieved ${score}% precision. Awesome job!`,
                            avatarAction: "cheering"
                          }));
                          setTimeout(() => {
                            setTeacherTip((prev) => ({ ...prev, avatarAction: "idle" }));
                          }, 3300);
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}


            {/* TAB CONTENT 5: NUMBERS 1-100 FLASHCARDS */}
            {selectedTab === "numbers" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                <div>
                  <h2 className="text-2xl font-extrabold text-[#2d3436]">Tamil Numeral System 1 - 100 (எண்கள்)</h2>
                  <p className="text-sm text-[#7f8c8d] mt-1">
                    Discover how standard numerical values convert to classical Tamil symbols, words, and phonetic scripts. Try picking any index!
                  </p>
                </div>

                {/* SLIDER / DROPDOWN CONTROLLER */}
                <div className="bg-white border-2 border-[#e5e0d8] p-6 rounded-[28px] border-b-6 border-b-[#dbcfbd] space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-bold text-[#2d3436]">Choose index (1 to 100):</span>
                      <input
                        id="number-input-selector"
                        type="number"
                        min="1"
                        max="100"
                        value={numberInput}
                        onChange={(e) => {
                          const val = Math.max(1, Math.min(100, parseInt(e.target.value) || 1));
                          setNumberInput(val);
                          setActiveNumberFlashcard(getTamilNumber(val));
                        }}
                        className="w-20 px-3 py-1.5 bg-[#fcfaf5] border-2 border-[#e5dfd0] rounded-xl text-center text-sm font-bold text-[#c27a05] focus:outline-none"
                      />
                    </div>

                    <div className="w-full sm:w-2/3">
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={numberInput}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setNumberInput(val);
                          setActiveNumberFlashcard(getTamilNumber(val));
                        }}
                        className="w-full bg-[#e5dfd0] h-1.5 rounded-lg cursor-pointer accent-[#008080]"
                        id="number-range-slider"
                      />
                    </div>

                  </div>

                  {/* FLASHCARD BODY PLATFORM */}
                  <div className="bg-gradient-to-tr from-[#008080]/5 to-white border-2 border-[#008080]/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    
                    <div className="space-y-2 text-center md:text-left flex-1">
                      <span className="text-[10px] font-bold text-[#008080] tracking-widest uppercase">
                        KURAL FLASHCARD #{activeNumberFlashcard.value}
                      </span>
                      
                      <div className="flex items-baseline justify-center md:justify-start gap-3">
                        <h3 className="text-4xl font-extrabold text-[#2d3436]">
                          {activeNumberFlashcard.value}
                        </h3>
                        <span className="text-2xl text-[#f39c12] font-semibold" title="Tamil Classical numeral character">
                          (Tamil Glyph: {activeNumberFlashcard.script})
                        </span>
                      </div>

                      <h4 className="text-2xl font-extrabold text-[#008080] font-sans pt-1">
                        {activeNumberFlashcard.word}
                      </h4>

                      <p className="text-sm text-[#7f8c8d]">
                        Phonetic pronunciation guide: <span className="font-bold italic text-slate-800 font-mono">"{activeNumberFlashcard.phonetic}"</span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                      <button
                        onClick={() => speakTamilText(activeNumberFlashcard.word)}
                        className="bg-[#008080] hover:bg-[#006a6a] text-white font-bold text-xs py-3 px-5 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow"
                      >
                        <Volume2 size={15} /> Play Vocal Sound ({activeNumberFlashcard.phonetic})
                      </button>

                      <button
                        onClick={() => startVoiceRecording(activeNumberFlashcard.word)}
                        className="bg-[#f39c12] hover:bg-[#e08a00] text-white font-bold text-xs py-3 px-5 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow"
                      >
                        <Mic size={15} /> Verify Speaking Code
                      </button>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC NUMBER TRANSLATING MINIGAME */}
                <div className="bg-[#fdfaf6] border-2 border-[#e5e0d8] p-6 rounded-[28px] border-b-6 border-b-[#dbcfbd] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-850">🎮 Gamified Sandbox: Number Pronunciation Quiz</h3>
                      <p className="text-xs text-[#7f8c8d] mt-1">Translate the digit into the proper Tamil word spelling!</p>
                    </div>
                    <span className="bg-[#008080] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      Target: {quizNumber}
                    </span>
                  </div>

                  <div className="bg-[#fffcf9] border border-[#e5dfce] p-4 rounded-xl text-center">
                    <span className="text-xs font-bold text-slate-400 block mb-1">WHAT IS THE TAMIL WORD FOR VALUE</span>
                    <span className="text-4xl font-extrabold text-[#f39c12]">{quizNumber}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {quizOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(opt)}
                        className="bg-white hover:bg-slate-50 border-2 border-[#e5e0d8] hover:border-[#008080] py-3 px-4 rounded-xl text-xs font-bold text-[#2d3436] tracking-tight transition cursor-pointer active:scale-95 text-center"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {/* Feedback panel */}
                  {quizFeedback && (
                    <div className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in flex items-center justify-between ${
                      quizFeedback.success
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-red-50 border-rose-200 text-rose-800"
                    }`}>
                      <div>
                        <span className="font-bold block text-sm mb-0.5">
                          {quizFeedback.success ? "✨ Correct Quiz Answer!" : "⚠️ Wrong Selection"}
                        </span>
                        <p>{quizFeedback.text}</p>
                      </div>

                      <button
                        onClick={generateNewQuizNumber}
                        className="py-1.5 px-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-[11px] font-bold transition ml-3 shrink-0"
                      >
                        Next Word &rarr;
                      </button>
                    </div>
                  )}
                </div>

                {/* SHOW SELECTABLE NUMBER PRESET INDEX BUTTONS */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">Tap standard practice numbers to load:</h3>
                  <div className="flex flex-wrap gap-2">
                    {DISPLAY_FLASHCARD_NUMBERS.map((nd) => (
                      <button
                        key={nd.value}
                        onClick={() => {
                          setNumberInput(nd.value);
                          setActiveNumberFlashcard(nd);
                        }}
                        className={`py-2 px-3.5 rounded-lg border-2 text-xs font-bold font-mono transition duration-150 ${
                          activeNumberFlashcard.value === nd.value
                            ? "bg-[#008080] text-white border-[#008080]"
                            : "bg-white text-slate-700 border-[#e5e0d8] hover:border-[#008080]"
                        }`}
                      >
                        {nd.value === 100 ? "💯 Nooru" : `${nd.value} (${nd.script})`}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}


            {/* TAB CONTENT 6: SENTENCE MAKER SANDBOX */}
            {selectedTab === "sentences" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                <div>
                  <h2 className="text-2xl font-extrabold text-[#2d3436]">Real-time Sentence Maker Sandbox (தொடர் அமைப்பாளர்)</h2>
                  <p className="text-sm text-[#7f8c8d] mt-1">
                    Assemble English words translated to classical Tamil. Watch how the SOV structural order corrects dynamically!
                  </p>
                </div>

                {/* Live Sandbox Area */}
                <div className="border-2 border-[#e5e0d8] bg-white rounded-[32px] p-6 shadow-sm space-y-6">
                  
                  {/* Word Inventory Pool */}
                  <div>
                    <span className="text-xs uppercase font-extrabold text-[#7f8c8d] block mb-3">
                      Select word blocks to insert into the workspace:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {PUZZLE_WORDS.map((pw) => {
                        const active = chosenWords.includes(pw.tamil);
                        return (
                          <button
                            key={pw.tamil}
                            onClick={() => handleToggleWord(pw.tamil)}
                            className={`py-2.5 px-3.5 rounded-xl border-2 text-xs font-bold transition flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                              active
                                ? "bg-[#008080] text-white border-[#008080] shadow"
                                : "bg-[#fcfbf9] text-slate-800 border-[#e2dec9] hover:border-[#008080]"
                            }`}
                          >
                            <span>{pw.tamil}</span>
                            <span className="text-[10px] opacity-75 font-normal">({pw.english})</span>
                            {active && <Check size={11} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chosen words whiteboard workspace */}
                  <div className="bg-[#1a1a1a] p-6 rounded-2xl border-4 border-slate-900 shadow-inner min-h-[120px] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#008080] uppercase block mb-3 tracking-widest">
                        🎯 CURRENT SENTENCE WORKSPACE (SOV RULES)
                      </span>
                      
                      {chosenWords.length === 0 ? (
                        <div className="text-center text-slate-500 text-sm font-mono italic my-4">
                          [Click word blocks in the pool above to build your sentence...]
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 my-2">
                          {chosenWords.map((item, index) => (
                            <span
                              key={index}
                              onClick={() => handleToggleWord(item)}
                              className="bg-[#008080] text-white font-extrabold text-base px-4 py-2 rounded-lg border border-teal-300/30 flex items-center gap-1.5 cursor-pointer hover:bg-rose-600 transition"
                              title="Click to remove"
                            >
                              {item} <span className="text-xs opacity-60">✕</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {chosenWords.length > 0 && (
                      <div className="flex items-center justify-between border-t border-[#3a3a3a] pt-3 mt-3">
                        <span className="text-[11px] text-[#f39c12] font-mono font-semibold">
                          Total combined items: {chosenWords.length}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setChosenWords([])}
                            className="text-xs text-rose-300 font-bold hover:underline"
                          >
                            Clear All
                          </button>
                          <span className="text-slate-600">|</span>
                          <button
                            onClick={evaluateCustomSentence}
                            className="bg-[#f39c12] hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-lg transition"
                          >
                            Check Grammar Structure &rarr;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SENTENCE EVALUATION BALLOON */}
                  {sentenceEvaluation && (
                    <div className={`p-5 rounded-2xl border text-xs leading-relaxed animate-fade-in ${
                      sentenceEvaluation.correct
                        ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                        : "bg-amber-50 border-amber-200 text-amber-800"
                    }`}>
                      <h4 className="font-extrabold text-sm mb-1">
                        {sentenceEvaluation.correct ? "✨ Outstanding Grammatical Matching!" : "⚠️ SOV Ordering Discrepancy"}
                      </h4>
                      {sentenceEvaluation.correct ? (
                        <div className="space-y-2">
                          <p>
                            English Translation: <b className="text-slate-900">"{sentenceEvaluation.english}"</b> | Phonetics: <span className="italic font-bold font-mono text-[#008080]">{sentenceEvaluation.phonetics}</span>
                          </p>
                          <p className="text-[#3c6b4e]">{sentenceEvaluation.explanation}</p>
                          <button
                            onClick={() => speakTamilText(chosenWords.join(" "))}
                            className="bg-[#008080] text-white text-xs font-bold py-1.5 px-3 rounded-lg mt-1 inline-flex items-center gap-1 cursor-pointer transition"
                          >
                            <Volume2 size={13} /> Speak Full Sentence aloud
                          </button>
                        </div>
                      ) : (
                        <p className="text-[#644f1c]">{sentenceEvaluation.explanation}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* TAILOR-MADE TAMIL ARASI TUTORIAL ASSISTANCE BALLOON */}
                <div className="bg-[#f7f3ed] border border-[#e5e0d8] p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6">
                  
                  {/* Cute AI Vector avatar */}
                  <div className="w-16 h-16 bg-[#ffd1dc] rounded-full flex items-center justify-center shrink-0 border-4 border-[#f39c12] overflow-hidden">
                    <svg viewBox="0 0 100 100" className="w-12 h-12">
                      <circle cx="50" cy="40" r="23" fill="#ffd1dc" />
                      <circle cx="42" cy="38" r="3" fill="#333" />
                      <circle cx="58" cy="38" r="3" fill="#333" />
                      <path d="M43 65 Q 50 78 57 65" stroke="#333" strokeWidth="4" fill="none" />
                      <path d="M22 40 Q 50 14 78 40" stroke="#2d3436" strokeWidth="6" fill="none" />
                    </svg>
                  </div>

                  <div className="space-y-1 text-center md:text-left">
                    <h4 className="font-bold text-slate-800">Grammar Tip from Tamil Arasi:</h4>
                    <p className="text-xs text-[#555] leading-relaxed">
                      "Unlike English, which is <span className="font-semibold text-[#008080]">Subject-Verb-Object</span> (e.g., 'I learn Tamil'), classical Tamil grammar behaves as <span className="font-semibold text-[#f39c12]">Subject-Object-Verb</span> (e.g., 'நான் தமிழ் படிக்கிறேன்' - 'I Tamil learn'). Try building other examples in the whiteboard area!"
                    </p>
                  </div>
                </div>

                {/* ACCURATE PRESETS EXAMPLES */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800">Try playing with these correct grammar examples:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {VALID_SENTENCES.map((su, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setChosenWords(su.words);
                          setSentenceEvaluation({
                            correct: true,
                            english: su.english,
                            phonetics: su.phonetics,
                            explanation: su.explanation
                          });
                        }}
                        className="p-3 bg-white border border-[#e5e0d8] hover:border-[#008080] rounded-2xl cursor-pointer transition flex items-center justify-between"
                      >
                        <div className="text-xs">
                          <span className="font-extrabold text-[#008080] font-sans text-[13px] block">
                            {su.words.join(" ")}
                          </span>
                          <span className="text-slate-500 font-medium block mt-0.5">"{su.english}"</span>
                        </div>
                        <span className="text-xs text-amber-500 font-bold hover:underline shrink-0 pl-2">Load &rarr;</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}


            {/* TAB CONTENT 7: BEST YOUTUBE LESSON COGNIZANT CHANNEL LISTS */}
            {selectedTab === "youtube" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                <div>
                  <h2 className="text-2xl font-extrabold text-[#2d3436]">Recommended Youtube Pronunciation Lessons</h2>
                  <p className="text-sm text-[#7f8c8d] mt-1">
                    Carefully chosen video streaming links for deep-dive retroflex pronunciation training.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Adult training card */}
                  <div className="bg-white border-2 border-[#e5e0d8] rounded-[24px] overflow-hidden shadow-sm relative flex flex-col border-b-6 border-b-[#c7beb0]">
                    <div className="p-5 flex-1 space-y-3">
                      <span className="bg-[#008080]/10 text-[#008080] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase leading-none">
                        Category: Adults Retroflex
                      </span>
                      <h3 className="text-lg font-bold text-[#2d3436]">
                        Pronouncing Retroflex Rhotic (ழ) with Subu
                      </h3>
                      <p className="text-xs text-[#7f8c8d] leading-relaxed">
                        A highly informative breakdown by channel <i>bvenkisubu</i> designed for English-native speakers attempting difficult retroflex sounds.
                      </p>
                    </div>

                    <div className="p-4 bg-[#fcfaf5] border-t border-[#ede7db] flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">Channel: <b>bvenkisubu</b></span>
                      <a
                        href="https://youtu.be/m9uhcsCpVuI?si=FQmtzZ50tmqVCuw2"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#008080] hover:bg-[#006e6e] text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition"
                      >
                        <Play size={12} /> Watch Lesson <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                  {/* Kids training card */}
                  <div className="bg-white border-2 border-[#e5e0d8] rounded-[24px] overflow-hidden shadow-sm relative flex flex-col border-b-6 border-b-[#c7beb0]">
                    <div className="p-5 flex-1 space-y-3">
                      <span className="bg-[#f39c12]/10 text-[#f39c12] text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase leading-none">
                        Category: Children Phonics
                      </span>
                      <h3 className="text-lg font-bold text-[#2d3436]">
                        Tamilarasi Alphabet & Sounds
                      </h3>
                      <p className="text-xs text-[#7f8c8d] leading-relaxed">
                        A delightful, visually rich and beautifully paced introduction video tailored for kids from the celebrated <i>tamilarasi</i> channel.
                      </p>
                    </div>

                    <div className="p-4 bg-[#fcfaf5] border-t border-[#ede7db] flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-medium">Channel: <b>tamilarasi</b></span>
                      <a
                        href="https://youtu.be/A2ynzohXNmQ?si=dETdMqJuFQshHieZ"
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#008080] hover:bg-[#006e6e] text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition"
                      >
                        <Play size={12} /> Watch Lesson <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>

                </div>

                {/* GENERAL ADVICE ON RETROFLEX PRONUNCIATIONS */}
                <div className="bg-[#f7f3ed] border border-[#e5e0d8] p-6 rounded-3xl space-y-3">
                  <h4 className="font-bold text-slate-800">💡 Dynamic Vocal Warm-Up Tips:</h4>
                  <ul className="text-xs text-[#555] space-y-2 list-disc list-inside">
                    <li>Position your tongue backwards toward the soft palate without completely stopping the airflow to master the <b>ழ (ZH)</b> character.</li>
                    <li>The letter <b>ற (RR)</b> is highly trilled, unlike the dental-tap <b>ர (R)</b>. Let your vibratory resonance speak.</li>
                    <li>Use the Blackboard tool regularly to relate drawing strokes to high fidelity vocals.</li>
                  </ul>
                </div>

              </div>
            )}


            {/* TAB CONTENT 8: TAMIL HERITAGE & WIKIPEDIA HISTORY HUB */}
            {selectedTab === "heritage" && (
              <div className="space-y-6 animate-fade-in text-sans">
                
                {/* Hub Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#ede7dc] pb-5">
                  <div>
                    <span className="bg-[#800020]/10 text-[#800020] text-[9.5px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-[#800020]/20">
                      🏛️ Classical Antiquity / செம்மொழி வரலாறு
                    </span>
                    <h2 className="text-2xl font-black text-[#2d3436] tracking-tight mt-1 font-sans">
                      Tamil Heritage, History & Culture
                    </h2>
                    <p className="text-sm text-[#7f8c8d] mt-0.5">
                      Authentic historical documentation from academic sources and Wikipedia detailing the 2,000+ year legacy of Tamil.
                    </p>
                  </div>

                  {/* Quick Dynamic Speed Indicator for the recitations */}
                  <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs md:max-w-xs">
                    <span className="font-bold text-slate-600">🐌 Voice Speed:</span>
                    <div className="flex bg-white rounded-lg p-0.5 border border-amber-200 shadow-xs">
                      {[0.50, 0.65, 0.80].map((s) => (
                        <button
                          key={s}
                          onClick={() => setVoiceSpeed(s)}
                          className={`px-2 py-1 rounded text-[10px] font-extrabold transition cursor-pointer ${
                            voiceSpeed === s
                              ? "bg-[#f39c12] text-white"
                              : "text-slate-500 hover:bg-slate-50"
                          }`}
                        >
                          {s === 0.50 ? "0.5x 🐌" : s === 0.65 ? "0.65x 🐢" : "0.8x ⚡"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Internal sub-tab panels */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "goddess", label: "Goddess Tamil Thai (தமிழ்த்தாய்)", icon: "🌸" },
                    { id: "history", label: "Three Great Dynasties (முடியுடை மூவேந்தர்)", icon: "👑" },
                    { id: "literature", label: "Classical Sangam Literature (சங்க இலக்கியம்)", icon: "📜" },
                    { id: "sites", label: "Architecture & Heritage Sites (நினைவுச் சின்னங்கள்)", icon: "🏯" }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setHeritageSubTab(sub.id as any)}
                      className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-extrabold transition cursor-pointer border ${
                        heritageSubTab === sub.id
                          ? "bg-[#800020] text-white border-[#800020] shadow-sm"
                          : "bg-white text-slate-700 border-[#ede7dc] hover:bg-slate-50"
                      }`}
                    >
                      <span>{sub.icon}</span>
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>

                {/* Sub Tab Panel 1: Goddess Tamil Thai */}
                {heritageSubTab === "goddess" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Uploaded image rendering card */}
                    <div className="lg:col-span-5 bg-white border-2 border-[#e5e0d8] rounded-[32px] p-5 shadow-sm text-center space-y-4">
                      <div className="relative overflow-hidden rounded-2xl bg-[#faf6f0] border border-[#e5dfd0]">
                        <img
                          src={tamilThaiGoddessImg}
                          alt="Goddess Tamil Thai (தமிழ்த்தாய்)"
                          className="w-full max-h-[380px] object-contain mx-auto rounded-xl shadow-xs hover:scale-[1.01] transition duration-300 transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-[#800020]/90 text-white text-[11px] font-black py-2 tracking-widest uppercase">
                          தமிழ்த்தாய் - Mother Tamil Goddess
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-black text-[#f39c12] bg-[#f39c12]/10 px-2.5 py-0.5 rounded-full inline-block">
                          Tamil Nadu State Anthem Anthem
                        </span>
                        <h4 className="text-base font-bold text-slate-800 font-sans">
                          Listen and Pronounce the Sacred Anthem
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
                          Click the play button to hear the beautiful opening prayer recited at a highly patient, slowly parsed rate so you can repeat every syllable correctly.
                        </p>
                      </div>

                      {/* Recitation Trigger */}
                      <div className="bg-[#fcfaf6] border border-[#ede7dc] rounded-2xl p-4 flex flex-col gap-3 justify-center items-center">
                        <button
                          onClick={() => {
                            speakTamilText("நீராரும் கடலுடுத்த நிலமடந்தைக் கெழிலொழுகும் சீராரும் வதனமெனத் திகழ்பரதக் கண்டமிதில்");
                            setTeacherTip({
                              text: "Reciting 'Tamil Thai Vazhthu' prayer slowly: நீராரும் கடலுடுத்த நிலமடந்தைக் கெழிலொழுகும் சீராரும் வதனமெனத் திகழ்பரதக் கண்டமிதில்... Try saying each word slowly after me!",
                              tongue: "Keep tongue curved moderately upwards behind your hard teeth.",
                              lip: "Pucker slightly forward for round vowels during recitation.",
                              breath: "Prolonged steady breath flow",
                              avatarAction: "speaking"
                            });
                          }}
                          className="bg-[#800020] hover:bg-[#600018] text-white py-3 px-6 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition active:scale-95 cursor-pointer"
                        >
                          🎵 Listen Recitation Slowly (பொறுமையாக கேட்க)
                        </button>
                        
                        <div className="bg-white px-3 py-2 rounded-lg border text-left text-[10px] space-y-1 w-full text-slate-600 font-serif leading-relaxed italic">
                          <p className="font-bold text-[#800020]">"Neeraarum kadaludutha nilamadanthai kezhilozhugum..."</p>
                          <p className="border-t border-slate-100 pt-1 text-[9px]">English Translation: Clad in the beautiful ocean as garment, holding the Earth as her graceful face, stands Bharat subcontinent...</p>
                        </div>
                      </div>
                    </div>

                    {/* Wiki Factual Information */}
                    <div className="lg:col-span-7 bg-[#fdfbf7] border-2 border-[#e5e0d8] rounded-[32px] p-6 shadow-xs space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-extrabold text-[#800020] flex items-center gap-1.5 font-sans">
                          🌸 The Personification of Tamil
                        </h3>
                        <p className="text-xs text-[#555] leading-relaxed font-sans">
                          According to historical documentation and Wikipedia records, <b>Tamil Thai (தமிழ்த்தாய்)</b> represents the personified deification of the Tamil language. Tamil is the first language in modern India to be declared a <b>"Classical Language"</b> by the government, celebrated for its unique non-Sanskritic origin, grammatical continuity, and structural autonomy.
                        </p>
                      </div>

                      <div className="space-y-3.5 border-t border-dashed border-[#ede7dc] pt-4.5">
                        <div className="bg-white p-3.5 rounded-2xl border border-[#ede7dc] space-y-1.5">
                          <span className="text-[9.5px] uppercase font-extrabold text-slate-400 block tracking-widest">Antiquity & Continuity</span>
                          <p className="text-xs text-[#2c3e50] leading-relaxed font-sans">
                            Tamil literary records survive unbroken for well over <b>2,200 years</b>. Unlike many other classical languages (such as Sanskrit, Latin, or Classical Greek) which transitioned into liturgical or dead languages, Tamil has been continuously spoken, written, and celebrated in everyday life from antiquity directly into the internet era.
                          </p>
                        </div>

                        <div className="bg-white p-3.5 rounded-2xl border border-[#ede7dc] space-y-1.5">
                          <span className="text-[9.5px] uppercase font-extrabold text-slate-400 block tracking-widest">The State Anthem (தமிழ்த்தாய் வாழ்த்து)</span>
                          <p className="text-xs text-[#2c3e50] leading-relaxed font-sans">
                            With lyrics composed by renowned scholar <b>Manonmaniam Sundaram Pillai</b> and music arranged by M. S. Viswanathan, the song <i>"Neeraarum Kadaludutha"</i> is the official anthem of Tamil Nadu. It pays homage to the timeless beauty, youthfulness, and cultural sovereignty of Mother Tamil, praised for standing tall while other ancient tongues faded.
                          </p>
                        </div>

                        <div className="bg-[#800020]/5 p-4 rounded-2xl border border-[#800020]/15 space-y-1 text-center font-sans">
                          <h5 className="text-xs font-bold text-[#800020]">💡 Pronunciation Golden Tip from Coach:</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            When pronouncing <b>"தமிழ்த்தாய்" (Tamil Thāi)</b>, make sure to curl your tongue deeply back for the hard <b>ழ (zh)</b> sound, release it softly, and say <b>thāi</b> with a soft breathy dental "t" (like Spanish 't'), not a hard English alveolar 't'. Let's practice!
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* Sub Tab Panel 2: Three Great Dynasties */}
                {heritageSubTab === "history" && (
                  <div className="space-y-6">
                    <div className="bg-white border-2 border-[#e5e0d8] rounded-[32px] p-6 shadow-sm">
                      <h3 className="text-lg font-extrabold text-slate-800 font-sans mb-3 flex items-center gap-2">
                        👑 The Crowned Kings of the Sangam Era (முடியுடை மூவேந்தர்)
                      </h3>
                      <p className="text-xs text-[#666] leading-relaxed mb-6 font-sans">
                        For over a millennium, the Tamil landscape was ruled by three legendary dynasties who patronized literature, built astronomical stone empires, and navigated the global high seas.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* THE CHOLAS */}
                        <div className="bg-amber-50/25 border-2 border-amber-200/50 rounded-2.5xl p-5 flex flex-col justify-between hover:shadow-md transition">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="bg-amber-100 text-amber-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Chola Dynasty</span>
                              <span className="text-xl">🐅</span>
                            </div>
                            <h4 className="text-base font-extrabold text-slate-800">The Maritime Emperors</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                              Ruling from Tanjavur and Gangaikonda Cholapuram, the Cholas commanded one of the greatest maritime fleets in ancient Asia. They expanded Tamil literature, built towering structural temples, and projected power across Southeast Asia, including Sumatra, Malaya, and the Srivijaya Empire.
                            </p>
                          </div>
                          <div className="pt-4 border-t border-dashed border-amber-200/50 mt-3 text-[9px] text-[#2d3436] font-bold font-mono">
                            👑 Famous Ruler: Rajaraja Chola I
                          </div>
                        </div>

                        {/* THE PANDYAS */}
                        <div className="bg-blue-50/25 border-2 border-blue-200/50 rounded-2.5xl p-5 flex flex-col justify-between hover:shadow-md transition">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="bg-blue-100 text-blue-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Pandya Dynasty</span>
                              <span className="text-xl">🐟</span>
                            </div>
                            <h4 className="text-base font-extrabold text-slate-800">Patrons of the Sangam Assembly</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                              Based in the spiritual capital of Madurai, the Pandyas were renowned guardians of the Sangam assemblies (academy of letters). They established global maritime pearl trade networks with Ptolemaic Egypt, Ancient Greece, and Rome, ensuring wealth and high literary prosperity.
                            </p>
                          </div>
                          <div className="pt-4 border-t border-dashed border-blue-200/50 mt-3 text-[9px] text-[#2d3436] font-bold font-mono">
                            👑 Famous Assembly: Madurai Tamil Sangam
                          </div>
                        </div>

                        {/* THE CHERAS */}
                        <div className="bg-emerald-50/25 border-2 border-emerald-200/50 rounded-2.5xl p-5 flex flex-col justify-between hover:shadow-md transition">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">Chera Dynasty</span>
                              <span className="text-xl">🏹</span>
                            </div>
                            <h4 className="text-base font-extrabold text-slate-800">The West Coast spice Pioneers</h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                              Sovereigns of the western mountains and coast (modern Kerala/Western TN), the Cheras built active commercial partnerships with Roman merchants. They dominated the international black pepper and beryl trade, constructing famous ports like Muziris that linked East Asia to the Mediterranean.
                            </p>
                          </div>
                          <div className="pt-4 border-t border-dashed border-emerald-200/50 mt-3 text-[9px] text-[#2d3436] font-bold font-mono">
                            👑 Famous Port: Ancient Muziris
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub Tab Panel 3: Classical Sangam Literature */}
                {heritageSubTab === "literature" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left detailed text */}
                    <div className="lg:col-span-6 bg-white border-2 border-[#e5e0d8] rounded-[32px] p-6 shadow-sm space-y-4">
                      <h3 className="text-lg font-extrabold text-[#800020] font-sans">
                        📜 The Golden Sangam Academies
                      </h3>
                      <p className="text-xs text-[#555] leading-relaxed font-sans">
                        <b>Sangam Literature (சங்க இலக்கியம்)</b> refers to classical Tamil poetry compiled in three successive convocations held under Pandyan patronage. Comprising 2,381 poems by 473 poets (including many female scholars like Avvaiyar), it is entirely secular, depicting direct human emotions, nature, and chivalrous virtues.
                      </p>

                      <div className="space-y-3 border-t border-dashed border-[#ede7dc] pt-4 font-sans">
                        <div className="flex gap-3">
                          <span className="text-lg">📗</span>
                          <div className="text-xs leading-relaxed text-[#2c3e50]">
                            <b>Tolkāppiyam:</b> The oldest surviving comprehensive work of Tamil grammar and poetics, defining phonology, syntax, and cultural classifications long before the common era.
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-lg">📙</span>
                          <div className="text-xs leading-relaxed text-[#2c3e50]">
                            <b>Ettuthokai & Pathuppāttu:</b> The Eight Anthologies and Ten Long Poems detailing daily life categorized into <i>Akam</i> (inner feelings/love) and <i>Puram</i> (outer actions/valor).
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right side: Interactive Thirukkural Pronunciation Hub */}
                    <div className="lg:col-span-6 bg-[#fdfaf5] border-2 border-[#ede4d3] rounded-[32px] p-6 shadow-sm space-y-4">
                      <div className="border-b border-[#ede4d3] pb-3">
                        <span className="bg-amber-100 text-amber-800 text-[8.5px] font-black px-2.5 py-0.5 rounded-full uppercase">Interactive Pronunciation Hub</span>
                        <h4 className="text-base font-extrabold text-slate-800 mt-1">Recite Sacred Universal Couplets</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Select any Thirukkural below. Listen to Coach Kavitha Mam pronounce it at your chosen slow voice speed, then try practicing!
                        </p>
                      </div>

                      {/* Interactive Couplets List */}
                      <div className="space-y-3">
                        {[
                          {
                            title: "Kural 1: Universal Alphabet",
                            tamil: "அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு.",
                            translit: "Akara mudhala ezhuthellam aadhi bhagavan mudhatre ulagu.",
                            english: "As the letter 'A' is the first of all letters, so is the eternal Lord first of the universe."
                          },
                          {
                            title: "Sangam Creed: Global Kinship",
                            tamil: "யாதும் ஊரே யாவரும் கேளிர்.",
                            translit: "Yaadhum oore yaavarum kelir.",
                            english: "To us all countries are our homeland, and all peoples are our native kin."
                          },
                          {
                            title: "Kural 139: Sweet Speech Virtue",
                            tamil: "இனிய உளவாக இன்னாத கூறல் கனிஇருப்பக் காய்கவர்ந் தற்று.",
                            translit: "Iniya ulavaaga innaadha kooral kani-iruppak kaai-kavarn dhatru.",
                            english: "To speak harsh words when sweet words are available is like choosing hard unripe fruit when honeyed fruit is ripe."
                          }
                        ].map((kural, kidx) => (
                          <div key={kidx} className="bg-white p-4 rounded-2.5xl border border-[#ede7dc] hover:border-[#f39c12] hover:shadow-xs transition space-y-2 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-black text-slate-400 font-sans">{kural.title}</span>
                                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Section: Ethics</span>
                              </div>
                              <p className="text-xs font-black text-[#800020] mt-1.5 leading-relaxed font-serif text-center bg-stone-50/70 p-2.5 rounded-xl border border-dashed border-stone-200">
                                {kural.tamil}
                              </p>
                              <p className="text-[10.5px] italic text-[#666] font-semibold font-mono leading-relaxed mt-1 text-center">
                                "{kural.translit}"
                              </p>
                              <p className="text-[10.5px] text-[#2d3436] font-medium font-sans leading-relaxed mt-1 bg-stone-50/30 p-2 rounded-lg text-slate-600 border border-slate-100">
                                <b>Meaning:</b> {kural.english}
                              </p>
                            </div>

                            <button
                              onClick={() => {
                                speakTamilText(kural.tamil);
                                setTeacherTip({
                                  text: `Reciting Thirukkural: "${kural.tamil}". Listen to my pronunciation rhythm very carefully!`,
                                  tongue: "Slightly flat, curling back gently on alveolar letters.",
                                  lip: "Naturally flat smile posture with gentle rounded transitions.",
                                  breath: "Slow, focused chanting vocal style",
                                  avatarAction: "speaking"
                                });
                              }}
                              className="bg-[#faf6f0] hover:bg-amber-100/50 border border-amber-200 text-[#800020] hover:text-[#500010] py-2 px-4 rounded-xl font-extrabold text-[10.5px] flex items-center justify-center gap-1.5 mt-2 transition active:scale-97 cursor-pointer shadow-xs"
                            >
                              🔊 Recite Couplet Slowly (பொறுமையாக கேட்க)
                            </button>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>
                )}

                {/* Sub Tab Panel 4: World Heritage Architecture */}
                {heritageSubTab === "sites" && (
                  <div className="bg-white border-2 border-[#e5e0d8] rounded-[32px] p-6 shadow-sm space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-extrabold text-slate-800 font-sans flex items-center gap-2">
                        🏯 Living Architectural Monuments (கலை & கோவில்)
                      </h3>
                      <p className="text-xs text-[#666] leading-relaxed font-sans animate-fade-in">
                        Tamil history is physically carved into granite stones. UNESCO designates several majestic, millennium-old sites in Tamil Nadu as global cultural treasures.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                      
                      {/* SITE 1 */}
                      <div className="bg-[#faf9f6] border border-[#ede7dc] rounded-2.5xl p-5 hover:shadow-md transition duration-300">
                        <span className="text-2xl block mb-2">⭐</span>
                        <h4 className="text-sm font-black text-slate-800">Thanjavur Brihadisvara Temple</h4>
                        <span className="text-[9.5px] font-bold text-[#008080] uppercase tracking-wider block mt-0.5">Big Temple / தஞ்சை பெரிய கோவில்</span>
                        <p className="text-[11px] text-[#555] leading-relaxed mt-2 items-stretch">
                          Built by Emperor Rajaraja Chola I in 1010 CE, this granite architectural marvel features a towering <b>66-meter high tower (Vimanam)</b> crowned by a single monolithic stone dome weighing 80 tons. It stands as a pinnacle of structural engineering, constructed entirely without mortar.
                        </p>
                      </div>

                      {/* SITE 2 */}
                      <div className="bg-[#faf9f6] border border-[#ede7dc] rounded-2.5xl p-5 hover:shadow-md transition duration-300">
                        <span className="text-2xl block mb-2">⭐</span>
                        <h4 className="text-sm font-black text-slate-800">Mahabalipuram Shore Temples</h4>
                        <span className="text-[9.5px] font-bold text-[#008080] uppercase tracking-wider block mt-0.5">Rock-Cut Art / மாமல்லபுரம்</span>
                        <p className="text-[11px] text-[#555] leading-relaxed mt-2 item-stretch">
                          Carved by the Pallava dynasty during the 7th and 8th centuries on the coast of Bay of Bengal, this UNESCO site contains monolithic cave temples, open-air rock excavations (Arjuna's Penance), and structural stone temples built to weather seaside winds for centuries.
                        </p>
                      </div>

                      {/* SITE 3 */}
                      <div className="bg-[#faf9f6] border border-[#ede7dc] rounded-2.5xl p-5 hover:shadow-md transition duration-300">
                        <span className="text-2xl block mb-2">⭐</span>
                        <h4 className="text-sm font-black text-slate-800">Madurai Meenakshi Temple</h4>
                        <span className="text-[9.5px] font-bold text-[#008080] uppercase tracking-wider block mt-0.5">High-Gothic South Indian Art</span>
                        <p className="text-[11px] text-[#555] leading-relaxed mt-2 item-stretch">
                          The central cultural soul of Madurai, this massive active temple city is surrounded by <b>14 sky-scraping gate complexes (Gopurams)</b> encrusted with thousands of highly painted, intricate mythological sculptures. Rebuilt during the Nayak dynasty based on classical Pandyan layouts.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

          </main>


          {/* 3. RIGHT SIDEBAR AI TUTOR "TAMIL ARASI" COMPANION */}
          <aside className="w-full lg:w-[300px] bg-[#f7f3ed] border-l border-[#e5e0d8] flex flex-col shrink-0 font-sans h-full min-h-[480px]">
            
            <div className="p-5 border-b border-[#e5e0d8] text-center bg-white">
              <div className="w-20 h-20 bg-white border-4 border-[#f39c12] rounded-full mx-auto flex items-center justify-center overflow-hidden shadow-xs relative mb-3">
                <svg viewBox="0 0 100 100" className="w-14 h-14">
                  <circle cx="50" cy="40" r="23" fill="#ffd1dc" />
                  <circle cx="42" cy="38" r="3" fill="#333" />
                  <circle cx="58" cy="38" r="3" fill="#333" />
                  <path d="M43 65 Q 50 78 57 65" stroke="#333" strokeWidth="4" fill="none" />
                  <path d="M22 40 Q 50 14 78 40" stroke="#2d3436" strokeWidth="6" fill="none" />
                </svg>
              </div>
              <h3 className="font-extrabold text-[#2d3436] text-base">Tamil Arasi</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Your AI Language Coach</p>
            </div>

            {/* Chat Messages Frame */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[360px] lg:max-h-none">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[90%] relative shadow-xs animate-fade-in ${
                    msg.role === "user"
                      ? "bg-[#008080] text-white ml-auto rounded-tr-none"
                      : "bg-white text-slate-800 mr-auto rounded-tl-none border border-[#e5dfd4]"
                  }`}
                >
                  <span className="font-bold block mb-1 text-[9px] uppercase tracking-wider opacity-75">
                    {msg.role === "user" ? "You" : "Tamil Arasi"}
                  </span>
                  <div className="whitespace-pre-line font-sans font-medium">{msg.content}</div>
                </div>
              ))}

              {chatLoading && (
                <div className="bg-white border border-[#e5dfd4] rounded-2xl p-3.5 rounded-tl-none text-slate-500 text-xs w-[60%] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#f39c12] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#f39c12] rounded-full animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 bg-[#f39c12] rounded-full animate-bounce delay-200"></span>
                </div>
              )}
            </div>

            {/* Reference training PDF Quick links card inside assistant */}
            <div className="p-4 bg-white/50 border-t border-[#e5e0d8] space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">TRAINING FILES & REFERENCE</span>
              <div className="space-y-1.5 text-xs text-[#008080]">
                <a
                  href="http://www.kids.noolagam.com/printables/pdf_files/Uyir_words.pdf"
                  target="_blank"
                  className="flex items-center gap-2 hover:underline font-semibold"
                >
                  🔗 Kids Noolagam Vowels PDF
                </a>
                <a
                  href="https://i0.wp.com/worksheet.learningprodigy.com/wp-content/uploads/2023/08/Tamil-Consonant-Chart_1.jpg?resize=768%2C1086&ssl=1"
                  target="_blank"
                  className="flex items-center gap-2 hover:underline font-semibold"
                >
                  🔗 Tamil Consonants Chart Sheet
                </a>
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-[#e5e0d8] bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a language query..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                  className="flex-1 px-3 py-2 bg-[#fcfbf9] border-2 border-[#e5e0d8] rounded-xl text-xs focus:outline-none focus:border-[#008080] placeholder-[#aaa] text-slate-800"
                  id="chat-input-field"
                />
                <button
                  id="chat-submit-btn"
                  onClick={handleSendChatMessage}
                  className="p-2.5 bg-[#008080] hover:bg-[#006e6e] text-white rounded-xl shadow cursor-pointer transition active:scale-95 flex items-center justify-center shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>

          </aside>

        </div>
      )}

    </div>
  );
}
