import {
  Entity,
  EditorState,
  AtomicBlockUtils,
} from 'draft-js';

export default (editorState, data) => {
  const urlType = 'IMAGE';
  const entityKey = Entity.create(urlType, 'IMMUTABLE', data);

  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    ' '
  );

  // const { store } = this.props;
  // const getEditorState = store.getItem('getEditorState');
  // const setEditorState = store.getItem('setEditorState');
  // const editorState = getEditorState();
  console.warn('newEditorState', newEditorState.toJS());

  return EditorState.forceSelection(
    newEditorState,
    editorState.getCurrentContent().getSelectionAfter()
  );
};
