import React, { Component } from 'react';

import styles from './LinkObject.css';

export default class LinkObject extends Component {
  render() {
    return (
      <span className={styles.link}>
        {this.props.children}
      </span>
    )
  }
}
