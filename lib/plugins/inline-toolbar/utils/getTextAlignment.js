'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var getTextAlignment = function getTextAlignment(contentBlock) {
  var data = contentBlock.getData();

  if (data.has(_constants.ALIGNMENT_KEY)) {
    return data.get(_constants.ALIGNMENT_KEY);
  }

  return _constants.ALIGNMENT_LEFT;
};

exports.default = getTextAlignment;