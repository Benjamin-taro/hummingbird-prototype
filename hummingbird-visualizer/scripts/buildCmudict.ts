/**
 * CMU Pronouncing Dictionary を JSON に変換するビルドスクリプト
 * Usage: npx tsx scripts/buildCmudict.ts
 *
 * ソース: https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildCmudict() {
  console.log('Fetching CMU Pronouncing Dictionary...');

  const url =
    'https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch cmudict: ${res.status}`);
  const text = await res.text();

  console.log('Parsing...');

  // Object.create(null) で "constructor" 等のプロトタイプキー衝突を回避
  const dict: Record<string, string[][]> = Object.create(null);

  for (const line of text.split('\n')) {
    // コメント行をスキップ
    if (line.startsWith(';;;') || !line.trim()) continue;

    const [wordRaw, ...phones] = line.trim().split(/\s+/);
    if (!wordRaw || phones.length === 0) continue;

    // "(2)", "(3)" など発音バリアントのサフィックスを除去
    const word = wordRaw.replace(/\(\d+\)$/, '').toLowerCase();

    if (!dict[word]) {
      dict[word] = [];
    }
    dict[word].push(phones);
  }

  const outPath = join(__dirname, '../public/cmudict.json');
  writeFileSync(outPath, JSON.stringify(dict), 'utf-8');
  console.log(
    `Done! ${Object.keys(dict).length} entries written to public/cmudict.json`
  );
}

buildCmudict().catch(console.error);
