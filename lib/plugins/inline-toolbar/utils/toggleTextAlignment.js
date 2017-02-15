'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _constants = require('./constants');

var toggleTextAlignment = function toggleTextAlignment(editorState, alignment) {
  var contentState = editorState.getCurrentContent();
  var selectionState = editorState.getSelection();

  var startKey = selectionState.getStartKey();
  var currentBlock = contentState.getBlockForKey(startKey);
  var blockData = currentBlock.getData();

  var newBlockData = blockData.has(_constants.ALIGNMENT_KEY) && _constants.ALIGNMENT_LEFT === alignment ? blockData.delete(_constants.ALIGNMENT_KEY) : blockData.set(_constants.ALIGNMENT_KEY, alignment);

  return _draftJs.EditorState.push(editorState, _draftJs.Modifier.setBlockData(contentState, selectionState, newBlockData), 'change-block-data');
};

exports.default = toggleTextAlignment;