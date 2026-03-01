/**
 * IPA音素 → { mp, tp } マッピングテーブル
 * 仕様書 §2.3 に基づく
 */

import type { MouthPosition, TonguePlacement } from '../types';

export interface PhonemeMapEntry {
  mp: MouthPosition;
  tp: TonguePlacement;
  confidence: 'confirmed' | 'estimated';
}

export const phonemeMap: Record<string, PhonemeMapEntry> = {
  // ===== 母音 =====
  'ɑː': { mp: 'Open',    tp: 'Zero', confidence: 'confirmed' },
  'æ':  { mp: 'Open',    tp: 'Zero', confidence: 'confirmed' },
  'aɪ': { mp: 'Open',    tp: 'Zero', confidence: 'confirmed' }, // 二重母音: Open→Triangle
  'aʊ': { mp: 'Open',    tp: 'Zero', confidence: 'confirmed' }, // 二重母音: Open→O-shape
  'ɛ':  { mp: 'Triangle',tp: 'Zero', confidence: 'confirmed' },
  'eɪ': { mp: 'Triangle',tp: 'Zero', confidence: 'confirmed' }, // 二重母音
  'iː': { mp: 'Triangle',tp: 'Zero', confidence: 'confirmed' },
  'ɪ':  { mp: 'Triangle',tp: 'Zero', confidence: 'confirmed' },
  'ə':  { mp: 'Base',    tp: 'Zero', confidence: 'confirmed' },
  'ʌ':  { mp: 'Base',    tp: 'Zero', confidence: 'confirmed' },
  'ɔː': { mp: 'Base',    tp: 'Zero', confidence: 'confirmed' },
  'oʊ': { mp: 'Base',    tp: 'Zero', confidence: 'confirmed' }, // 二重母音: Base→O-shape
  'uː': { mp: 'O-shape', tp: 'Zero', confidence: 'confirmed' },
  'ʊ':  { mp: 'O-shape', tp: 'Zero', confidence: 'confirmed' },
  'ɝː': { mp: 'Pucker',  tp: 'R',   confidence: 'confirmed' },
  'ɚ':  { mp: 'Pucker',  tp: 'R',   confidence: 'confirmed' },

  // ===== 子音 =====
  'p':  { mp: 'Lips-in',       tp: 'Zero', confidence: 'confirmed' },
  'b':  { mp: 'Lips-in',       tp: 'Zero', confidence: 'confirmed' },
  'm':  { mp: 'Lips-in',       tp: 'Zero', confidence: 'confirmed' },
  'f':  { mp: 'Bottom-lip-in', tp: 'Zero', confidence: 'confirmed' },
  'v':  { mp: 'Bottom-lip-in', tp: 'Zero', confidence: 'confirmed' },
  'θ':  { mp: 'Base',          tp: 'Th',   confidence: 'confirmed' },
  'ð':  { mp: 'Base',          tp: 'Th',   confidence: 'confirmed' },
  's':  { mp: 'Closed',        tp: 'C',    confidence: 'confirmed' },
  'z':  { mp: 'Closed',        tp: 'C',    confidence: 'confirmed' },
  'ʃ':  { mp: 'Closed',        tp: 'E',    confidence: 'estimated' },
  'ʒ':  { mp: 'Closed',        tp: 'E',    confidence: 'estimated' },
  'tʃ': { mp: 'Closed',        tp: 'E',    confidence: 'estimated' },
  'dʒ': { mp: 'Closed',        tp: 'E',    confidence: 'estimated' },
  't':  { mp: 'Base',          tp: 'TDN',  confidence: 'confirmed' },
  'd':  { mp: 'Base',          tp: 'TDN',  confidence: 'confirmed' },
  'n':  { mp: 'Base',          tp: 'TDN',  confidence: 'confirmed' },
  'l':  { mp: 'Base',          tp: 'L',    confidence: 'confirmed' },
  'k':  { mp: 'Base',          tp: 'K',    confidence: 'confirmed' },
  'ɡ':  { mp: 'Base',          tp: 'K',    confidence: 'confirmed' },
  'ŋ':  { mp: 'Base',          tp: 'K',    confidence: 'confirmed' },
  'ɹ':  { mp: 'Pucker',        tp: 'R',    confidence: 'confirmed' },
  'w':  { mp: 'O-shape',       tp: 'Zero', confidence: 'confirmed' },
  'j':  { mp: 'Triangle',      tp: 'Zero', confidence: 'confirmed' },
  'h':  { mp: 'Base',          tp: 'Zero', confidence: 'confirmed' },
};

/** IPA記号から MP/TP を取得（未知の場合は null） */
export function lookupPhoneme(ipa: string): PhonemeMapEntry | null {
  return phonemeMap[ipa] ?? null;
}
