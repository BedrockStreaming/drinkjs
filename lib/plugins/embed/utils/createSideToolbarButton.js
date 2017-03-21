'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Button = require('../../../plugins/side-toolbar/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var onAddEmbed = _ref.onAddEmbed;
  var getData = _ref.getData;
  return function (_ref2) {
    var closeToolbar = _ref2.closeToolbar;
    return function (_Component) {
      _inherits(SideToolbarButton, _Component);

      function SideToolbarButton() {
        _classCallCheck(this, SideToolbarButton);

        return _possibleConstructorReturn(this, (SideToolbarButton.__proto__ || Object.getPrototypeOf(SideToolbarButton)).apply(this, arguments));
      }

      _createClass(SideToolbarButton, [{
        key: 'handleClick',
        value: function handleClick(event) {
          var _this2 = this;

          event.preventDefault();

          if (onAddEmbed) {
            onAddEmbed().then(function (url) {
              if (!url) {
                return null;
              }

              var editorState = _this2.props.getEditorState();

              var newEditorState = void 0;

              // Change block type
              newEditorState = _draftJs.RichUtils.toggleBlockType(editorState, 'atomic');

              // Apply entity
              var entityKey = _draftJs.Entity.create('embed', 'IMMUTABLE', { url: url });

              var newContentState = _draftJs.Modifier.insertText(newEditorState.getCurrentContent(), newEditorState.getSelection(), url, null, entityKey);

              newEditorState = _draftJs.EditorState.push(newEditorState, newContentState, 'insert-characters');

              newEditorState = (0, _utils.insertBlock)(newEditorState);

              _this2.props.setEditorState(newEditorState);

              getData(url).then(function (data) {
                _draftJs.Entity.replaceData(entityKey, _extends({ url: url }, data));

                var editorState = _this2.props.getEditorState();

                _this2.props.setEditorState(_draftJs.EditorState.forceSelection(editorState, editorState.getSelection()));
              });
            }).catch(function (error) {
              throw error;
            });
          }

          closeToolbar();
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(_Button2.default, {
            onClick: this.handleClick.bind(this),
            icon: _react2.default.createElement(
              'svg',
              { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
              _react2.default.createElement('path', { d: 'M0 0h24v24H0V0z', fill: 'none' }),
              _react2.default.createElement('path', { d: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' })
            )
          });
        }
      }]);

      return SideToolbarButton;
    }(_react.Component);
  };
};