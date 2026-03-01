/**
 * ARPAbet → IPA 変換テーブル
 * ストレスマーク (0/1/2) は別途処理するため、ARPAbet は大文字のままで照合する
 */

export const arpabetToIpa: Record<string, string> = {
  // ===== 母音 =====
  AA: 'ɑː',   // "father"
  AE: 'æ',    // "cat"
  AH: 'ʌ',   // "but" (ストレスあり)
  AO: 'ɔː',  // "law"
  AW: 'aʊ',  // "cow"
  AY: 'aɪ',  // "buy"
  EH: 'ɛ',   // "bed"
  ER: 'ɝː',  // "bird" (stressed r-colored)
  EY: 'eɪ',  // "say"
  IH: 'ɪ',   // "sit"
  IY: 'iː',  // "see"
  OW: 'oʊ',  // "go"
  OY: 'ɔɪ',  // "boy"（マップ未定義、フォールバック表示）
  UH: 'ʊ',   // "foot"
  UW: 'uː',  // "food"

  // 非強勢のAH → schwa
  // AH0 は後処理で ə へ変換する（後述）

  // ===== 子音 =====
  B:  'b',
  CH: 'tʃ',
  D:  'd',
  DH: 'ð',
  F:  'f',
  G:  'ɡ',
  HH: 'h',
  JH: 'dʒ',
  K:  'k',
  L:  'l',
  M:  'm',
  N:  'n',
  NG: 'ŋ',
  P:  'p',
  R:  'ɹ',
  S:  's',
  SH: 'ʃ',
  T:  't',
  TH: 'θ',
  V:  'v',
  W:  'w',
  Y:  'j',
  Z:  'z',
  ZH: 'ʒ',
};

/**
 * ARPAbet記号（ストレスマーク付き可: "AH0", "AH1"）→ IPA変換
 * @returns { ipa, stress }
 */
export function arpabetToIpaWithStress(arpabet: string): {
  ipa: string;
  stress: 0 | 1 | 2 | undefined;
} {
  // 末尾のストレスマーク取得
  const stressMatch = arpabet.match(/([012])$/);
  const stress = stressMatch
    ? (parseInt(stressMatch[1]) as 0 | 1 | 2)
    : undefined;
  const base = arpabet.replace(/[012]$/, '');

  // AH0（非強勢）→ schwa (ə)
  if (base === 'AH' && stress === 0) {
    return { ipa: 'ə', stress };
  }
  // ER0（非強勢のr色付き母音）→ ɚ
  if (base === 'ER' && stress === 0) {
    return { ipa: 'ɚ', stress };
  }

  const ipa = arpabetToIpa[base] ?? `?${base}?`;
  return { ipa, stress };
}
