import React, { Component } from 'react';

import styles from './Link.css';

export default class Link extends Component {
  render() {
    return (
      <span className={styles.link}>
        {this.props.children}
      </span>
    )
  }
}
