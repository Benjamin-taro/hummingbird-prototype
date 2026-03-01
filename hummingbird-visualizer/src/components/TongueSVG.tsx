/**
 * 舌の位置SVGコンポーネント（8状態）
 * 口腔の矢状断面（横から見た図）を描画する
 * SVG viewport: 0 0 240 180
 */

import type { TonguePlacement } from '../types';

interface TongueSVGProps {
  tp: TonguePlacement;
  className?: string;
}

/**
 * 舌のパスデータ と 接触点（赤丸）の定義
 * 座標系:
 *   上あご: 上部
 *   歯: 右側（前方）
 *   奥: 左側（後方）
 *   下あご: 下部
 */
interface TongueShape {
  /** 舌のSVGパス */
  tonguePath: string;
  /** 接触点 [cx, cy] の配列（赤丸を表示） */
  contactPoints: [number, number][];
  /** 説明ラベル */
  label: string;
}

const tongueShapes: Record<TonguePlacement, TongueShape> = {
  Zero: {
    // 舌が低い位置で退避
    tonguePath:
      'M 60 140 C 80 145, 130 145, 160 140 C 175 138, 185 135, 185 130 C 185 120, 170 112, 150 110 C 130 108, 100 112, 80 118 C 65 123, 58 132, 60 140 Z',
    contactPoints: [],
    label: 'Zero（退避）',
  },
  C: {
    // 舌先が下前歯の裏に触れる
    tonguePath:
      'M 60 140 C 80 145, 130 145, 160 140 C 175 138, 185 135, 185 130 C 185 118, 170 106, 150 104 C 130 102, 100 108, 80 116 C 65 122, 57 132, 60 140 Z',
    contactPoints: [[183, 128]],
    label: 'C（下前歯）',
  },
  E: {
    // 舌の前部が盛り上がり後部歯茎付近に近づく
    tonguePath:
      'M 60 140 C 80 145, 130 145, 160 140 C 175 137, 183 132, 182 126 C 180 112, 165 96, 145 92 C 125 88, 102 98, 85 110 C 70 120, 60 132, 60 140 Z',
    contactPoints: [[145, 90]],
    label: 'E（後部歯茎）',
  },
  Th: {
    // 舌先が歯の間に出る
    tonguePath:
      'M 60 140 C 80 145, 135 145, 163 140 C 177 137, 188 132, 190 126 C 192 116, 180 108, 160 106 C 140 104, 108 110, 85 118 C 68 124, 58 133, 60 140 Z',
    contactPoints: [[192, 120]],
    label: 'Th（歯間）',
  },
  L: {
    // 舌先が上歯茎に触れる
    tonguePath:
      'M 60 140 C 80 145, 130 145, 160 140 C 175 138, 185 132, 184 124 C 182 110, 167 94, 148 91 C 128 88, 100 97, 82 110 C 67 120, 58 132, 60 140 Z',
    contactPoints: [[155, 85]],
    label: 'L（歯茎）',
  },
  TDN: {
    // 舌先が歯茎に強く当たる
    tonguePath:
      'M 60 140 C 80 145, 130 145, 160 140 C 174 137, 183 130, 183 122 C 182 108, 166 92, 146 88 C 126 84, 98 96, 80 110 C 65 122, 57 133, 60 140 Z',
    contactPoints: [[160, 82]],
    label: 'TDN（歯茎弾き）',
  },
  K: {
    // 舌の奥が軟口蓋に触れる
    tonguePath:
      'M 60 140 C 82 145, 132 145, 160 140 C 170 136, 175 128, 172 118 C 168 104, 148 90, 118 82 C 95 76, 74 84, 65 98 C 59 110, 57 128, 60 140 Z',
    contactPoints: [[90, 68]],
    label: 'K（軟口蓋）',
  },
  R: {
    // 舌が後方に引かれ/巻き上げられる
    tonguePath:
      'M 60 140 C 80 145, 128 145, 155 140 C 168 136, 172 128, 168 118 C 162 105, 142 97, 118 96 C 95 95, 75 102, 64 118 C 58 128, 57 135, 60 140 Z',
    contactPoints: [],
    label: 'R（巻き or 奥引き）',
  },
};

export function TongueSVG({ tp, className = '' }: TongueSVGProps) {
  const shape = tongueShapes[tp];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 240 180"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[280px]"
        role="img"
        aria-label={`舌の位置: ${tp}`}
      >
        {/* 背景 */}
        <rect width="240" height="180" fill="#FFF8F0" rx="8" />

        {/* ===== 口腔の固定構造 ===== */}

        {/* 上あごの輪郭（硬口蓋〜軟口蓋） */}
        <path
          d="M 30 30 C 60 20, 100 15, 140 20 C 170 25, 195 40, 200 60 C 205 75, 200 85, 195 90"
          fill="none"
          stroke="#8B6F47"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 硬口蓋の内側（ライン） */}
        <path
          d="M 35 38 C 65 28, 105 22, 142 28 C 168 33, 188 46, 192 64"
          fill="none"
          stroke="#C4A882"
          strokeWidth="2"
        />

        {/* 歯（上） — 前方（右側） */}
        <rect x="190" y="40" width="14" height="28" rx="2" fill="#F5F0E8" stroke="#DDD" strokeWidth="1" />
        <rect x="190" y="41" width="14" height="8" rx="1" fill="#EEEAE0" />
        {/* 歯の縦線 */}
        <line x1="197" y1="40" x2="197" y2="68" stroke="#DDD" strokeWidth="0.5" />

        {/* 歯茎（上） */}
        <path
          d="M 188 40 C 175 35, 160 33, 145 36"
          fill="none"
          stroke="#E8A087"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 下あご */}
        <path
          d="M 30 150 C 60 160, 120 165, 170 158 C 190 153, 200 143, 200 130 C 200 118, 195 108, 192 100"
          fill="#FDDBB4"
          stroke="#D4956A"
          strokeWidth="2"
        />

        {/* 歯（下） */}
        <rect x="190" y="100" width="14" height="26" rx="2" fill="#F5F0E8" stroke="#DDD" strokeWidth="1" />
        <line x1="197" y1="100" x2="197" y2="126" stroke="#DDD" strokeWidth="0.5" />

        {/* 歯茎（下） */}
        <path
          d="M 188 126 C 175 131, 160 133, 145 130"
          fill="none"
          stroke="#E8A087"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* 軟口蓋のラベル領域 */}
        <text x="55" y="30" fontSize="10" fill="#888" fontFamily="sans-serif">
          軟口蓋
        </text>
        <text x="155" y="28" fontSize="10" fill="#888" fontFamily="sans-serif">
          歯茎
        </text>
        <text x="194" y="36" fontSize="10" fill="#888" fontFamily="sans-serif">
          歯
        </text>

        {/* ===== 舌（可変） ===== */}
        <path
          d={shape.tonguePath}
          fill="#E88080"
          stroke="#C05050"
          strokeWidth="1.5"
        />

        {/* 接触点（赤丸） */}
        {shape.contactPoints.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="7" fill="#FF3333" opacity="0.85" />
            <circle cx={cx} cy={cy} r="3" fill="white" />
          </g>
        ))}
      </svg>
      <span className="mt-2 text-sm font-medium text-gray-700">
        {shape.label}
      </span>
    </div>
  );
}
