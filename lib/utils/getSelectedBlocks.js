"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getSelectedBlocks = exports.getSelectedBlocks = function getSelectedBlocks(contentState, anchorKey, focusKey) {
  var startingBlock = contentState.getBlockForKey(anchorKey);

  if (!startingBlock) {
    return [];
  }

  var selectedBlocks = [startingBlock];

  if (anchorKey !== focusKey) {
    var blockKey = anchorKey;

    while (blockKey !== focusKey) {
      var nextBlock = contentState.getBlockAfter(blockKey);

      if (!nextBlock) {
        selectedBlocks = [];
        break;
      }

      selectedBlocks.push(nextBlock);
      blockKey = nextBlock.getKey();
    }
  }

  return selectedBlocks;
};