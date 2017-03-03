import React, { Component, PropTypes } from 'react';

import Draft, { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Immutable from 'immutable';

import 'draft-js/dist/Draft.css';
import './Draft.css';

import styles from './Editor.css';

const blockRenderMap = Immutable.Map({
  'paragraph': {
    element: 'paragraph'
  },
  'unstyled': {
    element: 'paragraph'
  }
});

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);

const basePlugin = {
  handleKeyCommand: (command, props) => {
    const newState = RichUtils.handleKeyCommand(
      props.getEditorState(),
      command
    );

    if (newState) {
      props.setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  },
  onTab: (event, props) => {
    const maxDepth = 4;

    props.setEditorState(RichUtils.onTab(
      event,
      props.getEditorState(),
      maxDepth
    ));
  }
}

class DrinkEditor extends Component {
  static propTypes = {
    state: PropTypes.object,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func,
    plugins: PropTypes.array,
  }

  static defaultProps = {
    onChange: () => {},
    readOnly: false,
    plugins: [],
  }

  constructor(props) {
    super(props);

    const { state, onChange } = props;

    this.state = {
      editorState: state ?
        EditorState.push(EditorState.createEmpty(), convertFromRaw(state)) :
        EditorState.createEmpty(),
    };

    this.onChange = editorState => {
      onChange(convertToRaw(editorState.getCurrentContent()));
      this.setState({ editorState });
    };

    this.onTab = (e) => {
      const maxDepth = 4;
      this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    };

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  renderPlugins() {
    const { plugins } = this.props;

    return plugins.reduce((prev, curr) => {
      curr.InlineToolbar && prev.push(React.createElement(curr.InlineToolbar, {
        key: 'inline-toolbar',
      }));

      curr.SideToolbar && prev.push(React.createElement(curr.SideToolbar, {
        key: 'side-toolbar',
      }));

      return prev;
    }, []);
  }

  handleKeyCommand(command: string): DraftHandleValue {

    const { editorState } = this.state;

    if (command === 'delete' ) {

      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const blockMap = contentState.getBlockMap();
      const startKey = selectionState.getStartKey();
      const endKey = selectionState.getEndKey();
      const startOffset = selectionState.getStartOffset();
      const endOffset = selectionState.getEndOffset();
      const startBlock = blockMap.get(startKey);
      const endBlock = blockMap.get(endKey);
      let mergedBlocks = [];

      // change the way to delete blocks if startblock is empty or if last block is not fully deleted
      if (startOffset === 0) {

        const blocksBefore = blockMap.toSeq().takeUntil((_, v) => (v === startKey));
        const blocksAfter = blockMap.toSeq().skipUntil((_, v) => (v === endKey)).rest();
        
        // get focus key (would be the block just after the last deleted one)
        let focusKey = editorState.getCurrentContent().getKeyAfter(endKey);

        // if part of lastblock must be kept, create a new block with remaining text
        if (endOffset < endBlock.getLength()) {
          let modifiedEndBlock = endBlock.merge({
            text: endBlock.getText().slice(endOffset),
            type: endBlock.getType()
          });

          mergedBlocks.push([modifiedEndBlock.getKey(), modifiedEndBlock]);
          focusKey = modifiedEndBlock.getKey();
        }

        const newBlocks = blocksBefore.concat(mergedBlocks, blocksAfter).toOrderedMap();

        const newContentState = contentState.merge({
          blockMap: newBlocks,
          selectionBefore: selectionState,
          selectionAfter: selectionState.merge({
            anchorKey: focusKey,
            anchorOffset: 0,
            focusKey: focusKey,
            focusOffset: 0,
            isBackward: false
          })
        });

        const newEditorState = EditorState.push(editorState, newContentState);

        if (newEditorState) {
          this.onChange(newEditorState);
          return 'handled';
        }
      }
    }

    return 'not-handled';
  }

  renderPlugins() {
    const { plugins } = this.props;

    return plugins.reduce((prev, curr, index) => {
      curr.Component && prev.push(React.createElement(curr.Component, {
        key: index,
      }));

      return prev;
    }, []);
  }

  render() {
    const { editorState } = this.state;
    const { plugins, readOnly } = this.props;

    return (
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          placeholder="Write something..."
          blockRenderMap={extendedBlockRenderMap}
          readOnly={readOnly}
          handleKeyCommand={this.handleKeyCommand}
          plugins={[basePlugin, ...plugins]}
        />

        {this.renderPlugins()}
      </div>
    );
  }

  getContent = () => {
    return convertToRaw(this.state.editorState.getCurrentContent())
  }
}

export default DrinkEditor;
