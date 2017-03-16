'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = blockBreakoutPlugin;

var _draftJs = require('draft-js');

var _immutable = require('immutable');

/**
 * Block Breakout Plugin
 *
 * @see: https://github.com/icelab/draft-js-block-breakout-plugin
 *
 * By default draft carries the current block type over to the next line when
 * you press return, which is an undesired behaviour for _some_ of the default
 * block types (headers mostly).
 *
 * This plugin adds behaviour to the editor to "break out" all block
 * types if the user presses `return` at the start or end of the block.
 *
 * @return {Object} Object defining the draft-js API methods
 */
function blockBreakoutPlugin() {

  function getEmptyBlockAndStrategy(_ref) {
    var type = _ref.type;
    var text = _ref.text;
    var depth = _ref.depth;
    var data = _ref.data;

    var emptyBlockType = 'unstyled';
    var emptyBlockDepth = depth;
    var strategy = 'add';

    switch (type) {
      case 'ordered-list-item':
      case 'unordered-list-item':
        if (!text.length) {
          strategy = 'replace';

          if (!text.length && depth > 0) {
            emptyBlockType = type;
            emptyBlockDepth = depth - 1;
          }
        } else {
          emptyBlockType = type;
        }
        break;

      default:
        break;
    }

    var emptyBlock = new _draftJs.ContentBlock({
      key: (0, _draftJs.genKey)(),
      text: '',
      type: emptyBlockType,
      characterList: (0, _immutable.List)(),
      depth: emptyBlockDepth,
      data: data
    });

    return {
      emptyBlock: emptyBlock,
      strategy: strategy
    };
  }

  return {
    handleReturn: function handleReturn(e, _ref2) {
      var getEditorState = _ref2.getEditorState;
      var setEditorState = _ref2.setEditorState;

      var editorState = getEditorState();
      var selection = editorState.getSelection();

      // Check if the selection is collapsed
      if (selection.isCollapsed()) {
        var _ret = function () {
          var contentState = editorState.getCurrentContent();
          var currentBlock = contentState.getBlockForKey(selection.getEndKey());
          var endOffset = selection.getEndOffset();
          var atEndOfBlock = endOffset === currentBlock.getCharacterList().count();
          var atStartOfBlock = endOffset === 0;

          // Check we’re at the start/end of the current block
          if (atEndOfBlock || atStartOfBlock) {
            var _getEmptyBlockAndStra = getEmptyBlockAndStrategy(currentBlock);

            var emptyBlock = _getEmptyBlockAndStra.emptyBlock;
            var strategy = _getEmptyBlockAndStra.strategy;

            var blockMap = contentState.getBlockMap();

            // Split the blocks
            var blocksBefore = blockMap.toSeq().takeUntil(function (v) {
              return v === currentBlock;
            });
            var blocksAfter = blockMap.toSeq().skipUntil(function (v) {
              return v === currentBlock;
            }).rest();

            var augmentedBlocks = [];
            var focusKey = void 0;

            // Choose which order to apply the augmented blocks in depending
            // on whether we’re at the start or the end
            if (atEndOfBlock) {
              if (strategy === 'add') {
                augmentedBlocks.push([currentBlock.getKey(), currentBlock]);
              }

              augmentedBlocks.push([emptyBlock.getKey(), emptyBlock]);
              focusKey = emptyBlock.getKey();
            } else {
              // Empty first, current block afterwards
              augmentedBlocks.push([emptyBlock.getKey(), emptyBlock], [currentBlock.getKey(), currentBlock]);

              focusKey = currentBlock.getKey();
            }

            // Join back together with the current + new block
            var newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
            var newContentState = contentState.merge({
              blockMap: newBlocks,
              selectionBefore: selection,
              selectionAfter: selection.merge({
                anchorKey: focusKey,
                anchorOffset: 0,
                focusKey: focusKey,
                focusOffset: 0,
                isBackward: false
              })
            });

            var newEditorState = _draftJs.EditorState.push(editorState, newContentState, 'split-block');

            // get all active inline style
            var currentInlineStyles = editorState.getCurrentInlineStyle().toArray();

            // toggle style
            var nextEditorState = currentInlineStyles.reduce(function (editorState, style) {
              return _draftJs.RichUtils.toggleInlineStyle(editorState, style);
            }, newEditorState);

            // Set the state
            setEditorState(nextEditorState);

            return {
              v: 'handled'
            };
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      return 'not-handled';
    }
  };
}