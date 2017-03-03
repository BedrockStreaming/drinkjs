import Image from './components/Image';
import { BLOCK_IMAGE } from './utils/constants';
import addImage from './utils/addImage';

const createImagePlugin = () => {
  return {
    blockRendererFn: (contentBlock) => {
      if (BLOCK_IMAGE === contentBlock.getType()) {
        return {
          component: Image,
        };
      }
    },
  };
};

export default createImagePlugin;

export {
  addImage,
}
