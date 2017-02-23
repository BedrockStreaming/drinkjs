import { getSelectedBlocks } from './getSelectedBlocks';
import { getEntitiesRange } from './getEntitiesRange';

export const selectionContainsEntity = strategy => {
  const getEntitiesRangeStrategy = getEntitiesRange(strategy);

  return editorState => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    if (selectionState.isCollapsed()) {
      return false;
    }

    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();

    if (startKey === endKey) {
      const startOffset = selectionState.getStartOffset();
      const endOffset = selectionState.getEndOffset();

      const currentBlock = contentState.getBlockForKey(startKey);
      const entitiesRange = getEntitiesRangeStrategy(currentBlock, startOffset, endOffset);

      return entitiesRange.length > 0;
    }

    const selectedBlocks = getSelectedBlocks(contentState, startKey, endKey);

    const hasEntities = selectedBlocks.some(contentBlock => {
      const currentKey = contentBlock.getKey();

      let startOffset;
      let endOffset;

      if (currentKey === startKey) { // selection start here
        startOffset = selectionState.getStartOffset();
        endOffset = contentBlock.getLength();
      } else if (currentKey === endKey) { // selection end here
        startOffset = 0;
        endOffset = selectionState.getEndOffset();
      } else { // full block overlap
        startOffset = 0;
        endOffset = contentBlock.getLength();
      }

      const entitiesRange = getEntitiesRangeStrategy(contentBlock, startOffset, endOffset);

      return entitiesRange.length > 0;
    });

    return hasEntities;
  }
}
