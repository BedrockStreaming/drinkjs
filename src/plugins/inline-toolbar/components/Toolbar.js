import React from 'react';
import { EditorState, Entity, RichUtils, getVisibleSelectionRect } from 'draft-js';
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
        transition: '0.15s cubic-bezier(0.3, 1.2, 0.2, 1)',
        transitionProperty: 'transform top left',
      } : null;

      this.setState({ position });
    }, 0);
  }

  onEntityTypeChanged = entityType => {
    const { position } = this.state;

    this.setState({ position: null });

    setTimeout(() => {
      this.setState({
        entityType,
        position,
      });
    }, 0);
  }

  getRenderer() {
    const { renderers } = this.props;
    const { entityType } = this.state;

    return renderers[entityType] || null;
  }

  handleAddEntity({ entityType, entityMutability, data}) {
    const { store } = this.props;
    const getEditorState = store.getItem('getEditorState');
    const setEditorState = store.getItem('setEditorState');
    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    const entityKey = Entity.create(entityType, entityMutability, data);

    // toggle link execute 'apply-entity' command, not specific to LINK
    const newEditorState = RichUtils.toggleLink(
      editorState,
      selectionState,
      entityKey
    );

    setTimeout(() => {
      setEditorState(EditorState.forceSelection(newEditorState, selectionState));
    }, 0);

    store.updateItem('entityType', null);
  }

  handleCancel() {
    const { store } = this.props;
    const getEditorState = store.getItem('getEditorState');
    const setEditorState = store.getItem('setEditorState');
    const editorState = getEditorState();
    const selectionState = editorState.getSelection();

    setTimeout(() => {
      setEditorState(EditorState.forceSelection(editorState, selectionState));
    }, 0);

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
            onSubmit={this.handleAddEntity.bind(this)}
            onCancel={this.handleCancel.bind(this)}
          />
        )
      }
    }

    return buttons.map((Button, index) => (
      <Button key={index} theme={styles} store={store} />
    ))
  }

  render() {
    if (!this.props.buttons.length) {
      return null;
    }

    const { position } = this.state;

    const style = position || {
      transform: 'translate(-50%) scale(0)',
    };

    return (
      <div className={styles.toolbar} style={style}>
        {position && this.renderContent()}
      </div>
    );
  }
}
