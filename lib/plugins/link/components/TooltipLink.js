'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _TooltipLink = require('./TooltipLink.css');

var _TooltipLink2 = _interopRequireDefault(_TooltipLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TooltipLink = function (_Component) {
  _inherits(TooltipLink, _Component);

  function TooltipLink() {
    _classCallCheck(this, TooltipLink);

    return _possibleConstructorReturn(this, (TooltipLink.__proto__ || Object.getPrototypeOf(TooltipLink)).apply(this, arguments));
  }

  _createClass(TooltipLink, [{
    key: 'handleClick',
    value: function handleClick(url, event) {
      event.preventDefault();

      window.open(url);
    }
  }, {
    key: 'handleChangeData',
    value: function handleChangeData(key, event) {
      event.preventDefault();
      event.stopPropagation();

      var _props = this.props;
      var entityKey = _props.entityKey;
      var store = _props.store;

      var entity = _draftJs.Entity.get(entityKey);

      var newData = void 0;
      switch (key) {
        case 'nofollow':
          newData = {
            nofollow: !entity.data.nofollow
          };
          break;
        case 'target':
          newData = {
            target: '_self' === entity.data.target ? '_blank' : '_self'
          };
          break;
        default:
          break;
      }

      _draftJs.Entity.mergeData(entityKey, newData);

      var getEditorState = store.getItem('getEditorState');
      var setEditorState = store.getItem('setEditorState');

      var editorState = getEditorState();
      var selectionState = editorState.getSelection();

      setTimeout(function () {
        setEditorState(_draftJs.EditorState.forceSelection(editorState, selectionState));
      }, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      var entityKey = this.props.entityKey;

      var entity = _draftJs.Entity.get(entityKey);
      var _entity$data = entity.data;
      var url = _entity$data.url;
      var target = _entity$data.target;
      var nofollow = _entity$data.nofollow;


      return _react2.default.createElement(
        'div',
        { className: _TooltipLink2.default.container },
        _react2.default.createElement(
          'span',
          { className: _TooltipLink2.default.url, onClick: this.handleClick.bind(this, url) },
          url
        ),
        _react2.default.createElement(
          'button',
          {
            className: '_blank' === target ? _TooltipLink2.default.button + ' ' + _TooltipLink2.default.active : _TooltipLink2.default.button,
            onClick: this.handleChangeData.bind(this, 'target'),
            title: 'Open this link in new window'
          },
          _react2.default.createElement(
            'svg',
            { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
            _react2.default.createElement('path', { d: 'M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z' })
          )
        ),
        _react2.default.createElement(
          'button',
          {
            className: nofollow ? _TooltipLink2.default.button + ' ' + _TooltipLink2.default.active : _TooltipLink2.default.button,
            onClick: this.handleChangeData.bind(this, 'nofollow'),
            title: 'Do not follow this link'
          },
          _react2.default.createElement(
            'svg',
            { height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: 'M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z', fill: 'none' }),
            _react2.default.createElement('path', { d: 'M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z' })
          )
        )
      );
    }
  }]);

  return TooltipLink;
}(_react.Component);

exports.default = TooltipLink;