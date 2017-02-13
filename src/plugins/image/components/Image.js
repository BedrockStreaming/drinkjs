import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './Image.css';

export default class Image extends Component {
  render() {
    const { block } = this.props;

    const entity = Entity.get(block.getEntityAt(0));
    const data = entity.getData();

    // const { blockProps: { data } } = this.props;
    console.warn('this.props', this.props);
    //
    return (
      <img src={data.url} className={styles.image} role="presentation" />
    );
  }
}
