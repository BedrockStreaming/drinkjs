import { Entity, EditorState, ContentBlock, SelectionState, Modifier, genKey } from 'draft-js';
import { List } from 'immutable';
import isUrl from 'is-url';

import { getCurrentBlock } from 'utils';

import Card from './components/Card';
import Html from './components/Html';
import createSideToolbarButton from './utils/createSideToolbarButton';

const replaceBlockByEmbed = (editorState, block, data) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  // Split the blocks
  const blocksBefore = blockMap.toSeq().takeUntil(v => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil(v => (v === block)).rest();

  const embedBlock = new ContentBlock({
    key: genKey(),
    text: '',
    type: 'atomic',
    characterList: List(),
    depth: 0,
  });

  const entityKey = Entity.create('embed', 'IMMUTABLE', data);

  const newBlockMap = blocksBefore.concat([[ embedBlock.getKey(), embedBlock ]], blocksAfter).toOrderedMap();

  let newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection,
  });

  newContentState = Modifier.replaceText(
    newContentState,
    SelectionState.createEmpty(embedBlock.getKey()),
    block.getText(),
    null,
    entityKey
  );

  return EditorState.push(editorState, newContentState, 'insert-fragment');
}

export default (options) => {
  const { getData } = options;

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
      const previousType = previousBlock.getType();

      if (!isUrl(previousText) || previousType !== 'unstyled') {
        return editorState;
      }

      getData(previousText)
        .then(data =>
          props.setEditorState(
            replaceBlockByEmbed(
              props.getEditorState(),
              previousBlock,
              data
            )
          )
        );

      return editorState;
    },
    blockRendererFn: (contentBlock) => {
      if (contentBlock.getType() === 'atomic') {
        const entity = Entity.get(contentBlock.getEntityAt(0));
        const type = entity.getType();
        const data = entity.getData();

        if (type !== 'embed') {
          return null;
        }

        if (data.html) {
          return {
            component: Html,
            editable: false,
            props: { html: data.html },
          };
        }

        return {
          component: Card,
          editable: false,
          props: { ...data },
        };
      }

      return null;
    },
    createSideToolbarButton: () => createSideToolbarButton(options),
  };
};
