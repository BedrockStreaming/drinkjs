import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './Tooltip.css';

export default class Tooltip extends Component {
  render() {
    const { entityKey } = this.props;

    return (
      <span className={styles.tooltip} title={Entity.get(entityKey).data.url}>
        {this.props.children}
      </span>
    )
  }
}
