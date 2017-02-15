'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addImage = undefined;

var _Image = require('./components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _constants = require('./utils/constants');

var _addImage = require('./utils/addImage');

var _addImage2 = _interopRequireDefault(_addImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createImagePlugin = function createImagePlugin() {
  return {
    blockRendererFn: function blockRendererFn(contentBlock) {
      if (_constants.BLOCK_IMAGE === contentBlock.getType()) {
        return {
          component: _Image2.default
        };
      }
    }
  };
};

exports.default = createImagePlugin;
exports.addImage = _addImage2.default;