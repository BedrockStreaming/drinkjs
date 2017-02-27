import Image from './components/Image';
import { BLOCK_IMAGE } from './utils/constants';
import createSideToolbarButton from './utils/createSideToolbarButton';

const createImagePlugin = (options) => {
  return {
    blockRendererFn: (contentBlock) => {
      if (BLOCK_IMAGE === contentBlock.getType()) {
        return {
          component: Image,
        };
      }
    },
    createSideToolbarButton: () => createSideToolbarButton(options),
  };
};

export default createImagePlugin;
