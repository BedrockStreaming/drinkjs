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

var _createSideToolbarButton2 = require('./utils/createSideToolbarButton');

var _createSideToolbarButton3 = _interopRequireDefault(_createSideToolbarButton2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createImagePlugin = function createImagePlugin(options) {
  return {
    blockRendererFn: function blockRendererFn(contentBlock) {
      if (_constants.BLOCK_IMAGE === contentBlock.getType()) {
        return {
          component: _Image2.default
        };
      }
    },
    createSideToolbarButton: function createSideToolbarButton() {
      return (0, _createSideToolbarButton3.default)(options);
    }
  };
};

exports.default = createImagePlugin;
exports.addImage = _addImage2.default;