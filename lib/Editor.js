'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftJs2 = _interopRequireDefault(_draftJs);

var _draftJsPluginsEditor = require('draft-js-plugins-editor');

var _draftJsPluginsEditor2 = _interopRequireDefault(_draftJsPluginsEditor);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

require('draft-js/dist/Draft.css');

require('./Draft.css');

var _Editor = require('./Editor.css');

var _Editor2 = _interopRequireDefault(_Editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blockRenderMap = _immutable2.default.Map({
  'paragraph': {
    element: 'paragraph'
  },
  'unstyled': {
    element: 'paragraph'
  },
  'atomic:image': {
    element: 'figure'
  }
});

var extendedBlockRenderMap = _draftJs2.default.DefaultDraftBlockRenderMap.merge(blockRenderMap);

var basePlugin = {
  handleKeyCommand: function handleKeyCommand(command, props) {
    var newState = _draftJs.RichUtils.handleKeyCommand(props.getEditorState(), command);

    if (newState) {
      props.setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  },
  onTab: function onTab(event, props) {
    var maxDepth = 4;

    props.setEditorState(_draftJs.RichUtils.onTab(event, props.getEditorState(), maxDepth));
  }
};

var DrinkEditor = function (_Component) {
  _inherits(DrinkEditor, _Component);

  function DrinkEditor(props) {
    _classCallCheck(this, DrinkEditor);

    var _this = _possibleConstructorReturn(this, (DrinkEditor.__proto__ || Object.getPrototypeOf(DrinkEditor)).call(this, props));

    _this.getContent = function () {
      return (0, _draftJs.convertToRaw)(_this.state.editorState.getCurrentContent());
    };

    var state = props.state;
    var onChange = props.onChange;


    _this.state = {
      editorState: state ? _draftJs.EditorState.push(_draftJs.EditorState.createEmpty(), (0, _draftJs.convertFromRaw)(state)) : _draftJs.EditorState.createEmpty()
    };

    _this.onChange = function (editorState) {
      onChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      _this.setState({ editorState: editorState });
    };

    _this.onTab = function (e) {
      var maxDepth = 4;
      _this.onChange(_draftJs.RichUtils.onTab(e, _this.state.editorState, maxDepth));
    };

    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    return _this;
  }

  _createClass(DrinkEditor, [{
    key: 'renderPlugins',
    value: function renderPlugins() {
      var plugins = this.props.plugins;


      return plugins.reduce(function (prev, curr) {
        curr.InlineToolbar && prev.push(_react2.default.createElement(curr.InlineToolbar, {
          key: 'inline-toolbar'
        }));

        curr.SideToolbar && prev.push(_react2.default.createElement(curr.SideToolbar, {
          key: 'side-toolbar'
        }));

        return prev;
      }, []);
    }
  }, {
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      var _this2 = this;

      var editorState = this.state.editorState;


      if (command === 'delete') {
        var _ret = function () {

          var contentState = editorState.getCurrentContent();
          var selectionState = editorState.getSelection();
          var blockMap = contentState.getBlockMap();
          var startKey = selectionState.getStartKey();
          var endKey = selectionState.getEndKey();
          var startOffset = selectionState.getStartOffset();
          var endOffset = selectionState.getEndOffset();
          var startBlock = blockMap.get(startKey);
          var endBlock = blockMap.get(endKey);
          var mergedBlocks = [];

          // change the way to delete blocks if startblock is empty or if last block is not fully deleted
          if (startOffset === 0) {

            var blocksBefore = blockMap.toSeq().takeUntil(function (_, v) {
              return v === startKey;
            });
            var blocksAfter = blockMap.toSeq().skipUntil(function (_, v) {
              return v === endKey;
            }).rest();

            // get focus key (would be the block just after the last deleted one)
            var focusKey = editorState.getCurrentContent().getKeyAfter(endKey);

            // if part of lastblock must be kept, create a new block with remaining text
            if (endOffset < endBlock.getLength()) {
              var modifiedEndBlock = endBlock.merge({
                text: endBlock.getText().slice(endOffset),
                type: endBlock.getType()
              });

              mergedBlocks.push([modifiedEndBlock.getKey(), modifiedEndBlock]);
              focusKey = modifiedEndBlock.getKey();
            }

            var newBlocks = blocksBefore.concat(mergedBlocks, blocksAfter).toOrderedMap();

            var newContentState = contentState.merge({
              blockMap: newBlocks,
              selectionBefore: selectionState,
              selectionAfter: selectionState.merge({
                anchorKey: focusKey,
                anchorOffset: 0,
                focusKey: focusKey,
                focusOffset: 0,
                isBackward: false
              })
            });

            var newEditorState = _draftJs.EditorState.push(editorState, newContentState);

            if (newEditorState) {
              _this2.onChange(newEditorState);
              return {
                v: 'handled'
              };
            }
          }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      return 'not-handled';
    }
  }, {
    key: 'renderPlugins',
    value: function renderPlugins() {
      var plugins = this.props.plugins;


      return plugins.reduce(function (prev, curr, index) {
        curr.Component && prev.push(_react2.default.createElement(curr.Component, {
          key: index
        }));

        return prev;
      }, []);
    }
  }, {
    key: 'render',
    value: function render() {
      var editorState = this.state.editorState;
      var _props = this.props;
      var plugins = _props.plugins;
      var readOnly = _props.readOnly;


      return _react2.default.createElement(
        'div',
        { className: _Editor2.default.editor },
        _react2.default.createElement(_draftJsPluginsEditor2.default, {
          editorState: editorState,
          onChange: this.onChange,
          placeholder: 'Write something...',
          blockRenderMap: extendedBlockRenderMap,
          readOnly: readOnly,
          handleKeyCommand: this.handleKeyCommand,
          plugins: [basePlugin].concat(_toConsumableArray(plugins))
        }),
        this.renderPlugins()
      );
    }
  }]);

  return DrinkEditor;
}(_react.Component);

DrinkEditor.propTypes = {
  state: _react.PropTypes.object,
  readOnly: _react.PropTypes.bool,
  onChange: _react.PropTypes.func,
  plugins: _react.PropTypes.array
};
DrinkEditor.defaultProps = {
  onChange: function onChange() {},
  readOnly: false,
  plugins: []
};
exports.default = DrinkEditor;