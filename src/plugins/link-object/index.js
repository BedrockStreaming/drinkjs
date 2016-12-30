import LinkObject from './components/LinkObject';
import TooltipLinkObject from './components/TooltipLinkObject';
import { LINK_OBJECT, LINK_OBJECT_MUTABILITY } from './utils/constants';
import { entityStrategy } from '../../utils/entityStrategy';

const createLinkObjectPlugin = ({ enhancer } = {}) => {
  const Component = 'function' === typeof enhancer
    ? enhancer(LinkObject)
    : LinkObject;

  return {
    decorators: [{
      strategy: entityStrategy(LINK_OBJECT),
      component: Component,
    }],
    TooltipLinkObject
  };
}

export default createLinkObjectPlugin;

export {
  LINK_OBJECT,
  LINK_OBJECT_MUTABILITY,
}
