/**
 * 英文テキストを単語トークンに分割する
 * 句読点・記号は除外し、純粋な単語のみ返す
 */

export interface Token {
  word: string;
  original: string; // 元のテキスト（大文字小文字そのまま）
}

/**
 * 英文を単語に分割する
 * - 句読点を除去
 * - 空行・空白を無視
 */
export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];

  // 空白で区切り、各チャンクから非アルファベット文字を除去
  const chunks = text.trim().split(/\s+/);

  for (const chunk of chunks) {
    if (!chunk) continue;

    // アポストロフィ（don't等）は保持しつつ、その他の記号を除去
    const cleaned = chunk
      .replace(/^[^a-zA-Z']+/, '') // 先頭の記号
      .replace(/[^a-zA-Z']+$/, '') // 末尾の記号
      .replace(/[^a-zA-Z']/g, ''); // 中間の記号

    if (cleaned.length > 0) {
      tokens.push({
        word: cleaned.toLowerCase(),
        original: cleaned,
      });
    }
  }

  return tokens;
}
