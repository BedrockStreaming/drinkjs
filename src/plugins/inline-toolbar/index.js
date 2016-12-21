import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import Separator from './components/Separator';
import createInlineStyleButton from './utils/createInlineStyleButton';
import createBlockStyleButton from './utils/createBlockStyleButton';
import createBlockAlignmentButton from './utils/createBlockAlignmentButton';
import createTextAlignmentButton from './utils/createTextAlignmentButton';
import createEntityButton from './utils/createEntityButton';

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
  getEditorState: null,
  setEditorState: null,
  isVisible: false,
  entityType: null
});

let previousSelection = null;

const createInlineToolbarPlugin = ({ buttons = [], renderers = {} } = {}) => {
  const props = {
    store,
    buttons,
    renderers,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render toolbar on selection change
    onChange: (editorState) => {
      const selection = editorState.getSelection();
      const selectionHasFocus = selection.getHasFocus();
      const entityType = store.getItem('entityType');

      if (entityType) {
        if ((!previousSelection.getHasFocus() && selectionHasFocus)) {
          store.updateItem('entityType', null);
        } else if (selection.isCollapsed()) {
          store.updateItem('isVisible', false);
          store.updateItem('entityType', null);
        }
      } else if (selectionHasFocus && !selection.isCollapsed()) {
        store.updateItem('isVisible', true);
      } else {
        store.updateItem('isVisible', false);
      }

      previousSelection = selection;

      return editorState;
    },
    blockStyleFn: (contentBlock) => {
      const alignment = getBlockAlignment(contentBlock);

      if (alignment) {
        return styles[alignment];
      }
    },
    InlineToolbar: decorateComponentWithProps(Toolbar, props),
  };
};

export default createInlineToolbarPlugin;

export {
  Separator,
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockAlignmentButton,
  createTextAlignmentButton,
  createEntityButton,
};
