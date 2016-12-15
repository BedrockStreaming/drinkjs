import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import copy from 'copy-to-clipboard';

import Editor from '../src/Editor';

import state from './state.json';
import styles from './index.css';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockMultipleStyleButton,
  createTextAlignmentButton,
  Separator,
} from '../src/plugins/toolbar';
import createBlockBreakoutPlugin from '../src/plugins/breakout';

import BoldIcon from '../src/icons/BoldIcon';
import ItalicIcon from '../src/icons/ItalicIcon';
import UnderlineIcon from '../src/icons/UnderlineIcon';
import StrikethroughIcon from '../src/icons/StrikethroughIcon';
import HeadingOneIcon from '../src/icons/HeadingOneIcon'
import HeadingTwoIcon from '../src/icons/HeadingTwoIcon'
import HeadingThreeIcon from '../src/icons/HeadingThreeIcon'
import BlockquoteIcon from '../src/icons/BlockquoteIcon'
import UnorderedListIcon from '../src/icons/UnorderedListIcon'
import OrderedListIcon from '../src/icons/OrderedListIcon'
import AlignmentLeftIcon from '../src/icons/AlignmentLeftIcon';
import AlignmentCenterIcon from '../src/icons/AlignmentCenterIcon';
import AlignmentRightIcon from '../src/icons/AlignmentRightIcon';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
    createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
    createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
    createInlineStyleButton({ style: 'STRIKETHROUGH', children: <StrikethroughIcon /> }),
    Separator,
    createBlockMultipleStyleButton([
      { blockType: 'header-one', children: <HeadingOneIcon /> },
      { blockType: 'header-two', children: <HeadingTwoIcon /> },
      { blockType: 'header-three', children: <HeadingThreeIcon /> },
    ]),
    createBlockStyleButton({ blockType: 'blockquote', children: <BlockquoteIcon /> }),
    createBlockStyleButton({ blockType: 'unordered-list-item', children: <UnorderedListIcon /> }),
    createBlockStyleButton({ blockType: 'ordered-list-item', children: <OrderedListIcon /> }),
    Separator,
    createTextAlignmentButton({ alignment: 'left', children: <AlignmentLeftIcon /> }),
    createTextAlignmentButton({ alignment: 'center', children: <AlignmentCenterIcon /> }),
    createTextAlignmentButton({ alignment: 'right', children: <AlignmentRightIcon /> }),
  ]
});

const blockBreakoutPlugin = createBlockBreakoutPlugin();

const plugins = [
  blockBreakoutPlugin,
  inlineToolbarPlugin,
];

class App extends Component {
  handleChange(state) {
    this.state = state;
  }

  getCurrentState() {
    return this.state || state;
  }

  handleLogState() {
    console.log(this.getCurrentState());
  }

  handleCopyStateToClipboard() {
    copy(JSON.stringify(this.getCurrentState(), null, 2));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <button onClick={() => this.handleLogState()}>
            Log state
          </button>
          <button onClick={() => this.handleCopyStateToClipboard()}>
            Copy state to clipboard
          </button>
        </div>
        <Editor
          state={state}
          plugins={plugins}
          onChange={state => this.handleChange(state)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
