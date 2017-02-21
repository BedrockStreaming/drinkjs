import React, { Component } from 'react';
import { EditorState, Entity, RichUtils, Modifier, CharacterMetadata, genKey, ContentBlock } from 'draft-js';

import { List, Repeat } from 'immutable';

import Button from '../../../plugins/side-toolbar/components/Button';
import { insertBlock, getCurrentBlock } from '../../../utils';

export default () => ({ closeToolbar }) => (
  class SideToolbarButton extends Component {

    handleClick(event) {
      event.preventDefault();

      const { getEditorState, setEditorState } = this.props;
      const editorState = getEditorState();
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();

      const title = window.prompt('Please enter any title', 'hello world');

      const newEditorState = RichUtils.toggleBlockType(
        editorState,
        'atomic'
      );

      // // Apply entity
      const entityKey = Entity.create('acme', 'IMMUTABLE', { title });

      const newContentState = Modifier.applyEntity(
        newEditorState.getCurrentContent(),
        selection,
        entityKey
      );

      const nextEditorState = EditorState.push(
        newEditorState,
        newContentState,
        'insert-characters'
      );

      console.warn('state', nextEditorState.toJS());

      // newEditorState = insertBlock(newEditorState);

      // setEditorState(nextEditorState);

      setEditorState(
        nextEditorState
      );

      
      // // get current block focused
      // const currentBlock = getCurrentBlock(editorState);

      // const title = window.prompt('Please enter any title', 'hello world');

      // const blockMap = contentState.getBlockMap();

      // // Split the blocks
      // const blocksBefore = blockMap.toSeq().takeUntil(v => (v === currentBlock));
      // const blocksAfter = blockMap.toSeq().skipUntil(v => (v === currentBlock)).rest();

      // const entityKey = Entity.create('acme', 'IMMUTABLE', { title });
      // const charDataOfAcmeEntity = CharacterMetadata.create({ entity: entityKey });

      // console.warn('repeat list', List(Repeat(charDataOfAcmeEntity, 1)));

      // const acmeBlock = new ContentBlock({
      //   key: genKey(),
      //   text: ' ',
      //   type: 'atomic',
      //   characterList: List(Repeat(charDataOfAcmeEntity, 1)),
      //   depth: 0,
      // });

      // const newBlockMap = blocksBefore.concat([[ acmeBlock.getKey(), acmeBlock ]], blocksAfter).toOrderedMap();

      // const newContentState = contentState.merge({
      //   blockMap: newBlockMap,
      //   selectionBefore: selection,
      //   selectionAfter: selection,
      // });


      // const nextEditorState = EditorState.push(
      //   editorState,
      //   newContentState,
      //   'insert6fragement'
      // );

      // setEditorState(nextEditorState);

      closeToolbar();
    }

    render() {
      return (
        <Button
          onClick={this.handleClick.bind(this)}
          icon={(
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>
          )}
        />
      );
    }
  } 
);
