import React, { Component } from 'react';
import toggleTextAlignment from './toggleTextAlignment';

import { ALIGNMENT_KEY, ALIGNMENT_LEFT } from './constants';

export default ({ alignment, children }) => (
  class TextAlignmentButton extends Component {
    static propTypes = {
      store: React.PropTypes.object.isRequired,
      theme: React.PropTypes.object.isRequired,
    }

    toggleAlignment = (event) => {
      event.preventDefault();

      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');

      setEditorState(
        toggleTextAlignment(
          getEditorState(),
          alignment
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    alignmentIsActive = () => {
      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
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
