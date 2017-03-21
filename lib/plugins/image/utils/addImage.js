'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _constants = require('./constants');

exports.default = function (editorState, data) {
  var newEditorState = void 0;

  newEditorState = _draftJs.RichUtils.toggleBlockType(editorState, _constants.BLOCK_IMAGE);

  // check applyEntity
  var newContentState = _draftJs.Modifier.setBlockData(newEditorState.getCurrentContent(), newEditorState.getSelection(), _extends({ textAlignment: 'center' }, data));

  newEditorState = _draftJs.EditorState.push(newEditorState, newContentState, 'change-block-data');

  return _draftJs.EditorState.forceSelection(newEditorState, editorState.getSelection());
};