/**
 * Return the current focused block
 *
 * @param {EditorState} editorState
 *
 * @return {ContentBlock}
 */
export const getCurrentBlock = (editorState) => {
  const content = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  return content.getBlockForKey(selection.getStartKey());
}
