import React, { Component } from 'react';
import { Entity, EditorState } from 'draft-js';

import styles from './LinkTooltip.css';

export default class LinkTooltip extends Component {
  handleClick(url, event) {
    event.preventDefault();

    window.open(url);
  }

  handleChangeData(key, event) {
    event.preventDefault();
    event.stopPropagation();

    const { entityKey, store } = this.props;
    const entity = Entity.get(entityKey);

    let newData;
    switch (key) {
      case 'nofollow':
        newData = {
          nofollow: !entity.data.nofollow
        }
      break;
      case 'target':
        newData = {
          target: '_self' === entity.data.target ? '_blank' : '_self'
        }
        break;
      default: break;
    }

    Entity.mergeData(entityKey, newData);

    const getEditorState = store.getItem('getEditorState');
    const setEditorState = store.getItem('setEditorState');

    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    setTimeout(() => {
      setEditorState(EditorState.forceSelection(editorState, selectionState));
    }, 0);
  }

  render() {
    const { entityKey } = this.props;
    const entity = Entity.get(entityKey);
    const { url, target, nofollow } = entity.data;

    return (
      <div className={styles.container}>
        <span className={styles.url} onClick={this.handleClick.bind(this, url)}>{url}</span>
        <button className={'_blank' === target ? `${styles.button} ${styles.active}` : styles.button} onClick={this.handleChangeData.bind(this, 'target')}>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
          </svg>
        </button>
        <button className={nofollow ? `${styles.button} ${styles.active}` : styles.button} onClick={this.handleChangeData.bind(this, 'nofollow')}>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>
            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
          </svg>
        </button>
      </div>
    );
  }
}
