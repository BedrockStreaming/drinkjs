import React, { Component } from 'react';
import { Entity, EditorState } from 'draft-js';
import OpenBlankIcon from '../../../icons/OpenBlankIcon';
import VisibilityOffIcon from '../../../icons/VisibilityOffIcon';

import styles from './Link.css';
import buttonStyles from './Buttons.css';

const DEFAULT_TARGET = '_self';
const BLANK_TARGET = '_blank';

export default class Link extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showTooltip: false
    }
  }

  handleOpenBlank(event) {
    event.preventDefault();
    event.stopPropagation();

    const { entityKey, getEditorState, setEditorState } = this.props;
    const entity = Entity.get(entityKey);

    Entity.mergeData(entityKey, {
      target: DEFAULT_TARGET === entity.data.target ? BLANK_TARGET : DEFAULT_TARGET
    })

    const editorState = getEditorState();
    const selectionState = editorState.getSelection();
    setEditorState(EditorState.forceSelection(editorState, selectionState));

    this.forceUpdate();
  }

  handleVisibilityOff(event) {
    event.preventDefault();
    event.stopPropagation();

    const { entityKey, getEditorState, setEditorState } = this.props;
    const entity = Entity.get(entityKey);

    Entity.mergeData(entityKey, {
      nofollow: !entity.data.nofollow
    });

    const editorState = getEditorState();
    const selectionState = editorState.getSelection();
    setEditorState(EditorState.forceSelection(editorState, selectionState));

    this.forceUpdate();
  }

  handleMouseEnter(event) {
    event.preventDefault();

    const setReadOnly = this.props.store.getItem('setReadOnly');
    setReadOnly(true);

    this.setState({
      showTooltip: true
    });
  }

  handleMouseLeave(event) {
    event.preventDefault();

    const setReadOnly = this.props.store.getItem('setReadOnly');
    setReadOnly(false);

    this.setState({
      showTooltip: false
    });
  }

  render() {
    const { entityKey } = this.props;
    const entity = Entity.get(entityKey);

    const { url, target, nofollow } = entity.data;

    const openBlankClassName = BLANK_TARGET === target ? `${buttonStyles.button} ${buttonStyles.active}` : buttonStyles.button;
    const visibilityOffClassName = nofollow ? `${buttonStyles.button} ${buttonStyles.active}` : buttonStyles.button;

    return (
      <span className={styles.link} title={url}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        {this.props.children}
        {this.state.showTooltip ? (
          <div className={styles.tooltip}>
            <span className={styles.label}>
              {url}
            </span>
            <button
              className={openBlankClassName}
              onClick={this.handleOpenBlank.bind(this)}
            >
              <OpenBlankIcon />
            </button>
            <button
              className={visibilityOffClassName}
              onClick={this.handleVisibilityOff.bind(this)}
            >
              <VisibilityOffIcon />
            </button>
          </div>
        ) : null}
      </span>
    )
  }
}
