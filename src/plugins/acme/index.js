import { Entity } from 'draft-js';

import AcmeCard from './components/AcmeCard';
import createSideToolbarButton from './utils/createSideToolbarButton';

export default (options) => {

  return {
    blockRendererFn: (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();

        if (type !== 'acme') {
          return null;
        }

        return {
          component: AcmeCard,
          editable: false
        };
      }

      return null;
    },
    createSideToolbarButton: () => createSideToolbarButton(options),
  };
};
