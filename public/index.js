import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import copy from 'copy-to-clipboard';

import state from './state.json';
import styles from './index.css';

import {
  // editor
  DrinkEditor,

  // inline toolbar
  createInlineToolbarPlugin,
  createInlineStyleButton,
  createBlockStyleButton,
  createTextAlignmentButton,
  Separator,
  createEntityButton,

  // side toolbar
  createSideToolbarPlugin,
  createToggleBlockTypeButton,

  // embed toolbar
  createEmbedPlugin,

  // breakout plugin
  createBlockBreakoutPlugin,

  // link plugin
  createLinkPlugin,
  FormLink,
  LINK,
  LINK_MUTABILITY,

  // tooltip plugin
  createTooltipPlugin,

  // ICONS
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  HeadingOneIcon,
  HeadingTwoIcon,
  HeadingThreeIcon,
  BlockquoteIcon,
  UnorderedListIcon,
  OrderedListIcon,
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
  LinkIcon,
  CodeBlockIcon,
} from '../src/Drink';

// -- Embed plugin
const EMBEDLY_ENDPOINT = 'https://api.embed.ly/1/oembed';
const EMBEDLY_KEY = '12672a12720e4ae7b136ccdb3a2aa0a1';

const getData = (url) => {
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
};

class App extends Component {
  constructor(props) {
    super(props);

    this.initPlugins();
  }

  initPlugins() {
    // -- Breakout plugin
    const blockBreakoutPlugin = createBlockBreakoutPlugin();

    // -- Tooltip plugin
    const tooltipPlugin = createTooltipPlugin();

    // -- Link plugin
    const linkPlugin = createLinkPlugin({ enhancer: tooltipPlugin.tooltipEnhancer });

    // define tooltip renderers
    tooltipPlugin.setRenderers({
      [LINK]: { component: linkPlugin.TooltipLink },
    });

    // -- Embed plugin
    const embedPlugin = createEmbedPlugin({
      getData,
    });

    // -- Inline toolbar plugin
    const inlineToolbarPlugin = createInlineToolbarPlugin({
      buttons: [
        createInlineStyleButton({ style: 'BOLD', children: <BoldIcon /> }),
        createInlineStyleButton({ style: 'ITALIC', children: <ItalicIcon /> }),
        createInlineStyleButton({ style: 'UNDERLINE', children: <UnderlineIcon /> }),
        createInlineStyleButton({ style: 'STRIKETHROUGH', children: <StrikethroughIcon /> }),
        createEntityButton({
          entityType: LINK,
          entityMutability: LINK_MUTABILITY,
          children: <LinkIcon />,
        }),
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

    this.plugins = [
      embedPlugin,
      inlineToolbarPlugin,
      sideToolbarPlugin,
      linkPlugin,
      tooltipPlugin,
      blockBreakoutPlugin,
    ];
  }

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
        <DrinkEditor
          state={state}
          plugins={this.plugins}
          onChange={state => this.handleChange(state)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
