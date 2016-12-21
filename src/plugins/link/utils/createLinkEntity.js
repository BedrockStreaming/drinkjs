import { Entity } from 'draft-js';
import { LINK, LINK_MUTABILITY } from './constants';

const createLinkEntity = ({ url, target, nofollow }) => {
  return Entity.create(LINK, LINK_MUTABILITY, { url, target, nofollow });
}

export default createLinkEntity;
