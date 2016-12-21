import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Link from './components/Link';
import FormLink from './components/FormLink';
import { default as DefaultTooltipLink } from './components/TooltipLink';
import { LINK, LINK_MUTABILITY } from './utils/constants';
import entityStrategy from '../../utils/entityStrategy';

const store = createStore({
  getEditorState: null,
  setEditorState: null,
});

const TooltipLink = decorateComponentWithProps(DefaultTooltipLink, {
  store
});

const createLinkPlugin = ({ enhancer }) => {
  const Component = 'function' === typeof enhancer
    ? enhancer(Link)
    : Link;

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    decorators: [{
      strategy: entityStrategy(LINK),
      component: Component,
    }]
  };
}

export default createLinkPlugin;

export {
  FormLink,
  TooltipLink,
  LINK,
  LINK_MUTABILITY,
}
