import React from 'react';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';

import Toggler from './Toggler';

import styles from './Toolbar.css';

export default class Toolbar extends React.Component {

  state = {
    position: {
      transform: 'scale(0)',
    },
    open: false,
  }

  componentDidMount() {
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
    this.props.store.subscribeToItem('isOpen', this.onIsOpenChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem('editorState', this.onEditorStateChange);
    this.props.store.unsubscribeFromItem('isOpen', this.onIsOpenChange);
  }

  onIsOpenChange = () => {
    this.setState({
      open: this.props.store.getItem('isOpen'),
    });
  }

  onEditorStateChange = (editorState) => {
    const selection = editorState.getSelection();

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const type = currentBlock.getType();
    const length = currentBlock.getLength();

    if (type !== 'unstyled' || length || !selection.getHasFocus()) {
      this.setState({
        position: {
          transform: 'scale(0)',
        },
      });

      this.props.store.updateItem('isOpen', false);

      return;
    }

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);

    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`)[0];
      const top = node.getBoundingClientRect().top;
      const editor = this.props.store.getItem('getEditorRef')().refs.editor;

      this.setState({
        position: {
          top: (top + window.scrollY) - 4,
          left: editor.getBoundingClientRect().left - 60,
          transform: 'scale(1)',
          transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        },
      });
    }, 0);
  }

  handleToggle(e) {
    e.preventDefault();
    this.props.store.updateItem('isOpen', !this.state.open);
  }

  getButtonStyles() {
    if (!this.state.open) {
      return [];
    }

    return this.props.buttons.map((Component, index) => ({
      key: index,
      style: { scale: 1 },
    }));
  }

  render() {
    const { open } = this.state;
    const { buttons, store } = this.props;

    return (
      <div className={styles.toolbar} style={this.state.position}>
        <Toggler
          className={styles.toggler}
          active={open}
          onClick={e => this.handleToggle(e)}
        />

        {buttons.map((Component, index) => {
          let delay = index * .02;

          if (!open) {
            delay = (buttons.length - index - 1) * .02;
          }

          return (
            <div
              key={index}
              className={styles.button}
              style={{
                transitionProperty: `transform opacity`,
                transitionDuration: '.1s',
                transitionDelay: `${delay}s`,
                transform: `scale(${open ? 1 : 0})`,
                opacity: (open ? 1 : 0),
              }}
            >
              <Component
                getEditorState={store.getItem('getEditorState')}
                setEditorState={store.getItem('setEditorState')}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
