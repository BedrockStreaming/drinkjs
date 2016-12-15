import React, { Component } from 'react';
import toggleTextAlignment from './toggleTextAlignment';

import { ALIGNMENT_KEY, ALIGNMENT_LEFT } from '../constants';

export default ({ alignment, children }) => (
  class TextAlignmentButton extends Component {

    toggleAlignment = (event) => {
      event.preventDefault();

      this.props.setEditorState(
        toggleTextAlignment(
          this.props.getEditorState(),
          alignment
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    alignmentIsActive = () => {
      const { getEditorState } = this.props;

      const editorState = getEditorState();
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      const startKey = selectionState.getStartKey();
      const currentBlock = contentState.getBlockForKey(startKey);
      const blockData  = currentBlock.getData();

      // alignment is active when there is no data and current button is left
      if (!blockData.has(ALIGNMENT_KEY) && ALIGNMENT_LEFT === alignment) {
        return true;
      }

      // alignment is active if data contain a textAlignment key
      // where value is current button alignment value
      if (blockData.has(ALIGNMENT_KEY) && alignment === blockData.get(ALIGNMENT_KEY)) {
        return true
      }

      return false
    }

    render() {
      const { theme } = this.props;
      const className = this.alignmentIsActive() ? `${theme.button} ${theme.active}` : theme.button;
      return (
        <button
          className={className}
          onClick={this.toggleAlignment}
          type="button"
          children={children}
          onMouseDown={this.preventBubblingUp}
        />
      );
    }
  }
);
