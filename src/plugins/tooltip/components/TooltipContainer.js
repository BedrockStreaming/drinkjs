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
      const { entityKey, boundingRect } = data;

      this.clearTimer && this.cancelClear();

      this.setState({
        entityKey,
        boundingRect,
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
    if (this.tooltip && this.state.boundingRect) {
      const { boundingRect } = this.state;
      const tooltipBoundingRect = findDOMNode(this.tooltip).getBoundingClientRect()
      const tooltipwidth = tooltipBoundingRect.width;

      const positions = {
        top: boundingRect.top + boundingRect.height + 8,
        left: boundingRect.left + (boundingRect.width / 2 ) - (tooltipwidth / 2),
      };

      this.setState({
        positions,
        boundingRect: null,
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
    const TooltipRenderer = renderers[entityType];

    if (!TooltipRenderer) {
      return null;
    }

    return (
      <div className={styles.container}>
        <div className={styles.tooltip} style={positions}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
        >
          <TooltipRenderer ref={node => this.tooltip = node} entityKey={entityKey} />
        </div>
      </div>
    );
  }
};
