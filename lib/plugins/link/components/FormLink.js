'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../utils/constants');

var _FormLink = require('./FormLink.css');

var _FormLink2 = _interopRequireDefault(_FormLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormLink = function (_Component) {
  _inherits(FormLink, _Component);

  function FormLink(props) {
    _classCallCheck(this, FormLink);

    var _this = _possibleConstructorReturn(this, (FormLink.__proto__ || Object.getPrototypeOf(FormLink)).call(this, props));

    _this.state = { url: '' };
    return _this;
  }

  _createClass(FormLink, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.textInput.focus();
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      switch (event.keyCode) {
        case 13:
          event.preventDefault();
          event.stopPropagation();
          this.handleAddLink(event);
          break;
        case 27:
          this.handleCancel(event);
          break;
        default:
          break;
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ url: event.target.value });
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel(event) {
      event.preventDefault();

      this.props.onCancel();
    }
  }, {
    key: 'handleAddLink',
    value: function handleAddLink(event) {
      if (!this.state.url.length) {
        return this.handleCancel(event);
      }

      var data = {
        url: this.state.url,
        target: '_self',
        nofollow: false
      };

      this.props.onSubmit({
        entityType: _constants.LINK,
        entityMutability: _constants.LINK_MUTABILITY,
        data: data
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: _FormLink2.default.controls },
        _react2.default.createElement('input', {
          ref: function ref(input) {
            return _this2.textInput = input;
          },
          type: 'text',
          className: _FormLink2.default.input,
          placeholder: 'Paste or type a link',
          onKeyDown: this.handleKeyDown.bind(this),
          onChange: this.handleChange.bind(this)
        }),
        _react2.default.createElement(
          'button',
          { className: _FormLink2.default.button, onClick: this.handleCancel.bind(this) },
          _react2.default.createElement(
            'svg',
            { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' }),
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
          )
        )
      );
    }
  }]);

  return FormLink;
}(_react.Component);

FormLink.propTypes = {
  onSubmit: _react2.default.PropTypes.func,
  onCancel: _react2.default.PropTypes.func
};
exports.default = FormLink;