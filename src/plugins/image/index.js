import { Entity } from 'draft-js';
// import decorateComponentWithProps from 'decorate-component-with-props';
// import createStore from '../../utils/createStore';
// import Link from './components/Link';
// import FormLink from './components/FormLink';
// import { default as DefaultTooltipLink } from './components/TooltipLink';
// import { LINK, LINK_MUTABILITY } from './utils/constants';
// import { entityStrategy } from '../../utils';
import Image from './components/Image';

import addImage from './utils/addImage';

const createImagePlugin = () => {
  // const store = createStore({
  //   getEditorState: null,
  //   setEditorState: null,
  // });

  return {
    blockRendererFn: (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();

        if ('IMAGE' !== type) {
          return null;
        }

        return {
          component: Image,
          editable: false,
        };
      }

      return null;
    },
  };
}

export default createImagePlugin;

export {
  addImage,
}
