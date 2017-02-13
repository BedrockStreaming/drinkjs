import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

import Button from '../components/Button';

export default ({ onClick, icon }) => ({ closeToolbar }) => (
  class SideToolbarButton extends Component {
    handleClick = (e) => {
      e.preventDefault();

      const getEditorState = this.props.getEditorState;
      const setEditorState = this.props.setEditorState;

      onClick(getEditorState, setEditorState);
      closeToolbar();
    }

    onAddImage = (data) => {
      // entity create etc...
      // promise.resolve
    }

    render() {
      return (
        <Button onClick={(e) => this.handleClick(e)} icon={icon} />
      );
    }
  }
);
