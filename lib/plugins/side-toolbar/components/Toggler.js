'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Toggler = function Toggler(_ref) {
  var active = _ref.active;

  var props = _objectWithoutProperties(_ref, ['active']);

  var style = {
    transition: 'transform .1s'
  };

  if (active) {
    style.transform = 'rotate(45deg)';
  }

  return _react2.default.createElement(_Button2.default, _extends({
    icon: _react2.default.createElement(
      'svg',
      { width: '24', height: '24', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
      _react2.default.createElement('path', { d: 'M20 12h-7V5h-1v7H5v1h7v7h1v-7h7' }),
      _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
    ),
    style: style
  }, props));
};

exports.default = Toggler;