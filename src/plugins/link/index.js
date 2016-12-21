import Link from './components/Link';
import linkStrategy from './utils/linkStrategy';
import FormLink from './components/FormLink';
import { LINK } from './utils/constants';

const createLinkPlugin = () => {
  return {
    decorators: [{
      strategy: linkStrategy,
      component: Link,
    }]
  };
}

export default createLinkPlugin;

export {
  linkStrategy,
  FormLink,
  LINK
}
