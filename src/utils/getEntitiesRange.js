export const getEntitiesRange = strategy => (contentBlock, startOffset, endOffset) => {
  const ranges = [];

  strategy(contentBlock, (start, end) => {
    if (endOffset > start && startOffset < end) {
      ranges.push({
        start,
        end
      });
    }
  });

  return ranges;
}
