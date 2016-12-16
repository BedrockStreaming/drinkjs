import { Entity } from 'draft-js';

const linkStrategy = (contentBlock, callback) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return (entityKey !== null && 'LINK' === Entity.get(entityKey).getType());
   }, callback);
};

export default linkStrategy;