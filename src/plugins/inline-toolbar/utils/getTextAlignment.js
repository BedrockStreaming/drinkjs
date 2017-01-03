import { ALIGNMENT_KEY, ALIGNMENT_LEFT } from './constants';

const getTextAlignment = (contentBlock) => {
  const data = contentBlock.getData();

  if (data.has(ALIGNMENT_KEY)) {
    return data.get(ALIGNMENT_KEY);
  }

  return ALIGNMENT_LEFT;
};

export default getTextAlignment;
