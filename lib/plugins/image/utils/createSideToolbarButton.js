'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addImage = require('./addImage');

var _addImage2 = _interopRequireDefault(_addImage);

var _draftJs = require('draft-js');

var _Button = require('../../../plugins/side-toolbar/components/Button');

var _Button2 = _interopRequireDefault(_Button);

var _utils = require('../../../utils');

var _Drink = require('../../../Drink');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var onAddImage = _ref.onAddImage;
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

          var editorState = this.props.getEditorState();

          if (onAddImage) {
            onAddImage().then(function (data) {
              _this2.props.setEditorState((0, _addImage2.default)(editorState, data));
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
            icon: _react2.default.createElement(_Drink.ImageIcon, null)
          });
        }
      }]);

      return SideToolbarButton;
    }(_react.Component);
  };
};