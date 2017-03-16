'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createEntityButton = exports.createTextAlignmentButton = exports.createBlockAlignmentButton = exports.createBlockStyleButton = exports.createInlineStyleButton = exports.Separator = undefined;

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _createStore = require('../../utils/createStore');

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Separator = require('./components/Separator');

var _Separator2 = _interopRequireDefault(_Separator);

var _createInlineStyleButton = require('./utils/createInlineStyleButton');

var _createInlineStyleButton2 = _interopRequireDefault(_createInlineStyleButton);

var _createBlockStyleButton = require('./utils/createBlockStyleButton');

var _createBlockStyleButton2 = _interopRequireDefault(_createBlockStyleButton);

var _createBlockAlignmentButton = require('./utils/createBlockAlignmentButton');

var _createBlockAlignmentButton2 = _interopRequireDefault(_createBlockAlignmentButton);

var _createTextAlignmentButton = require('./utils/createTextAlignmentButton');

var _createTextAlignmentButton2 = _interopRequireDefault(_createTextAlignmentButton);

var _createEntityButton = require('./utils/createEntityButton');

var _createEntityButton2 = _interopRequireDefault(_createEntityButton);

var _getTextAlignment = require('./utils/getTextAlignment');

var _getTextAlignment2 = _interopRequireDefault(_getTextAlignment);

var _textAlignment = require('./textAlignment.css');

var _textAlignment2 = _interopRequireDefault(_textAlignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var previousSelection = null;

var createInlineToolbarPlugin = function createInlineToolbarPlugin() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref$buttons = _ref.buttons;
  var buttons = _ref$buttons === undefined ? [] : _ref$buttons;
  var _ref$renderers = _ref.renderers;
  var renderers = _ref$renderers === undefined ? {} : _ref$renderers;

  var store = (0, _createStore.createStore)({
    getEditorState: null,
    setEditorState: null,
    isVisible: false,
    entityType: null
  });

  var props = {
    store: store,
    buttons: buttons,
    renderers: renderers
  };

  return {
    initialize: function initialize(_ref2) {
      var getEditorState = _ref2.getEditorState;
      var setEditorState = _ref2.setEditorState;

      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render toolbar on selection change
    onChange: function onChange(editorState) {
      var selection = editorState.getSelection();
      var selectionHasFocus = selection.getHasFocus();
      var entityType = store.getItem('entityType');

      if (entityType) {
        if (!previousSelection.getHasFocus() && selectionHasFocus) {
          store.updateItem('entityType', null);
        } else if (selection.isCollapsed()) {
          store.updateItem('isVisible', false);
          store.updateItem('entityType', null);
        }
      } else if (selectionHasFocus && !selection.isCollapsed()) {
        store.updateItem('isVisible', true);
      } else {
        store.updateItem('isVisible', false);
      }

      previousSelection = selection;

      return editorState;
    },
    blockStyleFn: function blockStyleFn(contentBlock) {
      var alignment = (0, _getTextAlignment2.default)(contentBlock);

      if (alignment) {
        return _textAlignment2.default[alignment];
      }
    },
    Component: (0, _decorateComponentWithProps2.default)(_Toolbar2.default, props)
  };
};

exports.default = createInlineToolbarPlugin;
exports.Separator = _Separator2.default;
exports.createInlineStyleButton = _createInlineStyleButton2.default;
exports.createBlockStyleButton = _createBlockStyleButton2.default;
exports.createBlockAlignmentButton = _createBlockAlignmentButton2.default;
exports.createTextAlignmentButton = _createTextAlignmentButton2.default;
exports.createEntityButton = _createEntityButton2.default;