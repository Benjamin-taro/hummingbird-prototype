/**
 * 英文 + IPA表示エリア
 * 各単語・音素をクリッカブルに表示する
 */

import type { WordPhonemes, PhonemeInfo } from '../types';

interface PhonemeDisplayProps {
  words: WordPhonemes[];
  /** 全音素フラット列中の選択インデックス */
  selectedIndex: number;
  onPhonemeClick: (flatIndex: number) => void;
}

export function PhonemeDisplay({
  words,
  selectedIndex,
  onPhonemeClick,
}: PhonemeDisplayProps) {
  if (words.length === 0) return null;

  // 全音素のフラットなインデックスを計算するためのオフセット
  let flatOffset = 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-4">
        音素マップ
        <span className="ml-2 text-xs font-normal text-gray-400">
          （音素をクリックして詳細を確認）
        </span>
      </h2>
      <div className="flex flex-wrap gap-4">
        {words.map((wordData) => {
          const wordStartIndex = flatOffset;
          flatOffset += wordData.phonemes.length;

          return (
            <WordBlock
              key={`${wordData.word}-${wordStartIndex}`}
              wordData={wordData}
              startFlatIndex={wordStartIndex}
              selectedIndex={selectedIndex}
              onPhonemeClick={onPhonemeClick}
            />
          );
        })}
      </div>
    </div>
  );
}

interface WordBlockProps {
  wordData: WordPhonemes;
  startFlatIndex: number;
  selectedIndex: number;
  onPhonemeClick: (flatIndex: number) => void;
}

function WordBlock({
  wordData,
  startFlatIndex,
  selectedIndex,
  onPhonemeClick,
}: WordBlockProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* 単語テキスト */}
      <span className="text-base text-gray-800 font-medium px-1">
        {wordData.word}
      </span>

      {/* 音素タイル列 */}
      <div className="flex gap-0.5">
        {wordData.phonemes.map((phoneme, localIdx) => {
          const flatIdx = startFlatIndex + localIdx;
          const isSelected = flatIdx === selectedIndex;

          return (
            <PhonemeTile
              key={`${flatIdx}`}
              phoneme={phoneme}
              isSelected={isSelected}
              onClick={() => onPhonemeClick(flatIdx)}
            />
          );
        })}
      </div>

      {/* IPA全体 */}
      <span className="text-xs text-gray-400 font-mono">
        /{wordData.ipa}/
      </span>
    </div>
  );
}

interface PhonemeTileProps {
  phoneme: PhonemeInfo;
  isSelected: boolean;
  onClick: () => void;
}

function PhonemeTile({ phoneme, isSelected, onClick }: PhonemeTileProps) {
  const stressColor =
    phoneme.stress === 1
      ? 'text-indigo-700 font-bold'
      : phoneme.stress === 2
      ? 'text-indigo-500 font-semibold'
      : 'text-gray-600';

  return (
    <button
      onClick={onClick}
      className={`
        min-w-[28px] px-1.5 py-1.5 rounded-lg text-sm font-mono
        border transition-all
        ${
          isSelected
            ? 'bg-indigo-500 text-white border-indigo-600 shadow-md scale-110'
            : 'bg-gray-50 border-gray-200 hover:bg-indigo-50 hover:border-indigo-200'
        }
        ${!isSelected ? stressColor : ''}
        ${phoneme.ipa === '?' ? 'text-red-400' : ''}
      `}
      aria-label={`音素: ${phoneme.ipa}`}
      aria-pressed={isSelected}
    >
      {phoneme.ipa}
      {/* 強勢マーク */}
      {phoneme.stress === 1 && !isSelected && (
        <sup className="text-[8px] text-indigo-500">1</sup>
      )}
      {phoneme.stress === 2 && !isSelected && (
        <sup className="text-[8px] text-indigo-400">2</sup>
      )}
    </button>
  );
}
