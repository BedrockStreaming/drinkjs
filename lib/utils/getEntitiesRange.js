"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getEntitiesRange = exports.getEntitiesRange = function getEntitiesRange(strategy) {
  return function (contentBlock, startOffset, endOffset) {
    var ranges = [];

    strategy(contentBlock, function (start, end) {
      if (endOffset > start && startOffset < end) {
        ranges.push({
          start: start,
          end: end
        });
      }
    });

    return ranges;
  };
};