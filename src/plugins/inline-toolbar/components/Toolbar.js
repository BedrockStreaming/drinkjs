import React from 'react';
import { EditorState, Entity, RichUtils, getVisibleSelectionRect } from 'draft-js';

import styles from './Toolbar.css';

// TODO make toolbarHeight to be determined or a parameter
const toolbarHeight = 44;

const initialState = {
  focusInput: false,
  url: ''
};

export default class Toolbar extends React.Component {

  state = initialState

  componentWillMount() {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
    this.props.store.subscribeToItem('showUrlInput', this.onShowUrlInputChanged);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
    this.props.store.unsubscribeFromItem('showUrlInput', this.onShowUrlInputChanged);
  }

  componentDidUpdate() {
    if (this.state.focusInput) {
      this.textInput.focus();
    }
  }

  onShowUrlInputChanged = showUrlInput => {
    if (showUrlInput) {
      this.setState({
        focusInput: true
      });
    }
  }

  addLink() {
    const getEditorState = this.props.store.getItem('getEditorState');
    const setEditorState = this.props.store.getItem('setEditorState');

    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    const data = {
      nofollow: false,
      target: '_blank',
      url: this.state.url
    };

    const entityKey = Entity.create('LINK', 'IMMUTABLE', data);

    const newEditorState = RichUtils.toggleLink(
      editorState,
      selectionState,
      entityKey
    );

    setEditorState(newEditorState);

    this.setState({ focusInput: false });
    this.props.store.updateItem('showUrlInput', false);

    setEditorState(EditorState.forceSelection(newEditorState, selectionState));
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();

      this.addLink();
    }
  }

  onVisibilityChanged = isVisible => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    const showUrlInput = this.props.store.getItem('showUrlInput');

    if (!showUrlInput) {
      setTimeout(() => {
        const selectionRect = isVisible ? getVisibleSelectionRect(window) : undefined;
        const position = selectionRect ? {
          top: (selectionRect.top + window.scrollY) - toolbarHeight,
          left: selectionRect.left + window.scrollX + (selectionRect.width / 2),
          transform: 'translate(-50%) scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        } : {
          transform: 'translate(-50%) scale(0)',
        };
        this.setState({
          position,
        });
      }, 0);
    }
  }

  changeUrl(event) {
    this.setState({ url: event.target.value });
  }

  render() {
    if (!this.props.buttons.length) {
      return null;
    }

    return (
      <div
        className={styles.toolbar}
        style={this.state.position}
      >
        {this.props.store.getItem('showUrlInput') ? (
          <div className={styles.controls}>
            <input ref={input => this.textInput = input} type="text" placeholder="Copier ou saisir une url"
              onKeyDown={this.onKeyDown.bind(this)}
              onChange={this.changeUrl.bind(this)}
            />
            <button onClick={this.closeUrl}>x</button>
          </div>
        ) : (
          this.props.buttons.map((Button, index) => (
            <Button
              key={index}
              theme={styles}
              getEditorState={this.props.store.getItem('getEditorState')}
              setEditorState={this.props.store.getItem('setEditorState')}
            />
          ))
        )}
      </div>
    );
  }
}
