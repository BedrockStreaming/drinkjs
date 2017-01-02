import React, { Component } from 'react';
import { LINK, LINK_MUTABILITY } from '../utils/constants';

import styles from './FormLink.css';

export default class FormLink extends Component {
  static propTypes = {
    onSubmit: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = { url: '' };
  }

  componentDidMount() {
    this.textInput.focus();
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 13:
        event.preventDefault();
        event.stopPropagation();
        this.handleAddLink(event);
        break;
      case 27:
        this.handleCancel(event);
        break;
      default:
        break;
    }
  }

  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  handleCancel(event) {
    event.preventDefault();

    this.props.onCancel();
  }

  handleAddLink(event) {
    if (!this.state.url.length) {
      return this.handleCancel(event);
    }

    const data = {
      url: this.state.url,
    };

    this.props.onSubmit({
      entityType: LINK,
      entityMutability: LINK_MUTABILITY,
      data
    });
  }

  render() {
    return (
      <div className={styles.controls}>
        <input
           ref={input => this.textInput = input}
           type="text"
           className={styles.input}
           placeholder="Paste or type a link"
           onKeyDown={this.handleKeyDown.bind(this)}
           onChange={this.handleChange.bind(this)}
        />
        <button className={styles.button} onClick={this.handleCancel.bind(this)}>
          <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </button>
      </div>
    )
  }
}
