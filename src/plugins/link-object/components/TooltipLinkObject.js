import React, { Component } from 'react';
import { Entity } from 'draft-js';

import styles from './TooltipLinkObject.css';

export default class TooltipLinkObject extends Component {
  handleClick(url, event) {
    event.preventDefault();

    window.open(url);
  }

  render() {
    const { entityKey } = this.props;
    const entity = Entity.get(entityKey);
    const { title, type , url } = entity.data;

    return (
      <div className={styles.container}>
          <span className={styles.label}>[{type}] - {title}</span><br/>
          <span onClick={this.handleClick.bind(this, url)} className={styles.url}>{url}</span>
      </div>
    );
  }
}
