import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

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

      setEditorState(
        RichUtils.toggleBlockType(
          getEditorState(),
          blockType
        )
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
