import decorateComponentWithProps from 'decorate-component-with-props';
import { isFunction } from 'lodash';

import Toolbar from './components/Toolbar';
import createStore from './utils/createStore';
import createToggleBlockTypeButton from './utils/createToggleBlockTypeButton';

export default (config = {}) => {
  const store = createStore();

  const closeToolbar = () => {
    store.updateItem('isOpen', false);
  }

  const {
    buttons = []
  } = config;

  const toolbarProps = {
    store,
    buttons: buttons.map(button => (
      isFunction(button) ? button({ closeToolbar }) : button
    )),
  };

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('getEditorRef', getEditorRef);
      store.updateItem('isOpen', false);
    },
    // Re-Render the toolbar on every change
    onChange: (editorState) => {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    Component: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};

export {
  createToggleBlockTypeButton,
};
