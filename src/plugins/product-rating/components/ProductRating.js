import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './ProductRating.css';

export default class ProductRating extends Component {
  handleMouseDown() {
    this.props.blockProps.store.getItem('setReadOnly')(true);
  }

  handleMouseUp() {
    this.props.blockProps.store.getItem('setReadOnly')(false);
  }

  render() {
    const { block } = this.props;
    const entity = Entity.get(block.getEntityAt(0));
    const { rating, product } = entity.getData();
    const { img, title, description } = product;

    return (
      <div className={styles.card}>
        <div className={styles.img} style={{
          backgroundImage: `url(${img})`
        }} />
        <div className={styles.content}>
          <div className={styles.title}>
            { title }
          </div>
          <div className={styles.description}>
            { description }
          </div>
          <div className={styles.rating}>
            Note: <span className={styles.ratingLabel}>{rating}</span>
          </div>
        </div>
      </div>
    );
  }
}
