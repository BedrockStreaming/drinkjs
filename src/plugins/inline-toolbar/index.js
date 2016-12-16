import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import Separator from './components/Separator';
import createInlineStyleButton from './utils/createInlineStyleButton';
import createBlockStyleButton from './utils/createBlockStyleButton';
import createBlockAlignmentButton from './utils/createBlockAlignmentButton';
import createTextAlignmentButton from './utils/createTextAlignmentButton';

import { ALIGNMENT_KEY, ALIGNMENT_LEFT } from './constants';

import styles from './textAlignment.css';

const getBlockAlignment = (contentBlock) => {
  const data = contentBlock.getData();

  if (data.has(ALIGNMENT_KEY)) {
    return data.get(ALIGNMENT_KEY);
  }

  return ALIGNMENT_LEFT;
};

const createInlineToolbarPlugin = ({ buttons = [] } = {}) => {
  const store = createStore({
    isVisible: false,
  });

  const toolbarProps = {
    store,
    buttons,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    // Re-Render the text-toolbar on selection change
    onChange: (editorState) => {
      const selection = editorState.getSelection();
      if (selection.getHasFocus() && !selection.isCollapsed()) {
        store.updateItem('isVisible', true);
      } else {
        store.updateItem('isVisible', false);
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

export {
  Separator,
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockAlignmentButton,
  createTextAlignmentButton,
};
