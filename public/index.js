import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
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

import createSideToolbarPlugin, {
  createToggleBlockTypeButton,
} from '../src/plugins/side-toolbar';

import createEmbedPlugin, {
  createSideToolbarEmbedButton,
} from '../src/plugins/embed';

import createBlockBreakoutPlugin from '../src/plugins/breakout';
import createLinkPlugin, { FormLink, LINK, LINK_MUTABILITY } from '../src/plugins/link';
import createTooltipPlugin from '../src/plugins/tooltip';

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
import CodeBlockIcon from '../src/icons/CodeBlockIcon';

const LinkButton = createEntityButton({
  entityType: LINK,
  entityMutability: LINK_MUTABILITY,
  children: <LinkIcon />,
});

// -- Breakout plugin
const blockBreakoutPlugin = createBlockBreakoutPlugin();

// -- Tooltip plugin
const tooltipPlugin = createTooltipPlugin();

// -- Link plugin
const linkPlugin = createLinkPlugin({ enhancer: tooltipPlugin.tooltipEnhancer });

tooltipPlugin.setRenderers({
  [LINK]: { component: linkPlugin.TooltipLink },
});

// -- Embed plugin
const EMBEDLY_ENDPOINT = 'https://api.embed.ly/1/oembed';
const EMBEDLY_KEY = '12672a12720e4ae7b136ccdb3a2aa0a1';

const embedPlugin = createEmbedPlugin({
  getData: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(EMBEDLY_ENDPOINT)
        .type('json')
        .query({ key: EMBEDLY_KEY })
        .query({ urls: url })
        .end((err, { body }) => {
          if (err) {
            reject(err);
          }
          else if (body[0].type === 'error') {
            reject(body[0].error_message);
          }
          else {
            resolve(body[0]);
          }
        });
    });
  },
});

// -- Inline toolbar plugin
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

// -- Side toolbar plugin
const sideToolbarPlugin = createSideToolbarPlugin({
  buttons: [
    embedPlugin.createSideToolbarButton(),
  ],
});

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
          plugins={[
            embedPlugin,
            inlineToolbarPlugin,
            sideToolbarPlugin,
            linkPlugin,
            tooltipPlugin,
            blockBreakoutPlugin,
          ]}
          onChange={state => this.handleChange(state)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
