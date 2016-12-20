import React, { Component } from 'react';
import { EditorState, Entity, RichUtils } from 'draft-js';
import CancelIcon from '../../../icons/CancelIcon';

import styles from './FormUrl.css';

export default class FormUrl extends Component {
  state = {
    url: ''
  }

  componentDidMount() {
    this.textInput.focus();
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        event.stopPropagation();
        this.handleAddLink();
        break;
      case 27:
        this.handleCancelUrl();
        break;
      default: void 0
    }
  }

  handleChangeUrl(event) {
    this.setState({ url: event.target.value });
  }

  handleCancelUrl() {
    const getEditorState = this.props.store.getItem('getEditorState');
    const setEditorState = this.props.store.getItem('setEditorState');

    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    this.props.store.updateItem('showUrlInput', false);

    setEditorState(EditorState.forceSelection(editorState, selectionState));
  }

  handleAddLink() {
    if (!this.state.url.length) {
      return this.handleCancelUrl();
    }

    const getEditorState = this.props.store.getItem('getEditorState');
    const setEditorState = this.props.store.getItem('setEditorState');

    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    const data = {
      nofollow: false,
      target: '_self',
      url: this.state.url
    };

    const entityKey = Entity.create('LINK', 'IMMUTABLE', data);

    const newEditorState = RichUtils.toggleLink(
      editorState,
      selectionState,
      entityKey
    );

    this.props.store.updateItem('showUrlInput', false);

    setEditorState(EditorState.forceSelection(newEditorState, selectionState));
  }

  render() {
    const { theme } = this.props;

    return (
      <div className={styles.controls}>
        <input ref={input => this.textInput = input}
           type="text"
           className={styles.input}
           placeholder="Past or type a link"
           onKeyDown={this.handleKeyDown.bind(this)}
           onChange={this.handleChangeUrl.bind(this)}
        />
        <button className={theme.button} onClick={this.handleCancelUrl.bind(this)}>
          <CancelIcon />
        </button>
      </div>
    )
  }
}
