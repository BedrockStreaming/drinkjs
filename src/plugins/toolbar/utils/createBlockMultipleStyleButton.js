import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

export default (styles) => (
  class BlockMultipleStyleButton extends Component {
    toggleStyle = (event) => {
      event.preventDefault();

      this.props.setEditorState(
        RichUtils.toggleBlockType(
          this.props.getEditorState(),
          this.getNextType()
        )
      );
    }

    preventBubblingUp = (event) => {
      event.preventDefault();
    }

    blockTypeIsActive = () => {
      const type = this.getCurrentType();

      return styles.some(({ blockType }) => (blockType === type));
    }

    getCurrentType() {
      const editorState = this.props.getEditorState();

      return editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
    }

    getNextType() {
      const currentType = this.getCurrentType();

      if (currentType === 'unstyled') {
        return styles[0].blockType;
      }

      return styles.reduce((prev, { blockType }, index) => {
        if (currentType === blockType && styles[index + 1]) {
          return styles[index + 1].blockType;
        }

        return prev;
      }, 'unstyled')
    }

    getCurrentChildren() {
      const type = this.getCurrentType();

      return styles.reduce((prev, { blockType, children }) => (
        type === blockType ? children : prev
      ), styles[0].children);
    }

    render() {
      const { theme } = this.props;
      const className = this.blockTypeIsActive() ? `${theme.button} ${theme.active}` : theme.button;
      const children = this.getCurrentChildren();

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
