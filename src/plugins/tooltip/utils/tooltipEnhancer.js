import React, { Component } from 'react';

export default ComponentToWrap => class EnhancedTooltip extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
  }

  handleMouseEnter(event) {
    event.preventDefault();

    const { entityKey } = this.props;

    this.props.store.updateItem('data', {
      entityKey,
      target: this.wrapper,
    });
  }

  handleMouseLeave(event) {
    event.preventDefault();

    this.props.store.updateItem('data', null);
  }

  render() {
    /*eslint-disable no-unused-vars*/
    const { store, ...props } = this.props;
    /*eslint-enable no-unused-vars*/

    return (
      <span
        ref={node => this.wrapper = node}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <ComponentToWrap {...props} />
      </span>
    );
  }
}
