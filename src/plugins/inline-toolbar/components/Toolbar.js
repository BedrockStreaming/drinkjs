import React from 'react';
import { getVisibleSelectionRect } from 'draft-js';
import styles from './Toolbar.css';

// TODO make toolbarHeight to be determined or a parameter
const toolbarHeight = 44;

export default class Toolbar extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    buttons: React.PropTypes.array,
    renderers: React.PropTypes.object,
  };

  static defaultProps = {
    buttons: [],
    renderers: {}
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.store.subscribeToItem('isVisible', this.onVisibilityChanged);
    this.props.store.subscribeToItem('entityType', this.onEntityTypeChanged);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('isVisible', this.onVisibilityChanged);
    this.props.store.unsubscribeFromItem('entityType', this.onEntityTypeChanged);
  }

  onVisibilityChanged = isVisible => {
    // need to wait a tick for window.getSelection() to be accurate
    // when focusing editor with already present selection
    setTimeout(() => {
      const selectionRect = isVisible ? getVisibleSelectionRect(window) : undefined;
      const position = selectionRect ? {
        top: (selectionRect.top + window.scrollY) - toolbarHeight,
        left: selectionRect.left + window.scrollX + (selectionRect.width / 2),
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      } : {
        transform: 'translate(-50%) scale(0)',
      };
      this.setState({
        position,
      });
    }, 0);
  }

  onEntityTypeChanged = entityType => {
    this.setState({
      entityType,
    });
  }

  getRenderer() {
    const { renderers } = this.props;
    const { entityType } = this.state;

    return renderers[entityType] || null;
  }

  handleSubmit() {
    this.props.store.updateItem('entityType', null);
  }

  handleCancel() {
    this.props.store.updateItem('entityType', null);
  }

  renderContent() {
    const { buttons, store } = this.props;
    const { entityType } = this.state;

    if (entityType) {
      const Renderer = this.getRenderer();

      if (Renderer) {
        return (
          <Renderer
            getEditorState={store.getItem('getEditorState')}
            setEditorState={store.getItem('setEditorState')}
            onSubmit={this.handleSubmit.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          />
        )
      }
    }

    return buttons.map((Button, index) => (
      <Button
        key={index}
        theme={styles}
        store={store}
      />
    ))
  }

  render() {
    if (!this.props.buttons.length) {
      return null;
    }

    const { position } = this.state;

    return (
      <div
        className={styles.toolbar}
        style={position}
      >
        {this.renderContent()}
      </div>
    );
  }
}
