import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Link from './components/Link';
import FormLink from './components/FormLink';
import { default as DefaultLinkTooltip } from './components/LinkTooltip';
import linkStrategy from './utils/linkStrategy';
import { LINK } from './utils/constants';

const store = createStore({
  getEditorState: null,
  setEditorState: null,
});

const LinkTooltip = decorateComponentWithProps(DefaultLinkTooltip, {
  store
});

const createLinkPlugin = ({ enhancer }) => {
  // return enhanced and decorated link or default decorated link
  const LinkComponent = 'function' === typeof enhancer
    ? enhancer(Link)
    : Link;

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    decorators: [{
      strategy: linkStrategy,
      component: LinkComponent,
    }]
  };
}

export default createLinkPlugin;

export {
  linkStrategy,
  FormLink,
  LINK,
  LinkTooltip
}
