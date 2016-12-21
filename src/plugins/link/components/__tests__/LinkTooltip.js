import React from 'react';
import { shallow, mount } from 'enzyme';
import LinkTooltip from '../LinkTooltip';
import { EditorState, Entity } from 'draft-js';
import createLinkEntity from '../../utils/createLinkEntity';
import createStore from '../../utils/createStore';

describe('FormLink component', () => {
  let editorState;
  let store;

  beforeEach(() => {
    editorState = EditorState.createEmpty();
    store = createStore({
      entityType: null,
      getEditorState: () => editorState,
    })
  });

  it('render link tooltip', () => {
    const entityKey = createLinkEntity({
      url: 'http://www.domain.com',
      target: '_self',
      nofollow: false,
    });

    const wrapper = shallow(
      <LinkTooltip entityKey={entityKey} store={store} />
    );

    const buttons = wrapper.find('button');

    expect(wrapper.find('span').length).toEqual(1);
    expect(wrapper.find('span').text()).toEqual('http://www.domain.com');
    expect(buttons.length).toEqual(2);

    const targetButton = buttons.at(0);

    targetButton.simulate('click', {
      preventDefault: () => true,
      stopPropagation: () => true,
    });

    let updateEntity;

    updateEntity = Entity.get(entityKey);

    expect(updateEntity.data).toEqual({
      url: 'http://www.domain.com',
      target: '_blank',
      nofollow: false,
    });

    const noFollowButton = buttons.at(1);

    noFollowButton.simulate('click', {
      preventDefault: () => true,
      stopPropagation: () => true,
    });

    updateEntity = Entity.get(entityKey);

    expect(updateEntity.data).toEqual({
      url: 'http://www.domain.com',
      target: '_blank',
      nofollow: true,
    });
  });
});
