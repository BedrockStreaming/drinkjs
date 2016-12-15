import { Entity } from 'draft-js';

import Card from './components/Card';

import createSideToolbarButton from './utils/createSideToolbarButton';

export default (props) => {
  return {
    blockRendererFn: (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();

        if (type === 'embed') {
          return {
            component: Card,
            editable: false,
            props: {
              data: entity.getData(),
            },
          };
        }
      }

      return null;
    },
    createSideToolbarButton: () => createSideToolbarButton(props),
  };
};
