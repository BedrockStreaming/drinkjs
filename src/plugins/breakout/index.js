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

  function getEmptyBlockAndStrategy({ type, text, depth }) {
    let emptyBlockType = 'unstyled';
    let emptyBlockDepth = depth;
    let strategy = 'add';

    switch (type) {
      case 'ordered-list-item':
      case 'unordered-list-item':
        if (!text.length) {
          strategy = 'replace';

          if (!text.length && depth > 0) {
            emptyBlockType = type;
            emptyBlockDepth = depth - 1;
          }
        } else {
          emptyBlockType = type;
        }
        break;

      default:
        break;
    }

    const emptyBlock = new ContentBlock({
      key: genKey(),
      text: '',
      type: emptyBlockType,
      characterList: List(),
      depth: emptyBlockDepth,
    });

    return {
      emptyBlock,
      strategy,
    };
  }

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
          const { emptyBlock, strategy } = getEmptyBlockAndStrategy(currentBlock);
          const blockMap = contentState.getBlockMap();

          // Split the blocks
          const blocksBefore = blockMap.toSeq().takeUntil(v => (v === currentBlock));
          const blocksAfter = blockMap.toSeq().skipUntil(v => (v === currentBlock)).rest();

          let augmentedBlocks = [];
          let focusKey;

          // Choose which order to apply the augmented blocks in depending
          // on whether we’re at the start or the end
          if (atEndOfBlock) {
            if (strategy === 'add') {
              augmentedBlocks.push([currentBlock.getKey(), currentBlock]);
            }

            augmentedBlocks.push([emptyBlock.getKey(), emptyBlock]);
            focusKey = emptyBlock.getKey();
          } else {
            // Empty first, current block afterwards
            augmentedBlocks.push(
              [emptyBlock.getKey(), emptyBlock],
              [currentBlock.getKey(), currentBlock],
            );

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
