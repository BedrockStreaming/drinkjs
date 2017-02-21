import { Entity, EditorState, ContentBlock, SelectionState, Modifier, genKey } from 'draft-js';
import { List } from 'immutable';

import { getCurrentBlock } from '../../utils';

import AcmeCard from './components/AcmeCard';
import createSideToolbarButton from './utils/createSideToolbarButton';

const replaceBlockByAcme = (editorState, block, title) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  // Split the blocks
  const blocksBefore = blockMap.toSeq().takeUntil(v => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil(v => (v === block)).rest();

  const acmeBlock = new ContentBlock({
    key: genKey(),
    text: '',
    type: 'atomic',
    characterList: List(),
    depth: 0,
  });

  const entityKey = Entity.create('acme', 'IMMUTABLE', { title });

  const newBlockMap = blocksBefore.concat([[ acmeBlock.getKey(), acmeBlock ]], blocksAfter).toOrderedMap();

  let newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection,
  });

  newContentState = Modifier.replaceText(
    newContentState,
    SelectionState.createEmpty(acmeBlock.getKey()),
    block.getText(),
    null,
    entityKey
  );

  return EditorState.push(editorState, newContentState, 'insert-fragment');
}

export default (options) => {

  return {
    onChange: (editorState, props) => {
      const currentBlock = getCurrentBlock(editorState);
      const currentText = currentBlock.getText();
      const currentType = currentBlock.getType();

      if (currentText.length > 0 || currentType !== 'unstyled') {
        return editorState;
      }

      const content = editorState.getCurrentContent();
      const previousBlock = content.getBlockBefore(currentBlock.getKey());

      if (!previousBlock) {
        return editorState;
      }

      const previousText = previousBlock.getText()

      props.setEditorState(
        replaceBlockByAcme(
          props.getEditorState(),
          previousBlock,
          previousText
        )
      );

      return editorState;
    },
    blockRendererFn: (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();

        if (type !== 'acme') {
          return null;
        }

        return {
          component: AcmeCard,
          editable: false
        };
      }

      return null;
    },
    createSideToolbarButton: () => createSideToolbarButton(options),
  };
};
