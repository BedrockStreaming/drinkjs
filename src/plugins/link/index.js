import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from '../../utils/createStore';
import Link from './components/Link';
import FormLink from './components/FormLink';
import { default as DefaultTooltipLink } from './components/TooltipLink';
import { LINK, LINK_MUTABILITY } from './utils/constants';
import { entityStrategy } from '../../utils';

const createLinkPlugin = ({ enhancer } = {}) => {
  const store = createStore({
    getEditorState: null,
    setEditorState: null,
  });

  const Component = 'function' === typeof enhancer
    ? enhancer(Link)
    : Link;

  const TooltipLink = decorateComponentWithProps(DefaultTooltipLink, { store });

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
    },
    decorators: [{
      strategy: entityStrategy(LINK),
      component: Component,
    }],
    TooltipLink
  };
}

export default createLinkPlugin;

export {
  FormLink,
  LINK,
  LINK_MUTABILITY,
}
