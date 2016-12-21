import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import copy from 'copy-to-clipboard';

import Editor from '../src/Editor';

import state from './state.json';
import styles from './index.css';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
  createBlockStyleButton,
  createTextAlignmentButton,
  Separator,
  createEntityButton,
} from '../src/plugins/inline-toolbar';
import createBlockBreakoutPlugin from '../src/plugins/breakout';
import createLinkPlugin, { linkStrategy, FormLink, LINK, LinkTooltip } from '../src/plugins/link';
import createTooltipPlugin, { tooltipEnhancer } from '../src/plugins/tooltip';
import selectionContainsEntity from '../src/utils/selectionContainsEntity';

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
import LinkIcon from '../src/icons/LinkIcon';

const blockBreakoutPlugin = createBlockBreakoutPlugin();

const LinkButton = createEntityButton({
  entityType: LINK,
  isActive: selectionContainsEntity(linkStrategy),
  children: <LinkIcon />,
});

const inlineToolbarPlugin = createInlineToolbarPlugin({
  buttons: [
    createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
    createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
    createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
    createInlineStyleButton({ style: 'STRIKETHROUGH', children: <StrikethroughIcon /> }),
    LinkButton,
    Separator,
    createBlockStyleButton({ blockType: 'header-one', children: <HeadingOneIcon /> }),
    createBlockStyleButton({ blockType: 'header-two', children: <HeadingTwoIcon /> }),
    createBlockStyleButton({ blockType: 'header-three', children: <HeadingThreeIcon /> }),
    createBlockStyleButton({ blockType: 'blockquote', children: <BlockquoteIcon /> }),
    createBlockStyleButton({ blockType: 'unordered-list-item', children: <UnorderedListIcon /> }),
    createBlockStyleButton({ blockType: 'ordered-list-item', children: <OrderedListIcon /> }),
    Separator,
    createTextAlignmentButton({ alignment: 'left', children: <AlignmentLeftIcon /> }),
    createTextAlignmentButton({ alignment: 'center', children: <AlignmentCenterIcon /> }),
    createTextAlignmentButton({ alignment: 'right', children: <AlignmentRightIcon /> }),
  ],
  renderers: {
    [LINK]: FormLink
  }
});

const linkPlugin = createLinkPlugin({ enhancer: tooltipEnhancer });

const tooltipPlugin = createTooltipPlugin({
  renderers: {
    [LINK]: LinkTooltip,
  }
});

const plugins = [
  blockBreakoutPlugin,
  inlineToolbarPlugin,
  linkPlugin,
  tooltipPlugin,
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
