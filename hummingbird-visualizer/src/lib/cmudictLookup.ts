/**
 * cmudict.json を使った音素変換パイプライン
 * 単語 → ARPAbet → IPA → PhonemeInfo[]
 */

import { arpabetToIpaWithStress } from '../data/arpabetToIpa';
import { lookupPhoneme } from '../data/phonemeMap';
import type { PhonemeInfo, WordPhonemes } from '../types';
import { tokenize } from './tokenizer';

type CmuDict = Record<string, string[][]>;

let cmudictCache: CmuDict | null = null;

/** cmudict.json を遅延ロード */
async function loadCmudict(): Promise<CmuDict> {
  if (cmudictCache) return cmudictCache;
  const res = await fetch('/cmudict.json');
  if (!res.ok) throw new Error('Failed to load cmudict.json');
  cmudictCache = await res.json();
  return cmudictCache!;
}

/** ARPAbet配列 → PhonemeInfo[] 変換 */
function arpabetListToPhonemes(arpabets: string[]): PhonemeInfo[] {
  return arpabets.map((arp) => {
    const { ipa, stress } = arpabetToIpaWithStress(arp);
    const entry = lookupPhoneme(ipa);
    return {
      ipa,
      mp: entry?.mp ?? 'Base',
      tp: entry?.tp ?? 'Zero',
      stress,
      confidence: entry?.confidence ?? 'estimated',
    } satisfies PhonemeInfo;
  });
}

/** 単語のARPAbet列をIPAに変換してWordPhonemesを生成 */
function buildWordPhonemes(
  original: string,
  arpabets: string[] | null
): WordPhonemes {
  if (!arpabets) {
    // 未知語: 各文字を「?」として表示
    return {
      word: original,
      ipa: '?',
      phonemes: [
        {
          ipa: '?',
          mp: 'Base',
          tp: 'Zero',
          stress: undefined,
          confidence: 'estimated',
        },
      ],
      found: false,
    };
  }

  const phonemes = arpabetListToPhonemes(arpabets);
  const ipa = phonemes.map((p) => p.ipa).join('');

  return {
    word: original,
    ipa,
    phonemes,
    found: true,
  };
}

/**
 * 英文テキストを音素列に変換するメインAPI
 * @param text 英文テキスト
 * @returns WordPhonemes[] 単語ごとの音素情報リスト
 */
export async function convertTextToPhonemes(text: string): Promise<WordPhonemes[]> {
  const dict = await loadCmudict();
  const tokens = tokenize(text);

  return tokens.map((token) => {
    const entries = dict[token.word];
    // 最初の発音バリアントを使用
    const arpabets = entries?.[0] ?? null;
    return buildWordPhonemes(token.original, arpabets);
  });
}

/** cmudict をプリロード（初回変換を速くするため） */
export function preloadCmudict(): void {
  loadCmudict().catch(console.error);
}
