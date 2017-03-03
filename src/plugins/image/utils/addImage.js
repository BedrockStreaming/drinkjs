import { EditorState, Modifier, RichUtils } from 'draft-js';
import { BLOCK_IMAGE } from './constants';

export default (editorState, data) => {
  let newEditorState;

  newEditorState = RichUtils.toggleBlockType(
    editorState,
    BLOCK_IMAGE
  );

  // check applyEntity
  const newContentState = Modifier.setBlockData(
    newEditorState.getCurrentContent(),
    newEditorState.getSelection(),
    { textAlignment: 'center', ...data }
  );

  newEditorState = EditorState.push(
    newEditorState,
    newContentState,
    'change-block-data'
  );

  return EditorState.forceSelection(
    newEditorState,
    editorState.getSelection()
  );
};
