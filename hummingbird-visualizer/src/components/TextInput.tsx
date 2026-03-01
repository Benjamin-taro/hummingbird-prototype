import { useState } from 'react';

interface TextInputProps {
  onConvert: (text: string) => void;
  isLoading: boolean;
}

const PRESETS = [
  'Nice to meet you.',
  'The quick brown fox jumps over the lazy dog.',
  'How are you doing today?',
  'I love learning English pronunciation.',
];

export function TextInput({ onConvert, isLoading }: TextInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) onConvert(text.trim());
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-base font-semibold text-gray-700 mb-3">
        英文を入力してください
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例: Nice to meet you."
          className="w-full rounded-xl border border-gray-200 p-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[80px]"
          aria-label="英文入力"
        />
        <div className="flex flex-wrap gap-2 mt-3 mb-3">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setText(preset);
                onConvert(preset);
              }}
              className="text-xs px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
        <button
          type="submit"
          disabled={!text.trim() || isLoading}
          className="w-full py-2.5 bg-indigo-500 text-white rounded-xl font-medium hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? '変換中…' : '音素に変換'}
        </button>
      </form>
    </div>
  );
}
