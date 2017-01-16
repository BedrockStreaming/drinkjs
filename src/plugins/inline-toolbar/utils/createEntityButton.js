import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import { entityStrategy, selectionContainsEntity } from '../../../utils';

export default ({ entityType, entityMutability, children }) => (
  class EntityButton extends Component {
    static propTypes = {
      store: React.PropTypes.object.isRequired,
      theme: React.PropTypes.object.isRequired,
    };

    handleClick(event) {
      event.preventDefault();

      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');
      const editorState = getEditorState();

      if (this.isActive()) {
        const selectionState = editorState.getSelection();

        setEditorState(
          RichUtils.toggleLink(
            editorState,
            selectionState,
            null
          )
        );
      } else {
        this.props.store.updateItem('entityType', entityType);
      }
    }

    preventBubblingUp(event) {
      event.preventDefault();
    }

    isActive() {
      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const editorState = getEditorState();

      const strategy = entityStrategy(entityType);
      const selectionHasEntities = selectionContainsEntity(strategy);

      return selectionHasEntities(editorState);
    }

    render() {
      const { theme } = this.props;
      const className = this.isActive() && this.isActive() ? `${theme.button} ${theme.active}` : theme.button;
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
