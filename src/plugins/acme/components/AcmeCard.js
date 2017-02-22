import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './AcmeCard.css';

export default
class AcmeCard extends Component {
  render() {
    const { block } = this.props;
    const entity = Entity.get(block.getEntityAt(0));
    const { title } = entity.getData();

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
