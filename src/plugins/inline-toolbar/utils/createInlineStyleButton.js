import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

export default ({ style, children }) => (
  class InlineStyleButton extends Component {
    static propTypes = {
      store: React.PropTypes.object.isRequired,
      theme: React.PropTypes.object.isRequired,
    }

    toggleStyle = (event) => {
      event.preventDefault();

      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');

      setEditorState(
        RichUtils.toggleInlineStyle(
          getEditorState(),
          style
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    styleIsActive = () => {
      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');

      return getEditorState().getCurrentInlineStyle().has(style);
    }

    render() {
      const { theme } = this.props;
      const className = this.styleIsActive() ? `${theme.button} ${theme.active}` : theme.button;
      return (
        <button
          className={className}
          onClick={this.toggleStyle}
          type="button"
          children={children}
          onMouseDown={this.preventBubblingUp}
        />
      );
    }
  }
);
