/** Export user-authored BlockNote text without HTML or script execution. */
export function blocksToPlainText(blocks: readonly unknown[]): string {
  const lines: string[] = [];
  const visit = (unknownBlock: unknown, depth: number): void => {
    if (depth > 16 || !unknownBlock || typeof unknownBlock !== 'object') return;
    const block = unknownBlock as {content?: unknown; children?: unknown};
    if (Array.isArray(block.content)) {
      const text = block.content.map(item => {
        if (typeof item !== 'object' || item === null) return '';
        const node = item as {text?: unknown};
        return typeof node.text === 'string' ? node.text : '';
      }).join('');
      if (text.trim()) lines.push(text);
    }
    if (Array.isArray(block.children)) {
      for (const child of block.children.slice(0, 1000)) visit(child, depth + 1);
    }
  };
  for (const block of blocks.slice(0, 10000)) visit(block, 0);
  return lines.join('\n');
}
export function documentWordCount(text: string): number {
  const content = text.trim();
  return content ? content.split(/\s+/).length : 0;
}

/** Browser-safe export limit check using UTF-8 byte size, not JS string length. */
export function canExportText(text: string, maxBytes = 2 * 1024 * 1024): boolean {
  if (!Number.isSafeInteger(maxBytes) || maxBytes < 1) {
    throw new RangeError('maxBytes must be a positive integer');
  }
  return new TextEncoder().encode(text).byteLength <= maxBytes;
}
