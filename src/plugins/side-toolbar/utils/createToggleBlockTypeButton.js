import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

import Button from '../components/Button';

export default ({ blockType, icon }) => (
  class ToggleBlockTypeButton extends Component {

    toggleStyle = (e) => {
      e.preventDefault();

      this.props.setEditorState(
        RichUtils.toggleBlockType(
          this.props.getEditorState(),
          blockType
        )
      );
    }

    render() {
      return (
        <Button onClick={(e) => this.toggleStyle(e)} icon={icon} />
      );
    }
  }
);
