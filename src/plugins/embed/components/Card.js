import React, { Component } from 'react';

import styles from './Card.css';

export default
class Card extends Component {
  render() {
    const {
      blockProps: {
        title,
        thumbnail_url,
        description,
        url,
      }
    } = this.props;

    // Probably loading
    if (!title) {
      return (
        <div className={styles.card}>{url}</div>
      );
    }

    return (
      <div className={styles.card}>
        {thumbnail_url && (
          <img className={styles.thumbnail} src={thumbnail_url} role="presentation" />
        )}

        <div className={styles.content}>
          <div className={styles.title}>{title}</div>

          {description && (
            <div className={styles.desc}>{description}</div>
          )}
        </div>
      </div>
    );
  }
}
