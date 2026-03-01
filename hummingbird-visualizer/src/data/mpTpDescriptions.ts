/**
 * MP/TP の日本語名称・説明・アドバイス
 */

import type { MouthPosition, TonguePlacement } from '../types';

export interface MPDescription {
  id: MouthPosition;
  name: string;
  description: string;
  advice: string;
}

export interface TPDescription {
  id: TonguePlacement;
  name: string;
  description: string;
  advice: string;
}

export const mpDescriptions: Record<MouthPosition, MPDescription> = {
  Open: {
    id: 'Open',
    name: 'Open（大開口）',
    description: '口を大きく縦に開く',
    advice: 'あごを下げて、口を縦に思い切り開きます。日本語の「ア」より大きく開くイメージです。',
  },
  Triangle: {
    id: 'Triangle',
    name: 'Triangle（三角形）',
    description: '口角を横に引き、やや縦に開く（▽型）',
    advice: '口角を左右に引きながら、縦にも少し開きます。笑顔に近い形です。',
  },
  Base: {
    id: 'Base',
    name: 'Base（基本形）',
    description: 'ニュートラルな中間位置（やや開き）',
    advice: '力を抜いた自然な口の形。上下の歯の間に指1本分ほどの隙間を作ります。',
  },
  Pucker: {
    id: 'Pucker',
    name: 'Pucker（すぼめ）',
    description: '唇をすぼめて前に突き出す',
    advice: 'タコのくちばしのように唇を丸くすぼめて前に突き出します。',
  },
  'O-shape': {
    id: 'O-shape',
    name: 'O-shape（O型）',
    description: '唇を丸く突き出す（O型）',
    advice: '唇でOの字を作るように丸く突き出します。Puckerより口の開きが大きめです。',
  },
  'Lips-in': {
    id: 'Lips-in',
    name: 'Lips-in（唇合わせ）',
    description: '上下の唇を合わせる（内側に巻き込む）',
    advice: '上下の唇をしっかり合わせて空気の流れを止めます。',
  },
  'Bottom-lip-in': {
    id: 'Bottom-lip-in',
    name: 'Bottom-lip-in（下唇当て）',
    description: '下唇を上前歯に当てる',
    advice: '下唇を軽く上の前歯の縁に当て、その隙間から息を出します。',
  },
  Closed: {
    id: 'Closed',
    name: 'Closed（閉じ気味）',
    description: '唇を閉じ気味にし歯を近づける',
    advice: '上下の歯を近づけて、唇もやや閉じ気味にします。歯の隙間から息を出します。',
  },
};

export const tpDescriptions: Record<TonguePlacement, TPDescription> = {
  Zero: {
    id: 'Zero',
    name: 'Zero（退避）',
    description: '舌はどこにも触れない（退避）',
    advice: '舌をどこにも当てず、口の中で浮かせておきます。母音の基本姿勢です。',
  },
  C: {
    id: 'C',
    name: 'C（下前歯）',
    description: '舌先を下前歯の裏に軽く置く',
    advice: '舌先を下の前歯の裏側に軽く当て、歯との隙間から空気を通します。',
  },
  E: {
    id: 'E',
    name: 'E（後部歯茎）',
    description: '舌の両側が上の奥歯に触れる',
    advice: '舌の両端を上の奥歯に当て、舌の中央を盛り上げて息を通します。（推定）',
  },
  Th: {
    id: 'Th',
    name: 'Th（歯間）',
    description: '舌先を上下の歯の間に出す',
    advice: '舌先を軽く上の前歯と下の前歯の間に挟みます。「サ行」の舌とは全く異なります。',
  },
  L: {
    id: 'L',
    name: 'L（歯茎）',
    description: '舌先を上の歯茎（前歯の裏）に付ける',
    advice: '舌先を上の前歯のすぐ後ろの歯茎にしっかり付けます。日本語の「ラ行」より舌が高い位置です。',
  },
  TDN: {
    id: 'TDN',
    name: 'TDN（歯茎弾き）',
    description: '舌先を歯茎に強く弾く/押し当てる',
    advice: '舌先を上の歯茎に強く当て、弾くように離します（T/D）か、当てたまま鼻から息を出します（N）。',
  },
  K: {
    id: 'K',
    name: 'K（軟口蓋）',
    description: '舌の奥を軟口蓋（上あご奥）に付ける',
    advice: '舌の付け根（奥の部分）を上あごの奥側（軟口蓋）に当てます。',
  },
  R: {
    id: 'R',
    name: 'R（巻き舌 or 奥引き）',
    description: '舌を巻く or 奥に引く（どこにも触れない）',
    advice: '舌先をどこにも当てずに後ろに引くか、軽く巻き上げます。日本語の「ラ行」とは異なります。',
  },
};
