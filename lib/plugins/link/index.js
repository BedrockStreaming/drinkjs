'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINK_MUTABILITY = exports.LINK = exports.FormLink = undefined;

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _createStore = require('../../utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _Link = require('./components/Link');

var _Link2 = _interopRequireDefault(_Link);

var _FormLink = require('./components/FormLink');

var _FormLink2 = _interopRequireDefault(_FormLink);

var _TooltipLink = require('./components/TooltipLink');

var _TooltipLink2 = _interopRequireDefault(_TooltipLink);

var _constants = require('./utils/constants');

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createLinkPlugin = function createLinkPlugin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var enhancer = _ref.enhancer;

  var store = (0, _createStore2.default)({
    getEditorState: null,
    setEditorState: null
  });

  var Component = 'function' === typeof enhancer ? enhancer(_Link2.default) : _Link2.default;

  var TooltipLink = (0, _decorateComponentWithProps2.default)(_TooltipLink2.default, { store: store });

  return {
    initialize: function initialize(_ref2) {
      var getEditorState = _ref2.getEditorState;
      var setEditorState = _ref2.setEditorState;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    decorators: [{
      strategy: (0, _utils.entityStrategy)(_constants.LINK),
      component: Component
    }],
    TooltipLink: TooltipLink
  };
};

exports.default = createLinkPlugin;
exports.FormLink = _FormLink2.default;
exports.LINK = _constants.LINK;
exports.LINK_MUTABILITY = _constants.LINK_MUTABILITY;