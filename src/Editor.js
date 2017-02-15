import React, { Component, PropTypes } from 'react';

import Draft, { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Immutable from 'immutable';

import 'draft-js/dist/Draft.css';
import './Draft.css';

import styles from './Editor.css';

const blockRenderMap = Immutable.Map({
  'paragraph': {
    element: 'paragraph',
  },
  'unstyled': {
    element: 'paragraph',
  },
  'atomic:image': {
    element: 'figure',
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
