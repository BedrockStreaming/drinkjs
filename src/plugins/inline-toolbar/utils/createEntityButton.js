import React, { Component } from 'react';
import { EditorState, Entity, RichUtils } from 'draft-js';
import { entityStrategy, selectionContainsEntity } from '../../../utils';

export default ({ entityType, entityMutability, children, onClick }) => (
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
        if ('function' === typeof onClick) {
          onClick && onClick().then(data => {
            if (!data.type || !data.title) {
              throw new Error('createEntityButton onClick callback must return a valid object with type and title')
            }

            this.addEntity(data)
          }).catch(error => {
            throw error;
          });
        } else {
          this.props.store.updateItem('entityType', entityType);
        }
      }
    }

    addEntity(data) {
      const { store } = this.props;
      const getEditorState = store.getItem('getEditorState');
      const setEditorState = store.getItem('setEditorState');
      const editorState = getEditorState();
      const selectionState = editorState.getSelection();

      const entityKey = Entity.create(entityType, entityMutability, data);

      const newEditorState = RichUtils.toggleLink(
        editorState,
        selectionState,
        entityKey
      );

      setTimeout(() => {
        setEditorState(EditorState.forceSelection(newEditorState, selectionState));
      }, 0);
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
