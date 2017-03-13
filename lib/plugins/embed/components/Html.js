'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _parse = require('parse5');

var _parse2 = _interopRequireDefault(_parse);

var _lodash = require('lodash');

var _Html = require('./Html.css');

var _Html2 = _interopRequireDefault(_Html);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function loadScript(src) {
  var script = document.createElement('script');
  script.src = src;

  document.body.appendChild(script);
}

var findScripts = function findScripts(node) {
  if (node.tagName && node.tagName === 'script') {
    return node.attrs.reduce(function (prev, curr) {
      return curr.name === 'src' ? curr.value : prev;
    }, null);
  }

  return (0, _lodash.flatten)((node.childNodes || []).map(findScripts));
};

var Html = function (_Component) {
  _inherits(Html, _Component);

  function Html(props) {
    _classCallCheck(this, Html);

    var _this = _possibleConstructorReturn(this, (Html.__proto__ || Object.getPrototypeOf(Html)).call(this, props));

    _this.scripts = findScripts(_parse2.default.parseFragment(props.blockProps.html));
    return _this;
  }

  _createClass(Html, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scripts.forEach(function (script) {
        return loadScript(script);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var html = this.props.blockProps.html;


      return _react2.default.createElement('div', { className: _Html2.default.html, dangerouslySetInnerHTML: { __html: html } });
    }
  }]);

  return Html;
}(_react.Component);

exports.default = Html;