'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button.css');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Button = function Button(_ref) {
  var icon = _ref.icon;
  var className = _ref.className;

  var other = _objectWithoutProperties(_ref, ['icon', 'className']);

  return _react2.default.createElement(
    'button',
    _extends({
      className: _Button2.default.button + ' ' + className,
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      }
    }, other),
    icon
  );
};

exports.default = Button;