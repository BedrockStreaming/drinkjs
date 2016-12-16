import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import Separator from './components/Separator';
import createInlineStyleButton from './utils/createInlineStyleButton';
import createBlockStyleButton from './utils/createBlockStyleButton';
import createBlockAlignmentButton from './utils/createBlockAlignmentButton';
import createTextAlignmentButton from './utils/createTextAlignmentButton';
import { default as defaultCreateLinkButton } from './utils/createLinkButton';

import { ALIGNMENT_KEY, ALIGNMENT_LEFT } from './constants';

import styles from './textAlignment.css';

const getBlockAlignment = (contentBlock) => {
  const data = contentBlock.getData();

  if (data.has(ALIGNMENT_KEY)) {
    return data.get(ALIGNMENT_KEY);
  }

  return ALIGNMENT_LEFT;
};

const store = createStore({
  isVisible: false,
  showUrlInput: false,
});

const createInlineToolbarPlugin = ({ buttons = [] } = {}) => {
  const toolbarProps = {
    store,
    buttons,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    onChange: (editorState) => {
      const selection = editorState.getSelection();
      const showUrlInput = store.getItem('showUrlInput');

      //console.warn('showToolbar', showUrlInput || (selection.getHasFocus() && !selection.isCollapsed()))
      //console.warn('showUrlInput', showUrlInput)
      //console.warn('hasFocus', selection.getHasFocus())
      //console.warn('collapse', selection.isCollapsed())
      console.warn('selection', selection.toJS())
      if (!showUrlInput) {
        if (selection.getHasFocus() && !selection.isCollapsed()) {
          store.updateItem('isVisible', true);
        } else {
          store.updateItem('isVisible', false);
        }
      }

      return editorState;
    },
    blockStyleFn: (contentBlock) => {
      const alignment = getBlockAlignment(contentBlock);

      if (alignment) {
        return styles[alignment];
      }
    },
    InlineToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export default createInlineToolbarPlugin;

const createLinkButton = ({ children }) => {
  const component = defaultCreateLinkButton({ children });
  return decorateComponentWithProps(component, { store });
};

export {
  Separator,
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockAlignmentButton,
  createTextAlignmentButton,
  createLinkButton,
};
