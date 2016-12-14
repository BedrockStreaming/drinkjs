import {
  genKey,
  ContentBlock,
  EditorState,
  RichUtils,
} from 'draft-js';
import { List } from 'immutable';

/**
 * Block Breakout Plugin
 *
 * @see: https://github.com/icelab/draft-js-block-breakout-plugin
 *
 * By default draft carries the current block type over to the next line when
 * you press return, which is an undesired behaviour for _some_ of the default
 * block types (headers mostly).
 *
 * This plugin adds behaviour to the editor to "break out" all block
 * types if the user presses `return` at the start or end of the block.
 *
 * @return {Object} Object defining the draft-js API methods
 */
export default function blockBreakoutPlugin() {
  return {
    handleReturn (e, { getEditorState, setEditorState }) {
      const editorState = getEditorState();
      const selection = editorState.getSelection();

      // Check if the selection is collapsed
      if (selection.isCollapsed()) {
        const contentState = editorState.getCurrentContent();
        const currentBlock = contentState.getBlockForKey(selection.getEndKey());
        const endOffset = selection.getEndOffset();
        const atEndOfBlock = (endOffset === currentBlock.getCharacterList().count());
        const atStartOfBlock = (endOffset === 0);

        // Check we’re at the start/end of the current block
        if (atEndOfBlock || atStartOfBlock) {
          const emptyBlockKey = genKey();
          const emptyBlock = new ContentBlock({
            key: emptyBlockKey,
            text: '',
            type: 'unstyled',
            characterList: List(),
            depth: 0,
          });
          const blockMap = contentState.getBlockMap();

          // Split the blocks
          const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
            return v === currentBlock
          });

          const blocksAfter = blockMap.toSeq().skipUntil(function (v) {
            return v === currentBlock
          }).rest();

          let augmentedBlocks;
          let focusKey;

          // Choose which order to apply the augmented blocks in depending
          // on whether we’re at the start or the end
          if (atEndOfBlock) {
            // Current first, empty block afterwards
            augmentedBlocks = [
              [currentBlock.getKey(), currentBlock],
              [emptyBlockKey, emptyBlock],
            ];

            focusKey = emptyBlockKey;
          } else {
            // Empty first, current block afterwards
            augmentedBlocks = [
              [emptyBlockKey, emptyBlock],
              [currentBlock.getKey(), currentBlock],
            ];

            focusKey = currentBlock.getKey();
          }

          // Join back together with the current + new block
          const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
          const newContentState = contentState.merge({
            blockMap: newBlocks,
            selectionBefore: selection,
            selectionAfter: selection.merge({
              anchorKey: focusKey,
              anchorOffset: 0,
              focusKey: focusKey,
              focusOffset: 0,
              isBackward: false
            })
          });

          const newEditorState = EditorState.push(editorState, newContentState, 'split-block');

          // get all active inline style
          const currentInlineStyles = editorState.getCurrentInlineStyle().toArray();

          // toggle style
          const nextEditorState = currentInlineStyles.reduce((editorState, style) => (
            RichUtils.toggleInlineStyle(editorState, style)
          ), newEditorState);

          // Set the state
          setEditorState(
            nextEditorState
          );

          return 'handled';
        }
      }

      return 'not-handled';
    },
  }
}
