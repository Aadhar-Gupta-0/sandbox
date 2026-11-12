import test from 'node:test';
import assert from 'node:assert/strict';
import {blocksToPlainText,documentWordCount} from './documentTools.ts';

test('extracts visible rich-text paragraphs without running content',()=>{
  const blocks=[{content:[{text:'Hello '},{text:'world'}],children:[]}];
  assert.equal(blocksToPlainText(blocks),'Hello world');
  assert.equal(documentWordCount(blocksToPlainText(blocks)),2);
});
test('preserves nested block text and ignores unsupported content',()=>{
  const blocks=[{content:[{text:'Parent'}],children:[{content:[{text:'Child'}],children:[]}]}];
  assert.equal(blocksToPlainText(blocks),'Parent\nChild');
  assert.equal(blocksToPlainText([{content:'<script>alert(1)</script>'}]),'');
});
test('handles empty inputs',()=>{
  assert.equal(blocksToPlainText([]),'');
  assert.equal(documentWordCount('   '),0);
});
