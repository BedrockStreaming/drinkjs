import { Entity } from 'draft-js';
import { LINK, LINK_MUTABILITY } from './constants';

const createLinkEntity = ({ url }) => {
  return Entity.create(LINK, LINK_MUTABILITY, { url });
}

export default createLinkEntity;
