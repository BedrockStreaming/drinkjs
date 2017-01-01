import React, { Component, PropTypes } from 'react';

import Draft, { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import Immutable from 'immutable';

import 'draft-js/dist/Draft.css';
import './Draft.css';

import styles from './Editor.css';


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
    customStyleMap: {}
  }

  resolveCustomStyleMap = () => (
    this.props.plugins
     .filter((plug) => plug.customStyleMap !== undefined)
     .map((plug) => plug.customStyleMap)
     .concat([this.props.customStyleMap])
     .reduce((styles, style) => (
       {
         ...styles,
         ...style,
       }
     ), {})
  );

   resolveblockRenderMap = () => {
    let blockRenderMap = this.props.plugins
      .filter((plug) => plug.blockRenderMap !== undefined)
      .reduce((maps, plug) => maps.merge(plug.blockRenderMap), Immutable.Map({}));
    if (this.props.defaultBlockRenderMap) {
      blockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);
    }
    if (this.props.blockRenderMap) {
      blockRenderMap = blockRenderMap.merge(this.props.blockRenderMap);
    }
    return blockRenderMap;
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

  }


  render() {
    const { editorState } = this.state;
    const { plugins, readOnly } = this.props;
    const blockRenderMap = this.resolveblockRenderMap(); 
    const customStyleMap = this.resolveCustomStyleMap();

    return (
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          onTab={this.onTab}
          placeholder="Write something..."
          customStyleMap={customStyleMap}
          blockRenderMap={blockRenderMap}
          readOnly={readOnly}
          plugins={plugins}
         
        />

        {plugins.map((plugin) => 
           {return plugin.InlineToolbar ? React.createElement(plugin.InlineToolbar):null}
        )}
      </div>
    );
  }
}

export default DrinkEditor;
