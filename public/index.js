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
  createSideToolBarButton,

  // embed toolbar
  createEmbedPlugin,

  // image plugin
  createImagePlugin,
  addImage,

  // breakout plugin
  createBlockBreakoutPlugin,

  // link plugin
  createLinkPlugin,
  FormLink,
  LINK,
  LINK_MUTABILITY,

  createLinkObjectPlugin,
  LINK_OBJECT,
  LINK_OBJECT_MUTABILITY,

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
  LinkObjectIcon,
  CodeBlockIcon,
  ImageIcon,
} from '../src/Drink';

// -- Embed plugin
const EMBEDLY_ENDPOINT = 'https://api.embed.ly/1/oembed';
const EMBEDLY_KEY = '12672a12720e4ae7b136ccdb3a2aa0a1';

const onAddEmbed = () => {
  return new Promise((resolve, reject) => {
    const url = window.prompt('Please enter a URL to embed', 'https://www.youtube.com/watch?v=jQFIu9InG7Q');
    if(url !== null) {
      resolve(url);
    } else {
      reject({ type: 'cancel' })
    }
  });
}

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

const onAddImage = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        id: 1,
        url: 'http://img.clubic.com/01E0000008617952-photo-zenfone-3-1.jpg',
        width: 480,
        height: 320,
        type: 'image',
      })
    }, 0);
  });
}

// link object promise
const addObject = () => {
  // emulate modal result
  return new Promise((resolve, reject) => {
    const section = {
      id: 146,
      type: 'section',
      title: 'Chemises et tuniques',
      url: '/chemises-et-tuniques-femme/',
    };

    if (window.confirm('Ajouter ?')) {
      resolve(section);
    } else {
      reject({ type: 'cancel' });
    }
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

    // -- Link object plugin
    const linkObjectPlugin = createLinkObjectPlugin({ enhancer: tooltipPlugin.tooltipEnhancer });

    tooltipPlugin.setRenderers({
      [LINK]: { component: linkPlugin.TooltipLink },
      [LINK_OBJECT]: { component: linkObjectPlugin.TooltipLinkObject },
    });

    // -- Embed plugin
    const embedPlugin = createEmbedPlugin({
      getData: getData,
      onAddEmbed: onAddEmbed
    });

    const imagePlugin = createImagePlugin({
      onAddImage: () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({
              id: 1,
              url: 'http://img.clubic.com/01E0000008617952-photo-zenfone-3-1.jpg',
              width: 480,
              height: 320,
              type: 'image',
            })
          }, 0);
        })
      }
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
        createEntityButton({
          entityType: LINK_OBJECT,
          entityMutability: LINK_OBJECT_MUTABILITY,
          children: <LinkObjectIcon />,
          onClick: addObject,
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
        imagePlugin.createSideToolbarButton()
      ],
    });

    this.plugins = [
      embedPlugin,
      imagePlugin,
      inlineToolbarPlugin,
      sideToolbarPlugin,
      linkPlugin,
      linkObjectPlugin,
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
