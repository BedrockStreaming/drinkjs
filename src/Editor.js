import React, { Component } from 'react';

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
} from './plugins/toolbar';

import BoldIcon from './icons/BoldIcon';
import ItalicIcon from './icons/ItalicIcon';
import UnderlineIcon from './icons/UnderlineIcon';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
    createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
    createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
  ]
});

import 'draft-js/dist/Draft.css';

const defaultText = 'Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Praesent egestas tristique nibh. Aenean massa. Pellentesque dapibus hendrerit tortor. Nam commodo suscipit quam. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Nullam dictum felis eu pede mollis pretium. In ac felis quis tortor malesuada pretium. Aenean ut eros et nisl sagittis vestibulum. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.';

class DrinkEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorStateWithText(defaultText),
    };

    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    const { editorState } = this.state;
    const { InlineToolbar } = inlineToolbarPlugin;

    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          placeholder="Write something..."
          plugins={[
            inlineToolbarPlugin,
          ]}
        />
        <InlineToolbar />
      </div>
    );
  }
}

export default DrinkEditor;
