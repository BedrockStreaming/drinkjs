import React, { Component } from 'react';
import { EditorState, Entity, RichUtils, Modifier } from 'draft-js';

import Button from '../../../plugins/side-toolbar/components/Button';
import { insertBlock } from '../../../utils';

export default () => ({ closeToolbar }) => (
  class SideToolbarButton extends Component {

    handleClick(event) {
      event.preventDefault();

      const title = window.prompt('Please enter any title', 'hello world');

      const editorState = this.props.getEditorState();

      let newEditorState;

      // Change block type
      newEditorState = RichUtils.toggleBlockType(
        editorState,
        'atomic'
      );

      // Apply entity
      const entityKey = Entity.create('acme', 'IMMUTABLE', { title });

      const newContentState = Modifier.insertText(
        newEditorState.getCurrentContent(),
        newEditorState.getSelection(),
        title,
        null,
        entityKey
      );

      newEditorState = EditorState.push(
        newEditorState,
        newContentState,
        'insert-characters'
      );

      //newEditorState = insertBlock(newEditorState);

      this.props.setEditorState(newEditorState);

      /*this.props.setEditorState(
        EditorState.forceSelection(
          editorState,
          editorState.getSelection()
        )
      );*/

      closeToolbar();
    }

    render() {
      return (
        <Button
          onClick={this.handleClick.bind(this)}
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
