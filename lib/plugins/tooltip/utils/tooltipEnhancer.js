'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComponentToWrap) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    _inherits(EnhancedTooltip, _Component);

    function EnhancedTooltip() {
      _classCallCheck(this, EnhancedTooltip);

      return _possibleConstructorReturn(this, (EnhancedTooltip.__proto__ || Object.getPrototypeOf(EnhancedTooltip)).apply(this, arguments));
    }

    _createClass(EnhancedTooltip, [{
      key: 'handleMouseEnter',
      value: function handleMouseEnter(event) {
        event.preventDefault();

        var entityKey = this.props.entityKey;


        this.props.store.updateItem('data', {
          entityKey: entityKey,
          target: this.wrapper
        });
      }
    }, {
      key: 'handleMouseLeave',
      value: function handleMouseLeave(event) {
        event.preventDefault();

        this.props.store.updateItem('data', null);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        /*eslint-disable no-unused-vars*/
        var _props = this.props;
        var store = _props.store;

        var props = _objectWithoutProperties(_props, ['store']);
        /*eslint-enable no-unused-vars*/

        return _react2.default.createElement(
          'span',
          {
            ref: function ref(node) {
              return _this2.wrapper = node;
            },
            onMouseEnter: this.handleMouseEnter.bind(this),
            onMouseLeave: this.handleMouseLeave.bind(this)
          },
          _react2.default.createElement(ComponentToWrap, props)
        );
      }
    }]);

    return EnhancedTooltip;
  }(_react.Component), _class.propTypes = {
    store: _react2.default.PropTypes.object.isRequired
  }, _temp;
};