import { Entity, EditorState, RichUtils, Modifier } from 'draft-js';
import { PRODUCT_RATING, PRODUCT_RATING_MUTABILITY } from '../utils/constants';
import { insertBlock } from '../../../utils/insertBlock';

export default (getEditorState, productRating) => {
  const editorState = getEditorState();

  let newEditorState;

  // Change block type
  newEditorState = RichUtils.toggleBlockType(
    editorState,
    'atomic'
  );

  //const newContentStateWithEmptyData = Modifier.setBlockData(
  //  newEditorState.getCurrentContent(),
  //  newEditorState.getSelection(),
  //  null
  //);
  //
  //newEditorState = EditorState.push(
  //  newEditorState,
  //  newContentStateWithEmptyData,
  //  'insert-characters'
  //);

  // Apply entity
  const entityKey = Entity.create(PRODUCT_RATING, PRODUCT_RATING_MUTABILITY, productRating);

  const newContentState = Modifier.insertText(
    newEditorState.getCurrentContent(),
    newEditorState.getSelection(),
    ' ',
    null,
    entityKey
  );

  newEditorState = EditorState.push(
    newEditorState,
    newContentState,
    'insert-characters'
  );

  newEditorState = insertBlock(newEditorState);

  return EditorState.forceSelection(
    newEditorState,
    newEditorState.getSelection()
  )
};
