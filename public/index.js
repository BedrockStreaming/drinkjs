import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import copy from 'copy-to-clipboard';

import Editor from '../src/Editor';

import state from './state.json';
import styles from './index.css';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
} from '../src/plugins/toolbar';

import BoldIcon from '../src/icons/BoldIcon';
import ItalicIcon from '../src/icons/ItalicIcon';
import UnderlineIcon from '../src/icons/UnderlineIcon';
import StrikethroughIcon from '../src/icons/StrikethroughIcon';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
    createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
    createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
    createInlineStyleButton({ style: 'STRIKETHROUGH', children: <StrikethroughIcon /> }),
  ]
});

const plugins = [
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
    copy(
      JSON.stringify(this.getCurrentState(), null, 2),
      {
        debug: true,
      }
    );
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
