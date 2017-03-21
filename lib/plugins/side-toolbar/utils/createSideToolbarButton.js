'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var onClick = _ref.onClick;
  var icon = _ref.icon;
  return function (_ref2) {
    var closeToolbar = _ref2.closeToolbar;
    return function (_Component) {
      _inherits(SideToolbarButton, _Component);

      function SideToolbarButton() {
        var _ref3;

        var _temp, _this, _ret;

        _classCallCheck(this, SideToolbarButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = SideToolbarButton.__proto__ || Object.getPrototypeOf(SideToolbarButton)).call.apply(_ref3, [this].concat(args))), _this), _this.handleClick = function (e) {
          e.preventDefault();

          var getEditorState = _this.props.getEditorState;
          var setEditorState = _this.props.setEditorState;

          onClick(getEditorState, setEditorState);
          closeToolbar();
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(SideToolbarButton, [{
        key: 'render',
        value: function render() {
          var _this2 = this;

          return _react2.default.createElement(_Button2.default, { onClick: function onClick(e) {
              return _this2.handleClick(e);
            }, icon: icon });
        }
      }]);

      return SideToolbarButton;
    }(_react.Component);
  };
};