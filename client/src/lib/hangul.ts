// Korean Hangul composition logic for 2-beolsik keyboard

// Jamo (consonants and vowels)
const CHOSEONG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNGSEONG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONGSEONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

// Compound vowels mapping
const COMPOUND_VOWELS: Record<string, string> = {
  'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ',
  'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ',
  'ㅡㅣ': 'ㅢ',
};

// Compound jongseong (batchim) mapping
const COMPOUND_JONGSEONG: Record<string, string> = {
  'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ',
  'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ',
  'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ',
  'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ',
};

// Decompose compound jongseong
const DECOMPOSE_JONGSEONG: Record<string, [string, string]> = {
  'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
  'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
  'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'],
  'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
};

// 2-beolsik keyboard layout mapping (QWERTY key -> Hangul jamo)
export const KEYBOARD_MAP: Record<string, string> = {
  'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
  'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
  'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
  'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
  'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ', 'b': 'ㅜ',
  'n': 'ㅡ', 'm': 'ㅠ',
  // Shift keys (double consonants and compound vowels)
  'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ',
  'O': 'ㅒ', 'P': 'ㅖ',
};

// Reverse mapping for virtual keyboard display
export const KEYBOARD_LAYOUT = [
  [
    { key: 'q', jamo: 'ㅂ', shift: 'ㅃ' },
    { key: 'w', jamo: 'ㅈ', shift: 'ㅉ' },
    { key: 'e', jamo: 'ㄷ', shift: 'ㄸ' },
    { key: 'r', jamo: 'ㄱ', shift: 'ㄲ' },
    { key: 't', jamo: 'ㅅ', shift: 'ㅆ' },
    { key: 'y', jamo: 'ㅛ', shift: '' },
    { key: 'u', jamo: 'ㅕ', shift: '' },
    { key: 'i', jamo: 'ㅑ', shift: '' },
    { key: 'o', jamo: 'ㅐ', shift: 'ㅒ' },
    { key: 'p', jamo: 'ㅔ', shift: 'ㅖ' },
  ],
  [
    { key: 'a', jamo: 'ㅁ', shift: '' },
    { key: 's', jamo: 'ㄴ', shift: '' },
    { key: 'd', jamo: 'ㅇ', shift: '' },
    { key: 'f', jamo: 'ㄹ', shift: '' },
    { key: 'g', jamo: 'ㅎ', shift: '' },
    { key: 'h', jamo: 'ㅗ', shift: '' },
    { key: 'j', jamo: 'ㅓ', shift: '' },
    { key: 'k', jamo: 'ㅏ', shift: '' },
    { key: 'l', jamo: 'ㅣ', shift: '' },
  ],
  [
    { key: 'z', jamo: 'ㅋ', shift: '' },
    { key: 'x', jamo: 'ㅌ', shift: '' },
    { key: 'c', jamo: 'ㅊ', shift: '' },
    { key: 'v', jamo: 'ㅍ', shift: '' },
    { key: 'b', jamo: 'ㅜ', shift: '' },
    { key: 'n', jamo: 'ㅡ', shift: '' },
    { key: 'm', jamo: 'ㅠ', shift: '' },
  ],
];

function isConsonant(jamo: string): boolean {
  return CHOSEONG.includes(jamo) || ['ㅃ','ㅉ','ㄸ','ㄲ','ㅆ'].includes(jamo);
}

function isVowel(jamo: string): boolean {
  return JUNGSEONG.includes(jamo) || ['ㅒ','ㅖ'].includes(jamo);
}

function composeHangul(cho: string, jung: string, jong: string = ''): string {
  const choIdx = CHOSEONG.indexOf(cho);
  const jungIdx = JUNGSEONG.indexOf(jung);
  const jongIdx = jong ? JONGSEONG.indexOf(jong) : 0;
  
  if (choIdx < 0 || jungIdx < 0 || jongIdx < 0) return '';
  
  const code = 0xAC00 + (choIdx * 21 + jungIdx) * 28 + jongIdx;
  return String.fromCharCode(code);
}

// State machine for Hangul composition
export type HangulState = {
  buffer: string[]; // jamo buffer for current syllable
  committed: string; // already committed text
  display: string; // what to show (committed + composing)
};

export function createInitialState(): HangulState {
  return { buffer: [], committed: '', display: '' };
}

function getComposing(buffer: string[]): string {
  if (buffer.length === 0) return '';
  if (buffer.length === 1) return buffer[0];
  
  // Try to compose
  const cho = buffer[0];
  if (!isConsonant(cho)) return buffer.join('');
  
  if (buffer.length >= 2 && isVowel(buffer[1])) {
    let jung = buffer[1];
    let jongStart = 2;
    
    // Check compound vowel
    if (buffer.length >= 3 && isVowel(buffer[2])) {
      const compound = COMPOUND_VOWELS[buffer[1] + buffer[2]];
      if (compound) {
        jung = compound;
        jongStart = 3;
      }
    }
    
    if (jongStart >= buffer.length) {
      return composeHangul(cho, jung);
    }
    
    // Has jongseong
    let jong = buffer[jongStart];
    if (jongStart + 1 < buffer.length) {
      const compound = COMPOUND_JONGSEONG[buffer[jongStart] + buffer[jongStart + 1]];
      if (compound) {
        jong = compound;
      }
    }
    
    return composeHangul(cho, jung, jong);
  }
  
  return buffer.join('');
}

export function processJamo(state: HangulState, jamo: string): HangulState {
  const newState = { ...state, buffer: [...state.buffer] };
  
  if (newState.buffer.length === 0) {
    newState.buffer.push(jamo);
  } else if (isConsonant(jamo)) {
    // Adding consonant
    if (newState.buffer.length === 1 && isConsonant(newState.buffer[0])) {
      // Two consonants - commit first, start new
      newState.committed += newState.buffer[0];
      newState.buffer = [jamo];
    } else if (newState.buffer.length >= 2) {
      // We have cho + jung (+ possibly compound vowel)
      let jungEnd = 1;
      if (newState.buffer.length >= 3 && isVowel(newState.buffer[1]) && isVowel(newState.buffer[2])) {
        const compound = COMPOUND_VOWELS[newState.buffer[1] + newState.buffer[2]];
        if (compound) jungEnd = 2;
      }
      
      const jongStart = jungEnd + 1;
      
      if (jongStart >= newState.buffer.length) {
        // No jongseong yet - add as jongseong
        if (JONGSEONG.includes(jamo)) {
          newState.buffer.push(jamo);
        } else {
          // Can't be jongseong, commit and start new
          newState.committed += getComposing(newState.buffer);
          newState.buffer = [jamo];
        }
      } else if (jongStart === newState.buffer.length - 1) {
        // Has one jongseong - try compound
        const compound = COMPOUND_JONGSEONG[newState.buffer[jongStart] + jamo];
        if (compound && JONGSEONG.includes(compound)) {
          newState.buffer.push(jamo);
        } else {
          // Commit current, start new syllable
          newState.committed += getComposing(newState.buffer);
          newState.buffer = [jamo];
        }
      } else {
        // Already has compound jongseong, commit and start new
        newState.committed += getComposing(newState.buffer);
        newState.buffer = [jamo];
      }
    } else {
      newState.buffer.push(jamo);
    }
  } else if (isVowel(jamo)) {
    // Adding vowel
    if (newState.buffer.length === 1 && isConsonant(newState.buffer[0])) {
      // cho + vowel
      newState.buffer.push(jamo);
    } else if (newState.buffer.length === 1 && isVowel(newState.buffer[0])) {
      // Try compound vowel
      const compound = COMPOUND_VOWELS[newState.buffer[0] + jamo];
      if (compound) {
        newState.buffer = [compound];
      } else {
        newState.committed += newState.buffer[0];
        newState.buffer = [jamo];
      }
    } else if (newState.buffer.length >= 2 && isVowel(newState.buffer[newState.buffer.length - 1]) && !isConsonant(newState.buffer[newState.buffer.length - 1])) {
      // Check compound vowel after cho
      if (newState.buffer.length === 2) {
        const compound = COMPOUND_VOWELS[newState.buffer[1] + jamo];
        if (compound) {
          newState.buffer[1] = compound;
        } else {
          newState.committed += getComposing(newState.buffer);
          newState.buffer = [jamo];
        }
      } else {
        newState.committed += getComposing(newState.buffer);
        newState.buffer = [jamo];
      }
    } else if (newState.buffer.length >= 3) {
      // Has jongseong - split: jongseong becomes choseong of new syllable
      let jungEnd = 1;
      if (newState.buffer.length >= 3 && isVowel(newState.buffer[1]) && isVowel(newState.buffer[2])) {
        const compound = COMPOUND_VOWELS[newState.buffer[1] + newState.buffer[2]];
        if (compound) jungEnd = 2;
      }
      
      const jongStart = jungEnd + 1;
      
      if (jongStart < newState.buffer.length) {
        if (newState.buffer.length - jongStart === 2) {
          // Compound jongseong - split: keep first part, move second to new syllable
          const baseSyllable = newState.buffer.slice(0, jongStart + 1);
          const newCho = newState.buffer[newState.buffer.length - 1];
          newState.committed += getComposing(baseSyllable);
          newState.buffer = [newCho, jamo];
        } else {
          // Single jongseong - move to new syllable
          const baseSyllable = newState.buffer.slice(0, jongStart);
          const newCho = newState.buffer[jongStart];
          newState.committed += getComposing(baseSyllable);
          newState.buffer = [newCho, jamo];
        }
      } else {
        newState.committed += getComposing(newState.buffer);
        newState.buffer = [jamo];
      }
    } else {
      newState.buffer.push(jamo);
    }
  }
  
  newState.display = newState.committed + getComposing(newState.buffer);
  return newState;
}

export function processBackspace(state: HangulState): HangulState {
  const newState = { ...state, buffer: [...state.buffer] };
  
  if (newState.buffer.length > 0) {
    newState.buffer.pop();
  } else if (newState.committed.length > 0) {
    // Remove last committed character
    newState.committed = newState.committed.slice(0, -1);
  }
  
  newState.display = newState.committed + getComposing(newState.buffer);
  return newState;
}

export function commitCurrent(state: HangulState): HangulState {
  if (state.buffer.length === 0) return state;
  
  return {
    buffer: [],
    committed: state.committed + getComposing(state.buffer),
    display: state.committed + getComposing(state.buffer),
  };
}

export function processSpace(state: HangulState): HangulState {
  const committed = commitCurrent(state);
  return {
    buffer: [],
    committed: committed.committed + ' ',
    display: committed.committed + ' ',
  };
}
