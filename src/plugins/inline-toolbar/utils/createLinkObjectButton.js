import React, { Component } from 'react';
import { RichUtils } from 'draft-js';

export default ({ entityType, isActive, children, onClick }) => (
  class EntityButton extends Component {
    static propTypes = {
      store: React.PropTypes.object.isRequired,
      theme: React.PropTypes.object.isRequired,
    }

    handleClick(event) {
      event.preventDefault();

      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');
      const editorState = getEditorState();

      if (isActive && isActive(editorState)) {
        const selectionState = editorState.getSelection();

        setEditorState(
          RichUtils.toggleLink(
            editorState,
            selectionState,
            null
          )
        );
      } else {
        onClick && onClick().then(data => {
        }).catch(error => console.warn(error));
      }
    };

    preventBubblingUp(event) {
      event.preventDefault();
    }

    render() {
      const { store, theme } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const className = isActive && isActive(getEditorState()) ? `${theme.button} ${theme.active}` : theme.button;
      return (
        <button
          className={className}
          onClick={this.handleClick.bind(this)}
          type="button"
          children={children}
          onMouseDown={this.preventBubblingUp.bind(this)}
        />
      );
    }
  }
)
