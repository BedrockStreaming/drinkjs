import React, { Component } from 'react';

import { Editor, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

class DrinkEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    const { editorState } = this.state;

    return (
      <Editor
        editorState={editorState}
        onChange={this.onChange}
        placeholder="Write something..."
      />
    );
  }
}

export default DrinkEditor;
