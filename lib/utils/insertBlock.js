'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertBlock = undefined;

var _draftJs = require('draft-js');

var _immutable = require('immutable');

/**
 * Insert an empty block after current focused block
 *
 * @param {EditorState} editorState
 *
 * @return {EditorState}
 */
var insertBlock = exports.insertBlock = function insertBlock(editorState) {
  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();

  var afterRemoval = _draftJs.Modifier.removeRange(contentState, selectionState, 'backward');

  var targetSelection = afterRemoval.getSelectionAfter();
  var afterSplit = _draftJs.Modifier.splitBlock(afterRemoval, targetSelection);
  var insertionTarget = afterSplit.getSelectionAfter();

  var asEmptyBlock = _draftJs.Modifier.setBlockType(afterSplit, insertionTarget, 'unstyled');

  var fragmentArray = [new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    type: 'unstyled',
    text: '',
    characterList: (0, _immutable.List)()
  })];

  var fragment = _draftJs.BlockMapBuilder.createFromArray(fragmentArray);

  var withEmptyBlock = _draftJs.Modifier.replaceWithFragment(asEmptyBlock, insertionTarget, fragment);

  var newContent = withEmptyBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withEmptyBlock.getSelectionAfter().set('hasFocus', true)
  });

  return _draftJs.EditorState.push(editorState, newContent, 'insert-fragment');
};