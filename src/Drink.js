import DrinkEditor from './Editor';

import createInlineToolbarPlugin, {
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockAlignmentButton,
  createTextAlignmentButton,
  Separator,
  createEntityButton,
} from './plugins/inline-toolbar';

import createSideToolbarPlugin, {
  createToggleBlockTypeButton,
  createSideToolBarButton,
} from './plugins/side-toolbar';

import createAcmePlugin from './plugins/acme';

import createEmbedPlugin from './plugins/embed';

import createImagePlugin, { addImage } from './plugins/image';

import createBlockBreakoutPlugin from './plugins/breakout';

import createLinkPlugin, { FormLink, LINK, LINK_MUTABILITY } from './plugins/link';

import createTooltipPlugin  from './plugins/tooltip';

import BoldIcon from './icons/BoldIcon';
import ItalicIcon from './icons/ItalicIcon';
import UnderlineIcon from './icons/UnderlineIcon';
import StrikethroughIcon from './icons/StrikethroughIcon';
import HeadingOneIcon from './icons/HeadingOneIcon'
import HeadingTwoIcon from './icons/HeadingTwoIcon'
import HeadingThreeIcon from './icons/HeadingThreeIcon'
import BlockquoteIcon from './icons/BlockquoteIcon'
import UnorderedListIcon from './icons/UnorderedListIcon'
import OrderedListIcon from './icons/OrderedListIcon'
import AlignmentLeftIcon from './icons/AlignmentLeftIcon';
import AlignmentCenterIcon from './icons/AlignmentCenterIcon';
import AlignmentRightIcon from './icons/AlignmentRightIcon';
import LinkIcon from './icons/LinkIcon';
import AcmeBlockIcon from './icons/AcmeBlockIcon';
import CodeBlockIcon from './icons/CodeBlockIcon';
import ImageIcon from './icons/ImageIcon';

export {
  // editor
  DrinkEditor,

  // inline toolbar plugin
  createInlineToolbarPlugin,
  createInlineStyleButton,
  createBlockStyleButton,
  createBlockAlignmentButton,
  createTextAlignmentButton,
  Separator,
  createEntityButton,

  // side toolbar plugin
  createSideToolbarPlugin,
  createToggleBlockTypeButton,
  createSideToolBarButton,

  // acme plugin
  createAcmePlugin,

  // embed plugin
  createEmbedPlugin,

  // image plugin
  createImagePlugin,
  addImage,

  // breakout plugin
  createBlockBreakoutPlugin,

  // link plugin
  createLinkPlugin,
  FormLink,
  LINK,
  LINK_MUTABILITY,

  //tooltip plugin
  createTooltipPlugin,

  // icons
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  HeadingOneIcon,
  HeadingTwoIcon,
  HeadingThreeIcon,
  BlockquoteIcon,
  UnorderedListIcon,
  OrderedListIcon,
  AlignmentLeftIcon,
  AlignmentCenterIcon,
  AlignmentRightIcon,
  LinkIcon,
  AcmeBlockIcon,
  CodeBlockIcon,
  ImageIcon,
}
