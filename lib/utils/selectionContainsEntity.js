'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectionContainsEntity = undefined;

var _getSelectedBlocks = require('./getSelectedBlocks');

var _getEntitiesRange = require('./getEntitiesRange');

var selectionContainsEntity = exports.selectionContainsEntity = function selectionContainsEntity(strategy) {
  var getEntitiesRangeStrategy = (0, _getEntitiesRange.getEntitiesRange)(strategy);

  return function (editorState) {
    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    if (selectionState.isCollapsed()) {
      return false;
    }

    var startKey = selectionState.getStartKey();
    var endKey = selectionState.getEndKey();

    if (startKey === endKey) {
      var startOffset = selectionState.getStartOffset();
      var endOffset = selectionState.getEndOffset();

      var currentBlock = contentState.getBlockForKey(startKey);
      var entitiesRange = getEntitiesRangeStrategy(currentBlock, startOffset, endOffset);

      return entitiesRange.length > 0;
    }

    var selectedBlocks = (0, _getSelectedBlocks.getSelectedBlocks)(contentState, startKey, endKey);

    var hasEntities = selectedBlocks.some(function (contentBlock) {
      var currentKey = contentBlock.getKey();

      var startOffset = void 0;
      var endOffset = void 0;

      if (currentKey === startKey) {
        // selection start here
        startOffset = selectionState.getStartOffset();
        endOffset = contentBlock.getLength();
      } else if (currentKey === endKey) {
        // selection end here
        startOffset = 0;
        endOffset = selectionState.getEndOffset();
      } else {
        // full block overlap
        startOffset = 0;
        endOffset = contentBlock.getLength();
      }

      var entitiesRange = getEntitiesRangeStrategy(contentBlock, startOffset, endOffset);

      return entitiesRange.length > 0;
    });

    return hasEntities;
  };
};