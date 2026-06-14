// Minimal global declarations to reduce cascading TS errors in the app
declare global {
  interface Window {
    speechSynthesis: any;
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

declare namespace JSX {
  // Allow any intrinsic element to avoid large cascades from missing JSX typings
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Fallback module declarations for untyped packages used in the app
declare module "motion" {
  const whatever: any;
  export default whatever;
}

export {};