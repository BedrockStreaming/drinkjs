import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import createLinkEntity from '../utils/createLinkEntity';

import styles from './FormLink.css';

export default class FormLink extends Component {
  static propTypes = {
    getEditorState: React.PropTypes.func,
    setEditorState: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = { url: '' };
  }

  componentDidMount() {
    this.textInput.focus();
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        event.stopPropagation();
        this.handleAddLink(event);
        break;
      case 27:
        this.handleCancel(event);
        break;
      default:
        break;
    }
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleCancel(event) {
    event.preventDefault();

    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    setTimeout(() => {
      setEditorState(EditorState.forceSelection(editorState, selectionState));
    }, 0);

    this.props.onCancel();
  }

  handleAddLink(event) {
    if (!this.state.url.length) {
      return this.handleCancel(event);
    }

    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    const entityKey = createLinkEntity({
      url: this.state.url,
      target: '_self',
      nofollow: false,
    });

    const newEditorState = RichUtils.toggleLink(
      editorState,
      selectionState,
      entityKey
    );

    setTimeout(() => {
      setEditorState(EditorState.forceSelection(newEditorState, selectionState));
    }, 0);

    this.props.onSubmit();
  }

  render() {
    return (
      <div className={styles.controls}>
        <input
           ref={input => this.textInput = input}
           type="text"
           className={styles.input}
           placeholder="Paste or type a link"
           onKeyDown={this.handleKeyDown.bind(this)}
           onChange={this.handleChange.bind(this)}
        />
        <button className={styles.button} onClick={this.handleCancel.bind(this)} />
      </div>
    )
  }
}
