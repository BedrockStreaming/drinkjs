import React, { Component } from 'react';
import { EditorState, Entity, RichUtils, Modifier } from 'draft-js';

import Button from 'plugins/side-toolbar/components/Button';
import { insertBlock } from 'utils';

export default ({ getData }) => (
  class SideToolbarButton extends Component {

    handleClick() {
      // const editorState = this.props.getEditorState();
      const url = window.prompt('Please enter a URL to embed', 'https://www.youtube.com/watch?v=jQFIu9InG7Q');

      if (!url) {
        return null;
      }

      const editorState = this.props.getEditorState();

      let newEditorState;

      // Change block type
      newEditorState = RichUtils.toggleBlockType(
        editorState,
        'atomic'
      )

      // Apply entity
      const entityKey = Entity.create('embed', 'IMMUTABLE', { url });

      const newContentState = Modifier.insertText(
        newEditorState.getCurrentContent(),
        newEditorState.getSelection(),
        url,
        null,
        entityKey
      );

      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        'insert-characters'
      );

      newEditorState = insertBlock(newEditorState);

      this.props.setEditorState(newEditorState);

      getData(url).then(
        data => {
          Entity.replaceData(entityKey, { url, ...data });

          const editorState = this.props.getEditorState();

          this.props.setEditorState(
            EditorState.forceSelection(
              editorState,
              editorState.getSelection()
            )
          );
        },
        err => {
          alert(err);
        }
      );
    }

    render() {
      return (
        <Button
          onClick={() => this.handleClick()}
          icon={(
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
          )}
        />
      );
    }
  }
);
