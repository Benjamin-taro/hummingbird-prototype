/**
 * 選択中の音素の詳細情報パネル
 */

import type { PhonemeInfo } from '../types';
import { mpDescriptions, tpDescriptions } from '../data/mpTpDescriptions';
import { MouthSVG } from './MouthSVG';
import { TongueSVG } from './TongueSVG';

interface InfoPanelProps {
  phoneme: PhonemeInfo | null;
}

/** 二重母音の遷移情報 */
const diphthongTransitions: Record<string, { from: string; to: string; label: string }> = {
  'aɪ': { from: 'Open', to: 'Triangle', label: 'Open → Triangle（二重母音）' },
  'aʊ': { from: 'Open', to: 'O-shape', label: 'Open → O-shape（二重母音）' },
  'oʊ': { from: 'Base', to: 'O-shape', label: 'Base → O-shape（二重母音）' },
  'eɪ': { from: 'Triangle', to: 'Triangle', label: 'Triangle（二重母音）' },
  'ɔɪ': { from: 'Base', to: 'Triangle', label: 'Base → Triangle（二重母音）' },
};

export function InfoPanel({ phoneme }: InfoPanelProps) {
  if (!phoneme) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center min-h-[200px] text-gray-400">
        <span className="text-4xl mb-2">👆</span>
        <p className="text-sm">音素をクリックすると詳細が表示されます</p>
      </div>
    );
  }

  const mpDesc = mpDescriptions[phoneme.mp];
  const tpDesc = tpDescriptions[phoneme.tp];
  const diphthong = diphthongTransitions[phoneme.ipa];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* ヘッダー */}
      <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-mono font-bold text-indigo-700">
            /{phoneme.ipa}/
          </span>
          {phoneme.stress === 1 && (
            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
              第一強勢
            </span>
          )}
          {phoneme.stress === 2 && (
            <span className="text-xs bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded-full">
              第二強勢
            </span>
          )}
          {phoneme.stress === 0 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
              無強勢
            </span>
          )}
        </div>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            phoneme.confidence === 'confirmed'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {phoneme.confidence === 'confirmed' ? '✓ 確定' : '推定'}
        </span>
      </div>

      <div className="p-5">
        {/* 二重母音の通知 */}
        {diphthong && (
          <div className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700">
            <span className="font-medium">二重母音：</span>
            {diphthong.label} に口の形が遷移します
          </div>
        )}

        {/* SVG図（口と舌） */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">口の形（MP）</h3>
            <MouthSVG mp={phoneme.mp} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">舌の位置（TP）</h3>
            <TongueSVG tp={phoneme.tp} />
          </div>
        </div>

        {/* MP情報 */}
        <div className="mb-4 p-3 bg-indigo-50 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">MP</span>
            <span className="font-semibold text-gray-800">{mpDesc.name}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{mpDesc.description}</p>
          <p className="text-sm text-indigo-700 bg-white rounded-lg p-2">
            💡 {mpDesc.advice}
          </p>
        </div>

        {/* TP情報 */}
        <div className="p-3 bg-rose-50 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wide">TP</span>
            <span className="font-semibold text-gray-800">{tpDesc.name}</span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{tpDesc.description}</p>
          <p className="text-sm text-rose-700 bg-white rounded-lg p-2">
            💡 {tpDesc.advice}
          </p>
        </div>
      </div>
    </div>
  );
}
