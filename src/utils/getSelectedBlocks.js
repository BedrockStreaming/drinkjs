const getSelectedBlocks = (contentState, anchorKey, focusKey) => {
  const startingBlock = contentState.getBlockForKey(anchorKey);

  if (!startingBlock) {
    return [];
  }

  let selectedBlocks = [startingBlock];

  if (anchorKey !== focusKey) {
    let blockKey = anchorKey;

    while (blockKey !== focusKey) {
      const nextBlock = contentState.getBlockAfter(blockKey);

      if (!nextBlock) {
        selectedBlocks = [];
        break;
      }

      selectedBlocks.push(nextBlock);
      blockKey = nextBlock.getKey();
    }
  }

  return selectedBlocks;
};

export default getSelectedBlocks;
