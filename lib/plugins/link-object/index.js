'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINK_OBJECT_MUTABILITY = exports.LINK_OBJECT = undefined;

var _LinkObject = require('./components/LinkObject');

var _LinkObject2 = _interopRequireDefault(_LinkObject);

var _TooltipLinkObject = require('./components/TooltipLinkObject');

var _TooltipLinkObject2 = _interopRequireDefault(_TooltipLinkObject);

var _constants = require('./utils/constants');

var _entityStrategy = require('../../utils/entityStrategy');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLinkObjectPlugin = function createLinkObjectPlugin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var enhancer = _ref.enhancer;

  var Component = 'function' === typeof enhancer ? enhancer(_LinkObject2.default) : _LinkObject2.default;

  return {
    decorators: [{
      strategy: (0, _entityStrategy.entityStrategy)(_constants.LINK_OBJECT),
      component: Component
    }],
    TooltipLinkObject: _TooltipLinkObject2.default
  };
};

exports.default = createLinkObjectPlugin;
exports.LINK_OBJECT = _constants.LINK_OBJECT;
exports.LINK_OBJECT_MUTABILITY = _constants.LINK_OBJECT_MUTABILITY;