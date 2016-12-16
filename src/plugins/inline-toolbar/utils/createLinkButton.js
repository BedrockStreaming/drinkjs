import React, { Component } from 'react';
//import { Entity } from 'draft-js';

export default ({ children }) => (
  class LinkButton extends Component {
    toggleLink = (event) => {
      event.preventDefault();

      this.props.store.updateItem('showUrlInput', true);
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    linkIsActive = () => {
      //const { getEditorState } = this.props;
      //
      //const editorState = getEditorState();
      //const contentState = editorState.getCurrentContent();
      //const selectionState = editorState.getSelection();

      //const startKey = selectionState.getStartKey();
      //const currentBlock = contentState.getBlockForKey(startKey);
      //
      //if (currentBlock.getEntityAt(0)) {
      //  console.warn('currentBlock.getEntityAt(0)', parseInt(currentBlock.getEntityAt(0)) - 1)
      //  const entityKey = currentBlock.getEntityAt(0) - 1;
      //  console.warn('entityKey', Entity.get(entityKey));
      //
      //  return false;//'LINK' === Entity.get(entityKey).getType();
      //}

      return false
    }

    render() {
      const { theme } = this.props;
      const className = this.linkIsActive() ? `${theme.button} ${theme.active}` : theme.button;
      return (
        <button
          className={className}
          onClick={this.toggleLink}
          type="button"
          children={children}
          onMouseDown={this.preventBubblingUp}
        />
      );
    }
  }
)