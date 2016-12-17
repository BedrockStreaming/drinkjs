import React, { Component } from 'react';
import { Entity } from 'draft-js';

const getEntityAtKey = (contentBlock, offset) => {
  const entityKey = contentBlock.getEntityAt(offset);

  if (entityKey) {
    return Entity.get(entityKey);
  }
}

export default ({ children }) => (
  class LinkButton extends Component {
    toggleLink = (event) => {
      event.preventDefault();

      this.props.store.updateItem('showUrlInput', true);
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    linkIsActive = () => {
      const { getEditorState } = this.props;

      const editorState = getEditorState();
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      const startKey = selectionState.getStartKey();
      const endKey = selectionState.getEndKey();

      const startOffset = selectionState.getStartOffset();
      const endOffset = selectionState.getEndOffset();

      let currentBlockEntity;

      if (startKey === endKey) {
        const currentBlock = contentState.getBlockForKey(startKey);

        currentBlockEntity = getEntityAtKey(currentBlock, startOffset);
        if (currentBlockEntity && 'LINK' === currentBlockEntity.getType()) {
          return true
        }

        currentBlockEntity = getEntityAtKey(currentBlock, endOffset);
        if (currentBlockEntity && 'LINK' === currentBlockEntity.getType()) {
          return true
        }
      } else {
        const startBlock = contentState.getBlockForKey(startKey);
        const endBlock = contentState.getBlockForKey(endKey);

        currentBlockEntity = getEntityAtKey(startBlock, startOffset);
        if (currentBlockEntity && 'LINK' === currentBlockEntity.getType()) {
          return true
        }

        currentBlockEntity = getEntityAtKey(endBlock, endOffset);
        if (currentBlockEntity && 'LINK' === currentBlockEntity.getType()) {
          return true
        }
      }

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
