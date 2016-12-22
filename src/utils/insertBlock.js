import { EditorState, Modifier, BlockMapBuilder, ContentBlock, genKey } from 'draft-js';
import { List } from 'immutable';

/**
 * Insert an empty block after current focused block
 *
 * @param {EditorState} editorState
 *
 * @return {EditorState}
 */
export const insertBlock = (editorState) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    'backward'
  );

  const targetSelection = afterRemoval.getSelectionAfter();
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
  const insertionTarget = afterSplit.getSelectionAfter();

  const asEmptyBlock = Modifier.setBlockType(
    afterSplit,
    insertionTarget,
    'unstyled'
  );

  const fragmentArray = [
    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List(),
    }),
  ];

  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  const withEmptyBlock = Modifier.replaceWithFragment(
    asEmptyBlock,
    insertionTarget,
    fragment
  );

  const newContent = withEmptyBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withEmptyBlock.getSelectionAfter().set('hasFocus', true),
  });

  return EditorState.push(editorState, newContent, 'insert-fragment');
}
