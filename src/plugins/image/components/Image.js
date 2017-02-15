import React, { Component } from 'react';
import { EditorBlock } from 'draft-js';

import styles from './Image.css';

export default class ImageWrapper extends Component {
  render() {
    const { block } = this.props;
    const data = block.getData();

    const url = data.get('url');
    const alt = data.get('alt') || '';

    if (!url) {
      return null;
    }

    return (
      <div className={styles.figure}>
        <div suppressContentEditableWarning contentEditable="false">
          <img src={url} alt={alt} className={styles.image} role="presentation" />
        </div>
        <figcaption className={styles.caption}>
          <EditorBlock {...this.props} />
        </figcaption>
      </div>
    );
  }
}
