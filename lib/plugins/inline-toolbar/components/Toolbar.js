'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _Toolbar = require('./Toolbar.css');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO make toolbarHeight to be determined or a parameter
var toolbarHeight = 44;

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar(props) {
    _classCallCheck(this, Toolbar);

    var _this = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this, props));

    _this.onVisibilityChanged = function (isVisible) {
      // need to wait a tick for window.getSelection() to be accurate
      // when focusing editor with already present selection
      setTimeout(function () {
        var selectionRect = isVisible ? (0, _draftJs.getVisibleSelectionRect)(window) : undefined;
        var position = selectionRect ? {
          top: selectionRect.top + window.scrollY - toolbarHeight,
          left: selectionRect.left + window.scrollX + selectionRect.width / 2,
          transform: 'translate(-50%) scale(1)',
          transition: '0.15s cubic-bezier(0.3, 1.2, 0.2, 1)',
          transitionProperty: 'transform top left'
        } : null;

        _this.setState({ position: position });
      }, 0);
    };

    _this.onEntityTypeChanged = function (entityType) {
      var position = _this.state.position;


      _this.setState({ position: null });

      setTimeout(function () {
        _this.setState({
          entityType: entityType,
          position: position
        });
      }, 0);
    };

    _this.state = {};
    return _this;
  }

  _createClass(Toolbar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
      this.props.store.subscribeToItem('entityType', this.onEntityTypeChanged);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
      this.props.store.unsubscribeFromItem('entityType', this.onEntityTypeChanged);
    }
  }, {
    key: 'getRenderer',
    value: function getRenderer() {
      var renderers = this.props.renderers;
      var entityType = this.state.entityType;


      return renderers[entityType] || null;
    }
  }, {
    key: 'handleAddEntity',
    value: function handleAddEntity(_ref) {
      var entityType = _ref.entityType;
      var entityMutability = _ref.entityMutability;
      var data = _ref.data;
      var store = this.props.store;

      var getEditorState = store.getItem('getEditorState');
      var setEditorState = store.getItem('setEditorState');
      var editorState = getEditorState();
      var selectionState = editorState.getSelection();

      var entityKey = _draftJs.Entity.create(entityType, entityMutability, data);

      // toggle link execute 'apply-entity' command, not specific to LINK
      var newEditorState = _draftJs.RichUtils.toggleLink(editorState, selectionState, entityKey);

      setTimeout(function () {
        setEditorState(_draftJs.EditorState.forceSelection(newEditorState, selectionState));
      }, 0);

      store.updateItem('entityType', null);
    }
  }, {
    key: 'handleCancel',
    value: function handleCancel() {
      var store = this.props.store;

      var getEditorState = store.getItem('getEditorState');
      var setEditorState = store.getItem('setEditorState');
      var editorState = getEditorState();
      var selectionState = editorState.getSelection();

      setTimeout(function () {
        setEditorState(_draftJs.EditorState.forceSelection(editorState, selectionState));
      }, 0);

      this.props.store.updateItem('entityType', null);
    }
  }, {
    key: 'renderContent',
    value: function renderContent() {
      var _props = this.props;
      var buttons = _props.buttons;
      var store = _props.store;
      var entityType = this.state.entityType;


      if (entityType) {
        var Renderer = this.getRenderer();

        if (Renderer) {
          return _react2.default.createElement(Renderer, {
            onSubmit: this.handleAddEntity.bind(this),
            onCancel: this.handleCancel.bind(this)
          });
        }
      }

      return buttons.map(function (Button, index) {
        return _react2.default.createElement(Button, { key: index, theme: _Toolbar2.default, store: store });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.buttons.length) {
        return null;
      }

      var position = this.state.position;


      var style = position || {
        transform: 'translate(-50%) scale(0)'
      };

      return _react2.default.createElement(
        'div',
        { className: _Toolbar2.default.toolbar, style: style },
        position && this.renderContent()
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

Toolbar.propTypes = {
  store: _react2.default.PropTypes.object.isRequired,
  buttons: _react2.default.PropTypes.array,
  renderers: _react2.default.PropTypes.object
};
Toolbar.defaultProps = {
  buttons: [],
  renderers: {}
};
exports.default = Toolbar;