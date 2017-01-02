import Link from './components/Link';
import entityStrategy from '../../utils/entityStrategy';
import FormLink from './components/FormLink';
import { LINK, LINK_MUTABILITY } from './utils/constants';

const createLinkPlugin = () => {
  return {
    decorators: [{
      strategy: entityStrategy(LINK),
      component: Link,
    }]
  };
}

export default createLinkPlugin;

export {
  FormLink,
  LINK,
  LINK_MUTABILITY,
}
