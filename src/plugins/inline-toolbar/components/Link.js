import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './Link.css';

export default class Link extends Component {
  render() {
    const { entityKey } = this.props;

    return (
      <span className={styles.link} title={Entity.get(entityKey).data.url}>
        {this.props.children}
      </span>
    )
  }
}
