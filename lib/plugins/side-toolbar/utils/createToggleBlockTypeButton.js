'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Button = require('../components/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var blockType = _ref.blockType;
  var icon = _ref.icon;
  return function (_Component) {
    _inherits(ToggleBlockTypeButton, _Component);

    function ToggleBlockTypeButton() {
      var _ref2;

      var _temp, _this, _ret;

      _classCallCheck(this, ToggleBlockTypeButton);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = ToggleBlockTypeButton.__proto__ || Object.getPrototypeOf(ToggleBlockTypeButton)).call.apply(_ref2, [this].concat(args))), _this), _this.toggleStyle = function (e) {
        e.preventDefault();

        _this.props.setEditorState(_draftJs.RichUtils.toggleBlockType(_this.props.getEditorState(), blockType));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ToggleBlockTypeButton, [{
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(_Button2.default, { onClick: function onClick(e) {
            return _this2.toggleStyle(e);
          }, icon: icon });
      }
    }]);

    return ToggleBlockTypeButton;
  }(_react.Component);
};