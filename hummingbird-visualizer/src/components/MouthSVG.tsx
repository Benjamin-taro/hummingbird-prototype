/**
 * 口の形SVGコンポーネント（8状態）
 * 正面から見た唇の形を描画する
 */

import type { MouthPosition } from '../types';

interface MouthSVGProps {
  mp: MouthPosition;
  className?: string;
}

/**
 * 各MPの唇パスデータ定義
 * 外唇: outerPath  内唇（口の開き）: innerPath
 * SVG viewport: 0 0 200 120
 * 中心: (100, 60)
 */
const mouthShapes: Record<
  MouthPosition,
  {
    // 上唇 (上辺のパス、中心から左右へ)
    upperLip: string;
    // 下唇
    lowerLip: string;
    // 口の開きを表す楕円パラメータ [cx, cy, rx, ry]
    opening: [number, number, number, number] | null;
    // 唇全体のtransform（Puckerなど前突き）
    transform?: string;
    label: string;
  }
> = {
  Open: {
    upperLip:
      'M 40 52 C 60 38, 140 38, 160 52 C 140 58, 60 58, 40 52 Z',
    lowerLip:
      'M 40 68 C 60 62, 140 62, 160 68 C 140 90, 60 90, 40 68 Z',
    opening: [100, 65, 58, 13],
    label: 'Open',
  },
  Triangle: {
    upperLip:
      'M 35 55 C 60 42, 140 42, 165 55 C 140 60, 60 60, 35 55 Z',
    lowerLip:
      'M 35 65 C 60 60, 140 60, 165 65 C 140 78, 60 78, 35 65 Z',
    opening: [100, 63, 62, 7],
    label: 'Triangle',
  },
  Base: {
    upperLip:
      'M 45 56 C 65 46, 135 46, 155 56 C 135 62, 65 62, 45 56 Z',
    lowerLip:
      'M 45 64 C 65 60, 135 60, 155 64 C 135 76, 65 76, 45 64 Z',
    opening: [100, 62, 48, 5],
    label: 'Base',
  },
  Pucker: {
    upperLip:
      'M 68 53 C 78 45, 122 45, 132 53 C 122 59, 78 59, 68 53 Z',
    lowerLip:
      'M 68 67 C 78 63, 122 63, 132 67 C 122 78, 78 78, 68 67 Z',
    opening: [100, 62, 28, 7],
    transform: 'translate(0, 2)',
    label: 'Pucker',
  },
  'O-shape': {
    upperLip:
      'M 62 50 C 76 42, 124 42, 138 50 C 124 58, 76 58, 62 50 Z',
    lowerLip:
      'M 62 70 C 76 64, 124 64, 138 70 C 124 82, 76 82, 62 70 Z',
    opening: [100, 62, 32, 12],
    label: 'O-shape',
  },
  'Lips-in': {
    upperLip:
      'M 48 57 C 68 50, 132 50, 152 57 C 132 61, 68 61, 48 57 Z',
    lowerLip:
      'M 48 63 C 68 60, 132 60, 152 63 C 132 72, 68 72, 48 63 Z',
    opening: null,
    label: 'Lips-in',
  },
  'Bottom-lip-in': {
    upperLip:
      'M 45 56 C 65 46, 135 46, 155 56 C 135 62, 65 62, 45 56 Z',
    lowerLip:
      'M 50 62 C 70 68, 130 68, 150 62 C 130 72, 70 72, 50 62 Z',
    opening: [100, 61, 47, 4],
    label: 'Bottom-lip-in',
  },
  Closed: {
    upperLip:
      'M 45 57 C 65 48, 135 48, 155 57 C 135 62, 65 62, 45 57 Z',
    lowerLip:
      'M 45 63 C 65 60, 135 60, 155 63 C 135 74, 65 74, 45 63 Z',
    opening: [100, 62, 48, 2],
    label: 'Closed',
  },
};


export function MouthSVG({ mp, className = '' }: MouthSVGProps) {
  const shape = mouthShapes[mp];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px]"
        role="img"
        aria-label={`口の形: ${mp}`}
      >
        {/* 顔の輪郭（鼻下〜あご） */}
        <ellipse cx="100" cy="60" rx="90" ry="52" fill="#FDDBB4" stroke="#D4956A" strokeWidth="1.5" />

        {/* 鼻 */}
        <ellipse cx="88" cy="36" rx="7" ry="5" fill="#E8A87C" />
        <ellipse cx="112" cy="36" rx="7" ry="5" fill="#E8A87C" />

        {/* 人中 */}
        <path d="M 94 41 Q 100 48 106 41" fill="none" stroke="#D4956A" strokeWidth="1" />

        <g transform={shape.transform}>
          {/* 上唇 */}
          <path
            d={shape.upperLip}
            fill="#C47878"
            stroke="#9E5A5A"
            strokeWidth="1"
            style={{ transition: 'd 0.3s ease' }}
          />

          {/* 口の開き（暗い内側） */}
          {shape.opening && (
            <ellipse
              cx={shape.opening[0]}
              cy={shape.opening[1]}
              rx={shape.opening[2]}
              ry={shape.opening[3]}
              fill="#2C1A1A"
            />
          )}

          {/* 下唇 */}
          <path
            d={shape.lowerLip}
            fill="#C47878"
            stroke="#9E5A5A"
            strokeWidth="1"
            style={{ transition: 'd 0.3s ease' }}
          />
        </g>

        {/* 歯（口が開いているとき） */}
        {shape.opening && shape.opening[3] > 4 && (
          <>
            <ellipse cx="100" cy={shape.opening[1] - shape.opening[3] + 4} rx={Math.min(shape.opening[2] - 4, 40)} ry="5" fill="#F5F0E8" />
            <ellipse cx="100" cy={shape.opening[1] + shape.opening[3] - 4} rx={Math.min(shape.opening[2] - 4, 38)} ry="4" fill="#F5F0E8" />
          </>
        )}
      </svg>
      <span className="mt-2 text-sm font-medium text-gray-700">
        {shape.label}
      </span>
    </div>
  );
}
