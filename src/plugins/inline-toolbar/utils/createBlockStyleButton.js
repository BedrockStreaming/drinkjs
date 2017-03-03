import React, { Component } from 'react';
import { EditorState, RichUtils, Modifier } from 'draft-js';
import { Map } from 'immutable';

export default ({ blockType, children }) => (
  class BlockStyleButton extends Component {
    static propTypes = {
      store: React.PropTypes.object.isRequired,
      theme: React.PropTypes.object.isRequired,
    }

    toggleStyle = (event) => {
      event.preventDefault();

      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');
      const editorState = getEditorState();

      const newEditorState = RichUtils.toggleBlockType(
        editorState,
        blockType
      );

      // reset block data
      const newContentState = Modifier.setBlockData(
        newEditorState.getCurrentContent(),
        newEditorState.getSelection(),
        Map()
      );

      const nextEditorState = EditorState.push(
        newEditorState,
        newContentState,
        'change-block-data'
      );

      setEditorState(
        nextEditorState
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    blockTypeIsActive = () => {
      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const editorState = getEditorState();

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
