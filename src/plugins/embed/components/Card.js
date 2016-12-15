import React, { Component } from 'react';

import styles from './Card.css';

export default
class Card extends Component {
  render() {
    const { blockProps: { data } } = this.props;

    const {
      title = 'Untitled',
      thumbnail_url,
      description,
      html,
      type,
      url,
    } = data;

    // Probably loading
    if (!type) {
      return (
        <div className={styles.card}>
          {url}
        </div>
      );
    }

    // Handle oembed
    if (html) {
      return (
        <div
          className={styles.iframe}
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
