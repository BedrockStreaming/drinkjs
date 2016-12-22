import decorateComponentWithProps from 'decorate-component-with-props';

import Toolbar from './components/Toolbar';
import createStore from './utils/createStore';
import createToggleBlockTypeButton from './utils/createToggleBlockTypeButton';

const store = createStore();

export default (config = {}) => {
  const {
    buttons = []
  } = config;

  const toolbarProps = {
    store,
    buttons,
  };

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: (editorState) => {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export {
  createToggleBlockTypeButton,
};
