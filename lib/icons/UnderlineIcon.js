"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnderlineIcon = function (_Component) {
  _inherits(UnderlineIcon, _Component);

  function UnderlineIcon() {
    _classCallCheck(this, UnderlineIcon);

    return _possibleConstructorReturn(this, (UnderlineIcon.__proto__ || Object.getPrototypeOf(UnderlineIcon)).apply(this, arguments));
  }

  _createClass(UnderlineIcon, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "svg",
        { height: "24", viewBox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
        _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" }),
        _react2.default.createElement("path", { d: "M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z" })
      );
    }
  }]);

  return UnderlineIcon;
}(_react.Component);

exports.default = UnderlineIcon;