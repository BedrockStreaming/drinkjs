import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

export default ({ blockType, children }) => (
  class BlockStyleButton extends Component {

    toggleStyle = (event) => {
      event.preventDefault();

      this.props.setEditorState(
        RichUtils.toggleBlockType(
          this.props.getEditorState(),
          blockType
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    blockTypeIsActive = () => {
      const editorState = this.props.getEditorState();
      const type = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
      return type === blockType;
    }

    render() {
      const { theme } = this.props;
      const className = this.blockTypeIsActive() ? `${theme.button} ${theme.active}` : theme.button;
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
