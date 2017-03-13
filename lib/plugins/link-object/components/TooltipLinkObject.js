'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _TooltipLinkObject = require('./TooltipLinkObject.css');

var _TooltipLinkObject2 = _interopRequireDefault(_TooltipLinkObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TooltipLinkObject = function (_Component) {
  _inherits(TooltipLinkObject, _Component);

  function TooltipLinkObject() {
    _classCallCheck(this, TooltipLinkObject);

    return _possibleConstructorReturn(this, (TooltipLinkObject.__proto__ || Object.getPrototypeOf(TooltipLinkObject)).apply(this, arguments));
  }

  _createClass(TooltipLinkObject, [{
    key: 'render',
    value: function render() {
      var entityKey = this.props.entityKey;

      var entity = _draftJs.Entity.get(entityKey);
      var _entity$data = entity.data;
      var title = _entity$data.title;
      var type = _entity$data.type;


      return _react2.default.createElement(
        'div',
        { className: _TooltipLinkObject2.default.container },
        '[',
        type,
        '] - ',
        title
      );
    }
  }]);

  return TooltipLinkObject;
}(_react.Component);

exports.default = TooltipLinkObject;