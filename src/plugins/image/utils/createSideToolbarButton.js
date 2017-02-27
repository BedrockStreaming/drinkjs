import React, { Component } from 'react';
import addImage from './addImage';
import { EditorState, Entity, RichUtils, Modifier } from 'draft-js';

import Button from '../../../plugins/side-toolbar/components/Button';
import { insertBlock } from '../../../utils';

import { ImageIcon } from '../../../Drink';

export default ({ onAddImage }) => ({ closeToolbar }) => (
  class SideToolbarButton extends Component {
    handleClick(event) {

      event.preventDefault();

      const editorState = this.props.getEditorState();

      if(onAddImage) {
        onAddImage().then(data => {
          this.props.setEditorState(addImage(editorState, data));
        }).catch(error => {
          throw error;
        });
      }

      closeToolbar();
    }

    render() {
      return (
        <Button
          onClick={this.handleClick.bind(this)}
          icon={<ImageIcon />}
        />
      );
    }
  }
);
