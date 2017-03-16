'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createStore = require('../../utils/createStore');

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _TooltipContainer = require('./components/TooltipContainer');

var _TooltipContainer2 = _interopRequireDefault(_TooltipContainer);

var _tooltipEnhancer = require('./utils/tooltipEnhancer');

var _tooltipEnhancer2 = _interopRequireDefault(_tooltipEnhancer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTooltipPlugin = function createTooltipPlugin() {
  var store = (0, _createStore.createStore)({
    data: null
  });

  var renderers = {};

  var getRenderers = function getRenderers() {
    return renderers;
  };

  var props = {
    store: store,
    getRenderers: getRenderers
  };

  // define a tooltip enhancer who wrap en element with enter/leave functionnality
  var tooltipEnhancer = function tooltipEnhancer(ComponentToWrap) {
    return (0, _decorateComponentWithProps2.default)((0, _tooltipEnhancer2.default)(ComponentToWrap), {
      store: store
    });
  };

  return {
    setRenderers: function setRenderers() {
      var customRenderers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      renderers = customRenderers;
    },
    Component: (0, _decorateComponentWithProps2.default)(_TooltipContainer2.default, props),
    tooltipEnhancer: tooltipEnhancer
  };
};

exports.default = createTooltipPlugin;