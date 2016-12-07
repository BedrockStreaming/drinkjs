import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import { getCurrentBlock, addNewBlock } from './utils';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
  createBlockStyleButton,
  Separator,
} from './plugins/toolbar';

import { Block, HANDLED, NOT_HANDLED } from './constants'

import BoldIcon from './icons/BoldIcon';
import ItalicIcon from './icons/ItalicIcon';
import UnderlineIcon from './icons/UnderlineIcon';
import StrikethroughIcon from './icons/StrikethroughIcon';
import HeadingOneIcon from './icons/HeadingOneIcon'
import HeadingTwoIcon from './icons/HeadingTwoIcon'
import HeadingThreeIcon from './icons/HeadingThreeIcon'
import BlockquoteIcon from './icons/BlockquoteIcon'

import 'draft-js/dist/Draft.css';
import './Editor.css'

const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
    createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
    createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
    createInlineStyleButton({ style: 'STRIKETHROUGH', children: <StrikethroughIcon /> }),
    Separator,
    createBlockStyleButton({ blockType: Block.H1, children: <HeadingOneIcon /> }),
    createBlockStyleButton({ blockType: Block.H2, children: <HeadingTwoIcon /> }),
    createBlockStyleButton({ blockType: Block.H3, children: <HeadingThreeIcon /> }),
    createBlockStyleButton({ blockType: Block.BLOCKQUOTE, children: <BlockquoteIcon /> }),
  ]
});

const defaultText = 'Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Praesent egestas tristique nibh. Aenean massa. Pellentesque dapibus hendrerit tortor. Nam commodo suscipit quam. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Nullam dictum felis eu pede mollis pretium. In ac felis quis tortor malesuada pretium. Aenean ut eros et nisl sagittis vestibulum. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.';

class DrinkEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEditorStateWithText(defaultText),
    };

    this.onChange = (editorState) => this.setState({editorState});
    this.handleReturn = this._handleReturn.bind(this)
  }

  _handleReturn(e) {
    const { editorState } = this.state;

    if (!e.altKey && !e.metaKey && !e.ctrlKey) {
      const currentBlock = getCurrentBlock(editorState)
      const blockType = currentBlock.getType()
      const blockLength = currentBlock.getLength()

      if (Block.UNSTYLED !== blockType) {
        if (0 === blockLength) {
          this.onChange(addNewBlock(editorState));

          return HANDLED
        }
      }
    }

    return NOT_HANDLED
  }

  render() {
    const { editorState } = this.state;
    const { InlineToolbar } = inlineToolbarPlugin;

    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          handleReturn={this.handleReturn}
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
