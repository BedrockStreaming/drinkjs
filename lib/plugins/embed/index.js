'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _immutable = require('immutable');

var _isUrl = require('is-url');

var _isUrl2 = _interopRequireDefault(_isUrl);

var _utils = require('../../utils');

var _Card = require('./components/Card');

var _Card2 = _interopRequireDefault(_Card);

var _Html = require('./components/Html');

var _Html2 = _interopRequireDefault(_Html);

var _createSideToolbarButton2 = require('./utils/createSideToolbarButton');

var _createSideToolbarButton3 = _interopRequireDefault(_createSideToolbarButton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceBlockByEmbed = function replaceBlockByEmbed(editorState, block, data) {
  var selection = editorState.getSelection();
  var contentState = editorState.getCurrentContent();
  var blockMap = contentState.getBlockMap();

  // Split the blocks
  var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
    return v === block;
  });
  var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
    return v === block;
  }).rest();

  var embedBlock = new _draftJs.ContentBlock({
    key: (0, _draftJs.genKey)(),
    text: '',
    type: 'atomic',
    characterList: (0, _immutable.List)(),
    depth: 0
  });

  var entityKey = _draftJs.Entity.create('embed', 'IMMUTABLE', data);

  var newBlockMap = blocksBefore.concat([[embedBlock.getKey(), embedBlock]], blocksAfter).toOrderedMap();

  var newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection
  });

  newContentState = _draftJs.Modifier.replaceText(newContentState, _draftJs.SelectionState.createEmpty(embedBlock.getKey()), block.getText(), null, entityKey);

  return _draftJs.EditorState.push(editorState, newContentState, 'insert-fragment');
};

exports.default = function (options) {
  var getData = options.getData;


  return {
    onChange: function onChange(editorState, props) {
      var currentBlock = (0, _utils.getCurrentBlock)(editorState);
      var currentText = currentBlock.getText();
      var currentType = currentBlock.getType();

      if (currentText.length > 0 || currentType !== 'unstyled') {
        return editorState;
      }

      var content = editorState.getCurrentContent();
      var previousBlock = content.getBlockBefore(currentBlock.getKey());

      if (!previousBlock) {
        return editorState;
      }

      var previousText = previousBlock.getText();
      var previousType = previousBlock.getType();

      if (!(0, _isUrl2.default)(previousText) || previousType !== 'unstyled') {
        return editorState;
      }

      getData(previousText).then(function (data) {
        return props.setEditorState(replaceBlockByEmbed(props.getEditorState(), previousBlock, data));
      });

      return editorState;
    },
    blockRendererFn: function blockRendererFn(contentBlock) {
      if (contentBlock.getType() === 'atomic') {
        var entity = _draftJs.Entity.get(contentBlock.getEntityAt(0));
        var type = entity.getType();
        var data = entity.getData();

        if (type !== 'embed') {
          return null;
        }

        if (data.html) {
          return {
            component: _Html2.default,
            editable: false,
            props: { html: data.html }
          };
        }

        return {
          component: _Card2.default,
          editable: false,
          props: _extends({}, data)
        };
      }

      return null;
    },
    createSideToolbarButton: function createSideToolbarButton() {
      return (0, _createSideToolbarButton3.default)(options);
    }
  };
};