import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Entity } from 'draft-js';
import { throttle } from 'lodash';

import styles from './TooltipContainer.css';

const initialState = {
  entityKey: null,
  positions: null,
};

export default class TooltipContainer extends Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    renderers: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = initialState;

    this.clear = this._clear.bind(this);
    this.delayClear = this._delayClear.bind(this);
    this.cancelClear = this._cancelClear.bind(this);
    this.handleUpdate = this._handleUpdate.bind(this);
    this.handleResize = throttle(this._handleResize.bind(this), 300);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
    this.props.store.subscribeToItem('data', this.handleUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.props.store.unsubscribeFromItem('data', this.handleUpdate);
  }

  _handleUpdate(data) {
    if (data) {
      const { entityKey, target } = data;

      this.clearTimer && this.cancelClear();

      this.setState({
        entityKey,
        target
      });
    } else {
      this.delayClear();
    }
  }

  _handleResize() {
    this.clear();
  }

  _delayClear() {
    this.clearTimer = setTimeout(this.clear, 500);
  }

  _cancelClear() {
    clearTimeout(this.clearTimer);
    this.clearTimer = null;
  }

  _clear() {
    this.setState(initialState);
  }

  onMouseEnter() {
    if (this.clearTimer) {
      this.cancelClear();
    }
  }

  onMouseLeave() {
    this.delayClear();
  }

  componentDidUpdate() {
    if (this.tooltip && this.state.target) {
      const { target } = this.state;
      const { top, left, width, height } = findDOMNode(target).getBoundingClientRect();

      const tooltipBoundingRect = findDOMNode(this.tooltip).getBoundingClientRect()
      const tooltipWidth = tooltipBoundingRect.width;

      const positions = {
        top: top + height + document.body.scrollTop + 8,
        left: left + document.body.scrollLeft + (width / 2 ) - (tooltipWidth / 2),
      };

      this.setState({
        positions,
        target: null,
      });
    }
  }

  render() {
    const { renderers } = this.props;
    const { entityKey, positions } = this.state;

    if (!entityKey) {
      return null;
    }

    const entity = Entity.get(entityKey);
    const entityType = entity.getType();

    // call renderer
    const renderer = renderers[entityType];

    if (!renderer) {
      return null;
    }

    let content;

    if (renderer.text || renderer.getText) {
      content = (
        <span ref={node => this.tooltip = node}>
          {renderer.text || renderer.getText(entity.data)}
        </span>
      );
    } else {
      const Component = renderer.component;

      content = <Component ref={node => this.tooltip = node} entityKey={entityKey} />
    }

    return (
      <div className={styles.container}>
        <div className={styles.tooltip} style={positions}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
        >
          {content}
        </div>
      </div>
    );
  }
};
