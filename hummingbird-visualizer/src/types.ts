/** 口の形（Mouth Position）8種 */
export type MouthPosition =
  | 'Open'
  | 'Triangle'
  | 'Base'
  | 'Pucker'
  | 'O-shape'
  | 'Lips-in'
  | 'Bottom-lip-in'
  | 'Closed';

/** 舌の位置（Tongue Placement）8種 */
export type TonguePlacement =
  | 'Zero'
  | 'C'
  | 'E'
  | 'Th'
  | 'L'
  | 'TDN'
  | 'K'
  | 'R';

/** 単一音素の情報 */
export interface PhonemeInfo {
  /** IPA記号 */
  ipa: string;
  /** 口の形 */
  mp: MouthPosition;
  /** 舌の位置 */
  tp: TonguePlacement;
  /** ストレスマーク (0=無強勢, 1=第一強勢, 2=第二強勢) */
  stress?: 0 | 1 | 2;
  /** マッピングの確度 */
  confidence: 'confirmed' | 'estimated';
}

/** 単語単位の音素列 */
export interface WordPhonemes {
  /** 元の単語テキスト */
  word: string;
  /** IPA表記（結合済み） */
  ipa: string;
  /** 音素リスト */
  phonemes: PhonemeInfo[];
  /** cmudict に存在したか */
  found: boolean;
}

/** アプリ全体の状態 */
export interface AppState {
  /** 入力テキスト */
  inputText: string;
  /** 変換後の単語音素リスト */
  words: WordPhonemes[];
  /** 現在選択中の音素インデックス（全音素フラット列のindex） */
  selectedPhonemeIndex: number;
}
