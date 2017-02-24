import React, { Component } from 'react';
import addImage from './addImage';
import { EditorState, Entity, RichUtils, Modifier } from 'draft-js';

import Button from '../../../plugins/side-toolbar/components/Button';
import { insertBlock } from '../../../utils';

import { ImageIcon } from '../../../Drink';


const onAddImage = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: 1,
        url: 'http://img.clubic.com/01E0000008617952-photo-zenfone-3-1.jpg',
        width: 480,
        height: 320,
        type: 'image',
      })
    }, 0);
  });
}

export default () => ({ closeToolbar }) => (
  class SideToolbarButton extends Component {

    handleClick(event) {
      event.preventDefault();

      const editorState = this.props.getEditorState();

      onAddImage().then(data => {
        this.props.setEditorState(addImage(editorState, data));
      }).catch(error => {
        throw error;
      });

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
