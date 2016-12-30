import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './TooltipLinkObject.css';

export default class TooltipLinkObject extends Component {
  render() {
    const { entityKey } = this.props;
    const entity = Entity.get(entityKey);
    const { title, type } = entity.data;

    return (
      <div className={styles.container}>
        [{type}] - {title}
      </div>
    );
  }
}
