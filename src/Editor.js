import React, { Component, PropTypes } from 'react';

import Draft, { ContentState,EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
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

    this.onChange = (editorState) => {
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
    console.log(command);
    const { editorState } = this.state;
    if (command === 'delete') {

      var contentState = editorState.getCurrentContent();
      var selectionState = contentState.getSelectionAfter();
      var blockMap = contentState.getBlockMap();
      var startKey = selectionState.getStartKey();
      var endKey =  editorState.getCurrentContent().getKeyAfter(startKey);
      var startOffset = selectionState.getStartOffset();
      var endOffset = selectionState.getEndOffset();
      var startBlock = blockMap.get(startKey);
      var endBlock = blockMap.get(endKey);
      console.log(startBlock);
      console.log(endBlock);
      console.log("startOffset " + startOffset);
      console.log("endOffset " + endOffset);
      console.log("startKey " + startKey);
      console.log("endKey " + endKey);
      var newstate;
      console.log(startBlock.getText());
      if(startBlock.getText().length == 0)
      {console.log("in length");
        var modifiedStart = startBlock.merge({
          text: startBlock.getText().slice(0, startOffset) + endBlock.getText().slice(endOffset),
          type: endBlock.getType()
        });

        console.log(modifiedStart);
        console.log(blockMap);
        console.log("blockMap");
        
        const skipuntilvalue = blockMap.toSeq().skipUntil(function (_, k) {
          return k === startKey;
        });
        console.log("skipuntil");
        console.log(skipuntilvalue);
        
        const takeuntilvalue = skipuntilvalue.takeUntil(function (_, k) {
          return k === endKey;
        }) ;
        console.log("takeuntil");
        console.log(takeuntilvalue);

        var newBlocks = blockMap.toSeq().skipUntil(function (_, k) {
          return k === startKey;
        }).takeUntil(function (_, k) {
          return k === endKey;
        }).concat(Immutable.Map([[endKey, null]])).map(function (_, k) {
          return k === startKey ? modifiedStart : null;
        });



         blockMap = blockMap.merge(newBlocks).filter(function (block) {
          return !!block;
        });

        console.log(blockMap);
        console.log("newBlocks");

          const newContentState = contentState.merge({
            blockMap: blockMap,
            selectionBefore: selectionState,
            selectionAfter: selectionState.merge({
              anchorKey: startKey,
              anchorOffset: startOffset,
              focusKey: startKey,
              focusOffset: startOffset,
              isBackward: true
            })
          });


          console.log("contentState");
          console.log(contentState);
          console.log("newContentState");
          console.log(newContentState);
         
          var newContentState2 = ContentState.createFromText("text");

          newContentState2 = newContentState2.merge({
            blockMap: blockMap
          });
          console.log("newContentState2");
          console.log(newContentState2);
          
          console.log("editorState");
          console.log(editorState);




          const newEditorState = EditorState.push(editorState, newContentState);

          
          // get all active inline style
          const currentInlineStyles = editorState.getCurrentInlineStyle().toArray();

          console.log("newEditorState");
          console.log(newEditorState);

          // toggle style
          const nextEditorState = currentInlineStyles.reduce((editorState, style) => (
            RichUtils.toggleInlineStyle(editorState, style)
          ), newEditorState);

        if (newEditorState) {
            this.onChange(newEditorState);
            return 'handled';
          }

        return 'handled';
      }else
        return 'not-handled'
    }
    return 'not-handled';
  }

  render() {
    console.log("render");
    const { editorState } = this.state;
    const { plugins, readOnly } = this.props;

    return (
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          onTab={this.onTab}
          placeholder="Write something..."
          blockRenderMap={extendedBlockRenderMap}
          readOnly={readOnly}
          plugins={plugins}
        />

        {this.renderPlugins()}
      </div>
    );
  }
}

export default DrinkEditor;
