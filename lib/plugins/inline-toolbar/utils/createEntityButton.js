'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (_ref) {
  var _class, _temp;

  var entityType = _ref.entityType;
  var entityMutability = _ref.entityMutability;
  var children = _ref.children;
  return _temp = _class = function (_Component) {
    _inherits(EntityButton, _Component);

    function EntityButton() {
      _classCallCheck(this, EntityButton);

      return _possibleConstructorReturn(this, (EntityButton.__proto__ || Object.getPrototypeOf(EntityButton)).apply(this, arguments));
    }

    _createClass(EntityButton, [{
      key: 'handleClick',
      value: function handleClick(event) {
        event.preventDefault();

        var store = this.props.store;

        var getEditorState = store.getItem('getEditorState');
        var setEditorState = store.getItem('setEditorState');
        var editorState = getEditorState();

        if (this.isActive()) {
          var selectionState = editorState.getSelection();

          setEditorState(_draftJs.RichUtils.toggleLink(editorState, selectionState, null));
        } else {
          this.props.store.updateItem('entityType', entityType);
        }
      }
    }, {
      key: 'preventBubblingUp',
      value: function preventBubblingUp(event) {
        event.preventDefault();
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        var store = this.props.store;

        var getEditorState = store.getItem('getEditorState');
        var editorState = getEditorState();

        var strategy = (0, _utils.entityStrategy)(entityType);
        var selectionHasEntities = (0, _utils.selectionContainsEntity)(strategy);

        return selectionHasEntities(editorState);
      }
    }, {
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        var className = this.isActive() && this.isActive() ? theme.button + ' ' + theme.active : theme.button;
        return _react2.default.createElement('button', {
          className: className,
          onClick: this.handleClick.bind(this),
          type: 'button',
          children: children,
          onMouseDown: this.preventBubblingUp.bind(this)
        });
      }
    }]);

    return EntityButton;
  }(_react.Component), _class.propTypes = {
    store: _react2.default.PropTypes.object.isRequired,
    theme: _react2.default.PropTypes.object.isRequired
  }, _temp;
};