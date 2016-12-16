import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

export default ({ style, children }) => (
  class InlineStyleButton extends Component {

    toggleStyle = (event) => {
      event.preventDefault();

      this.props.setEditorState(
        RichUtils.toggleInlineStyle(
          this.props.getEditorState(),
          style
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    styleIsActive = () => this.props.getEditorState().getCurrentInlineStyle().has(style);

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
