import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import Separator from './components/Separator';
import createInlineStyleButton from './utils/createInlineStyleButton';
import createBlockStyleButton from './utils/createBlockStyleButton';
import createBlockMultipleStyleButton from './utils/createBlockMultipleStyleButton';
import createBlockAlignmentButton from './utils/createBlockAlignmentButton';

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
    InlineToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export default createInlineToolbarPlugin;

export {
  Separator,
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockMultipleStyleButton,
  createBlockAlignmentButton,
};
