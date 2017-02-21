import { Entity } from 'draft-js';
import ProductRating from './components/ProductRating';
import addProductRating from './modifiers/addProductRating';
import createStore from '../../utils/createStore';

import { PRODUCT_RATING, PRODUCT_RATING_MUTABILITY } from './utils/constants';

const createProductRatingPlugin = () => {
  const store = createStore({
    setReadOnly: null,
  });

  return {
    initialize: ({ setReadOnly }) => {
      store.updateItem('setReadOnly', setReadOnly);
    },
    blockRendererFn: contentBlock => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();

        if (PRODUCT_RATING === type) {
          return {
            component: ProductRating,
            editable: false,
            props: {
              store
            }
          };
        }
      }

      return null;
    },
  }
};

export default createProductRatingPlugin;

export {
  PRODUCT_RATING,
  PRODUCT_RATING_MUTABILITY,
  addProductRating,
}