/**
 * 音素シーケンスバー + ナビゲーションコントロール
 */

import type { PhonemeInfo } from '../types';

interface PhonemeTimelineProps {
  phonemes: PhonemeInfo[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhonemeTimeline({
  phonemes,
  selectedIndex,
  onSelect,
  onPrev,
  onNext,
}: PhonemeTimelineProps) {
  if (phonemes.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex items-center gap-3">
        {/* 前へ */}
        <button
          onClick={onPrev}
          disabled={selectedIndex === 0}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-xl"
          aria-label="前の音素"
        >
          ◀
        </button>

        {/* タイムラインスクロールエリア */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-1 py-1 min-w-max">
            {phonemes.map((phoneme, idx) => {
              const isSelected = idx === selectedIndex;
              const stressDot =
                phoneme.stress === 1
                  ? 'bg-indigo-500'
                  : phoneme.stress === 2
                  ? 'bg-indigo-300'
                  : 'bg-transparent';

              return (
                <button
                  key={idx}
                  onClick={() => onSelect(idx)}
                  className={`
                    relative flex-shrink-0 w-10 h-10 rounded-lg text-sm font-mono
                    border transition-all
                    ${
                      isSelected
                        ? 'bg-indigo-500 text-white border-indigo-600 shadow scale-110'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-indigo-50'
                    }
                  `}
                  aria-label={`音素 ${idx + 1}: ${phoneme.ipa}`}
                  aria-current={isSelected ? 'true' : undefined}
                >
                  {phoneme.ipa}
                  {/* ストレスドット */}
                  <span
                    className={`absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full ${stressDot}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 次へ */}
        <button
          onClick={onNext}
          disabled={selectedIndex === phonemes.length - 1}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors text-xl"
          aria-label="次の音素"
        >
          ▶
        </button>
      </div>

      {/* 位置インジケーター */}
      <div className="text-center mt-2 text-xs text-gray-400">
        {selectedIndex + 1} / {phonemes.length} 音素
      </div>
    </div>
  );
}
