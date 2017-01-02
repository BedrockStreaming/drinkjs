import { Entity } from 'draft-js';

const entityStrategy = entityType => (contentBlock, callback) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (entityKey !== null && entityType === Entity.get(entityKey).getType());
  }, callback);
};

export default entityStrategy;
