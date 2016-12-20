import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import findLinkEntities from './linkStrategy';
import getSelectedBlocks from './getSelectedBlocks';

const getLinkEntitiesRange = (contentBlock, startOffset, endOffset) => {
  const ranges = [];

  findLinkEntities(contentBlock, (start, end) => {
    if (endOffset > start && startOffset < end) {
      ranges.push({
        start,
        end
      });
    }
  });

  return ranges;
};

const selectionContainsEntities = (editorState, entityType = 'LINK') => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  if (selectionState.isCollapsed()) {
    return false;
  }

  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();

  let startOffset = selectionState.getStartOffset();
  let endOffset = selectionState.getEndOffset();

  if (startKey === endKey) {
    const currentBlock = contentState.getBlockForKey(startKey);
    const entitiesRange = getLinkEntitiesRange(currentBlock, startOffset, endOffset, entityType);

    return entitiesRange.length;
  }

  const selectedBlocks = getSelectedBlocks(contentState, startKey, endKey);
  let linkEntitiesRange = [];

  selectedBlocks.forEach(contentBlock => {
    const currentKey = contentBlock.getKey();

    if (currentKey === startKey) { // selection start here
      startOffset = selectionState.getStartOffset();
      endOffset = contentBlock.getLength();
    } else if (currentKey === endKey) { // selection end here
      startOffset = 0;
      endOffset = selectionState.getEndOffset();
    } else { // full block overlaping
      startOffset = 0;
      endOffset = contentBlock.getLength();
    }

    linkEntitiesRange = linkEntitiesRange.concat(
      getLinkEntitiesRange(contentBlock, startOffset, endOffset, entityType)
    );
  });

  return linkEntitiesRange.length;
};

export default ({ children }) => (
  class LinkButton extends Component {
    toggleLink = (event) => {
      event.preventDefault();

      const { getEditorState, setEditorState } = this.props;
      const editorState = getEditorState();
      const selectionState = editorState.getSelection();

      if (selectionContainsEntities(editorState)) {
        // remove all link entities in selection
        setEditorState(
          RichUtils.toggleLink(
            editorState,
            selectionState,
            null
          )
        );
      } else {
        // toggle toolbar mode for displaying url input
        this.props.store.updateItem('showUrlInput', true);
      }
    };

    preventBubblingUp = (event) => { event.preventDefault(); }

    linkIsActive = () => selectionContainsEntities(this.props.getEditorState());

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
