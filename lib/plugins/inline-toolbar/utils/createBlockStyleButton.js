'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var _class, _temp2;

  var blockType = _ref.blockType;
  var children = _ref.children;
  return _temp2 = _class = function (_Component) {
    _inherits(BlockStyleButton, _Component);

    function BlockStyleButton() {
      var _ref2;

      var _temp, _this, _ret;

      _classCallCheck(this, BlockStyleButton);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = BlockStyleButton.__proto__ || Object.getPrototypeOf(BlockStyleButton)).call.apply(_ref2, [this].concat(args))), _this), _this.toggleStyle = function (event) {
        event.preventDefault();

        var store = _this.props.store;

        var getEditorState = store.getItem('getEditorState');
        var setEditorState = store.getItem('setEditorState');
        var editorState = getEditorState();

        var newEditorState = _draftJs.RichUtils.toggleBlockType(editorState, blockType);

        // reset block data
        var newContentState = _draftJs.Modifier.setBlockData(newEditorState.getCurrentContent(), newEditorState.getSelection(), (0, _immutable.Map)());

        var nextEditorState = _draftJs.EditorState.push(newEditorState, newContentState, 'change-block-data');

        setEditorState(nextEditorState);
      }, _this.preventBubblingUp = function (event) {
        event.preventDefault();
      }, _this.blockTypeIsActive = function () {
        var store = _this.props.store;

        var getEditorState = store.getItem('getEditorState');
        var editorState = getEditorState();

        var type = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();

        return type === blockType;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BlockStyleButton, [{
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        var className = this.blockTypeIsActive() ? theme.button + ' ' + theme.active : theme.button;
        return _react2.default.createElement('button', {
          className: className,
          onClick: this.toggleStyle,
          type: 'button',
          children: children,
          onMouseDown: this.preventBubblingUp
        });
      }
    }]);

    return BlockStyleButton;
  }(_react.Component), _class.propTypes = {
    store: _react2.default.PropTypes.object.isRequired,
    theme: _react2.default.PropTypes.object.isRequired
  }, _temp2;
};