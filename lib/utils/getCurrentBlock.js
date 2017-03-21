"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Return the current focused block
 *
 * @param {EditorState} editorState
 *
 * @return {ContentBlock}
 */
var getCurrentBlock = exports.getCurrentBlock = function getCurrentBlock(editorState) {
  var content = editorState.getCurrentContent();
  var selection = editorState.getSelection();

  return content.getBlockForKey(selection.getStartKey());
};