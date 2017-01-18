'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToggleBlockTypeButton = undefined;

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _lodash = require('lodash');

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _createStore = require('../../utils/createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _createToggleBlockTypeButton = require('./utils/createToggleBlockTypeButton');

var _createToggleBlockTypeButton2 = _interopRequireDefault(_createToggleBlockTypeButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var store = (0, _createStore2.default)();

  var closeToolbar = function closeToolbar() {
    store.updateItem('isOpen', false);
  };

  var _config$buttons = config.buttons;
  var buttons = _config$buttons === undefined ? [] : _config$buttons;


  var toolbarProps = {
    store: store,
    buttons: buttons.map(function (button) {
      return (0, _lodash.isFunction)(button) ? button({ closeToolbar: closeToolbar }) : button;
    })
  };

  return {
    initialize: function initialize(_ref) {
      var setEditorState = _ref.setEditorState;
      var getEditorState = _ref.getEditorState;
      var getEditorRef = _ref.getEditorRef;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
      store.updateItem('isOpen', false);
    },
    // Re-Render the toolbar on every change
    onChange: function onChange(editorState) {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    Component: (0, _decorateComponentWithProps2.default)(_Toolbar2.default, toolbarProps)
  };
};

exports.createToggleBlockTypeButton = _createToggleBlockTypeButton2.default;