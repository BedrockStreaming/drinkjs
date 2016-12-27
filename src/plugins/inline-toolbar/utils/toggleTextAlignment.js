import { EditorState, Modifier } from 'draft-js';
import { ALIGNMENT_KEY, ALIGNMENT_LEFT } from './constants';

const toggleTextAlignment = (editorState, alignment) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const startKey = selectionState.getStartKey();
  const currentBlock = contentState.getBlockForKey(startKey);
  const blockData  = currentBlock.getData();

  const newBlockData = blockData.has(ALIGNMENT_KEY) && ALIGNMENT_LEFT === alignment
    ? blockData.delete(ALIGNMENT_KEY)
    : blockData.set(ALIGNMENT_KEY, alignment)
  ;

  return EditorState.push(
    editorState,
    Modifier.setBlockData(contentState, selectionState, newBlockData),
    'change-block-data'
  );
}

export default toggleTextAlignment;
