import React, { Component } from 'react';

export default (ComponentToWrap) => class EnhancedTooltip extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
  }

  handleMouseEnter(event) {
    event.preventDefault();

    const { entityKey } = this.props;
    // get wrapper position in document
    const { top, left, width, height } = this.wrapper.getBoundingClientRect();

    // update store for displaying tooltip at position
    this.props.store.updateItem('data', {
      entityKey,
      boundingRect: {
        top,
        left,
        width,
        height,
      }
    });
  }

  handleMouseLeave(event) {
    event.preventDefault();

    this.props.store.updateItem('data', null);
  }

  render() {
    return (
      <span ref={node => this.wrapper = node}
         onMouseEnter={this.handleMouseEnter.bind(this)}
         onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <ComponentToWrap {...this.props} />
      </span>
    );
  }
}
