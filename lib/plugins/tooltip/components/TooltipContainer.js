'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _draftJs = require('draft-js');

var _lodash = require('lodash');

var _TooltipContainer = require('./TooltipContainer.css');

var _TooltipContainer2 = _interopRequireDefault(_TooltipContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialState = {
  entityKey: null,
  positions: null
};

var TooltipContainer = function (_Component) {
  _inherits(TooltipContainer, _Component);

  function TooltipContainer(props) {
    _classCallCheck(this, TooltipContainer);

    var _this = _possibleConstructorReturn(this, (TooltipContainer.__proto__ || Object.getPrototypeOf(TooltipContainer)).call(this, props));

    _this.state = initialState;

    _this.clear = _this._clear.bind(_this);
    _this.delayClear = _this._delayClear.bind(_this);
    _this.cancelClear = _this._cancelClear.bind(_this);
    _this.handleUpdate = _this._handleUpdate.bind(_this);
    _this.handleResize = (0, _lodash.throttle)(_this._handleResize.bind(_this), 300);
    return _this;
  }

  _createClass(TooltipContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      window.addEventListener('resize', this.handleResize);
      this.props.store.subscribeToItem('data', this.handleUpdate);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      this.props.store.unsubscribeFromItem('data', this.handleUpdate);
    }
  }, {
    key: '_handleUpdate',
    value: function _handleUpdate(data) {
      if (data) {
        var entityKey = data.entityKey;
        var target = data.target;


        this.clearTimer && this.cancelClear();

        this.setState({
          entityKey: entityKey,
          target: target
        });
      } else {
        this.delayClear();
      }
    }
  }, {
    key: '_handleResize',
    value: function _handleResize() {
      this.clear();
    }
  }, {
    key: '_delayClear',
    value: function _delayClear() {
      this.clearTimer = setTimeout(this.clear, 500);
    }
  }, {
    key: '_cancelClear',
    value: function _cancelClear() {
      clearTimeout(this.clearTimer);
      this.clearTimer = null;
    }
  }, {
    key: '_clear',
    value: function _clear() {
      this.setState(initialState);
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      if (this.clearTimer) {
        this.cancelClear();
      }
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.delayClear();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.tooltip && this.state.target) {
        var target = this.state.target;

        var _findDOMNode$getBound = (0, _reactDom.findDOMNode)(target).getBoundingClientRect();

        var top = _findDOMNode$getBound.top;
        var left = _findDOMNode$getBound.left;
        var width = _findDOMNode$getBound.width;
        var height = _findDOMNode$getBound.height;


        var tooltipBoundingRect = (0, _reactDom.findDOMNode)(this.tooltip).getBoundingClientRect();
        var tooltipWidth = tooltipBoundingRect.width;

        var positions = {
          top: top + height + document.body.scrollTop + 8,
          left: left + document.body.scrollLeft + width / 2 - tooltipWidth / 2
        };

        this.setState({
          positions: positions,
          target: null
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var getRenderers = this.props.getRenderers;
      var _state = this.state;
      var entityKey = _state.entityKey;
      var positions = _state.positions;


      var renderers = getRenderers();

      if (!entityKey) {
        return null;
      }

      var entity = _draftJs.Entity.get(entityKey);
      var entityType = entity.getType();

      // call renderer
      var renderer = renderers[entityType];

      if (!renderer) {
        return null;
      }

      var content = void 0;

      if (renderer.text || renderer.getText) {
        content = _react2.default.createElement(
          'span',
          { ref: function ref(node) {
              return _this2.tooltip = node;
            } },
          renderer.text || renderer.getText(entity.data)
        );
      } else {
        var _Component2 = renderer.component;

        content = _react2.default.createElement(_Component2, { ref: function ref(node) {
            return _this2.tooltip = node;
          }, entityKey: entityKey });
      }

      return _react2.default.createElement(
        'div',
        { className: _TooltipContainer2.default.container },
        _react2.default.createElement(
          'div',
          { className: _TooltipContainer2.default.tooltip, style: positions,
            onMouseEnter: this.onMouseEnter.bind(this),
            onMouseLeave: this.onMouseLeave.bind(this)
          },
          content
        )
      );
    }
  }]);

  return TooltipContainer;
}(_react.Component);

TooltipContainer.propTypes = {
  store: _react2.default.PropTypes.object.isRequired,
  getRenderers: _react2.default.PropTypes.func.isRequired
};
exports.default = TooltipContainer;
;