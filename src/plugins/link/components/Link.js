import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './Link.css';

export default class Link extends Component {
  render() {
    const { entityKey } = this.props;
    const entity = Entity.get(entityKey);

    const { url } = entity.data;

    return (
      <span className={styles.link} title={url}>
        {this.props.children}
      </span>
    )
  }
}
