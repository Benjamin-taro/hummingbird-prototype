import { useState, useCallback, useEffect, useMemo } from 'react';
import { TextInput } from './components/TextInput';
import { PhonemeDisplay } from './components/PhonemeDisplay';
import { PhonemeTimeline } from './components/PhonemeTimeline';
import { InfoPanel } from './components/InfoPanel';
import { convertTextToPhonemes, preloadCmudict } from './lib/cmudictLookup';
import type { WordPhonemes, PhonemeInfo } from './types';

export default function App() {
  const [words, setWords] = useState<WordPhonemes[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // cmudict をアプリ起動時にバックグラウンドでプリロード
  useEffect(() => {
    preloadCmudict();
  }, []);

  // 全音素のフラットリスト
  const allPhonemes = useMemo<PhonemeInfo[]>(
    () => words.flatMap((w) => w.phonemes),
    [words]
  );

  const selectedPhoneme = allPhonemes[selectedIndex] ?? null;

  const handleConvert = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await convertTextToPhonemes(text);
      setWords(result);
      setSelectedIndex(0);
    } catch (e) {
      setError('変換中にエラーが発生しました。しばらくしてから再度お試しください。');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) => Math.min(allPhonemes.length - 1, i + 1));
  }, [allPhonemes.length]);

  // キーボードナビゲーション
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handlePrev, handleNext]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label="ハミングバード">
            🐦
          </span>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Hummingbird 発音ビジュアライザー
            </h1>
            <p className="text-xs text-gray-500">
              英文を入力して音素ごとの口・舌の形を確認しよう
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {/* 入力エリア */}
        <TextInput onConvert={handleConvert} isLoading={isLoading} />

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* 変換結果 */}
        {words.length > 0 && (
          <>
            {/* 音素マップ表示 */}
            <PhonemeDisplay
              words={words}
              selectedIndex={selectedIndex}
              onPhonemeClick={setSelectedIndex}
            />

            {/* 情報パネル（SVG込み） */}
            <InfoPanel phoneme={selectedPhoneme} />

            {/* タイムラインナビゲーション */}
            <PhonemeTimeline
              phonemes={allPhonemes}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              onPrev={handlePrev}
              onNext={handleNext}
            />

            {/* キーボードショートカットヒント */}
            <p className="text-center text-xs text-gray-400">
              ← → キーで音素を移動できます
            </p>
          </>
        )}

        {/* 初期画面の説明 */}
        {words.length === 0 && !isLoading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-500">
            <div className="text-5xl mb-4">🐦</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              使い方
            </h2>
            <ol className="text-sm text-left max-w-xs mx-auto space-y-2 list-decimal list-inside">
              <li>上の入力欄に英文を入力</li>
              <li>「音素に変換」ボタンを押す</li>
              <li>音素タイルをクリックして口・舌の形を確認</li>
              <li>◀ ▶ ボタンまたは矢印キーで順番に確認</li>
            </ol>
            <div className="mt-4 p-3 bg-amber-50 rounded-xl text-xs text-amber-700 text-left">
              <span className="font-semibold">注意：</span>
              マッピングはハミングバードメソッドの音声学的知見に基づきますが、
              一部は推定を含みます（「推定」バッジで表示）。
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
