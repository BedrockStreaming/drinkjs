import React, { Component } from 'react';

import styles from './AcmeCard.css';

export default
class AcmeCard extends Component {
  render() {
    const { block } = this.props;
    console.warn(block);
    console.log('tes');
    const {
      blockProps: {
        title
      }
    } = this.props;

    // Probably loading
    if (!title) {
      return (
        <div className={styles.acmeCard}>No title has been specified</div>
      );
    }

    return (
      <div className={styles.acmeCard}>
          <div>ACME TEST BLOCK</div>
          <div className={styles.title}>{title}</div>
      </div>
    );
  }
}
