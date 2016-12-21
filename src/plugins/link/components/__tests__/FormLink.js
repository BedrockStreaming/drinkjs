import React from 'react';
import { shallow, mount } from 'enzyme';
import FormLink from '../FormLink';
import { EditorState } from 'draft-js';

describe('FormLink component', () => {
  let editorState;

  beforeEach(() => {
    editorState = EditorState.createEmpty();
  });

  it('render form', () => {
    const wrapper = shallow(
      <FormLink />
    );

    const input = wrapper.find('input');

    expect(input.text()).toEqual('');
    expect(wrapper.find('button').length).toEqual(1);
  });

  it('form input handle ENTER with url', () => {
    const getEditorState = () => editorState;
    const setEditorState = jest.fn();
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormLink
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        onSubmit={onSubmit}
      />
    );

    const input = wrapper.find('input');

    expect(input.text()).toEqual('');
    expect(wrapper.find('button').length).toEqual(1);

    input.simulate('change', {
      target: {
        value: 'http://www.domain.com'
      },
    });

    input.simulate('keyDown', {
      keyCode: 13,
      key: "enter"
    });

    expect(onSubmit).toHaveBeenCalled();
  });

  it('form input handle ENTER with empty url', () => {
    const getEditorState = () => editorState;
    const setEditorState = jest.fn();
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormLink
        getEditorState={getEditorState}
        setEditorState={setEditorState}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );

    const input = wrapper.find('input');

    expect(input.text()).toEqual('');
    expect(wrapper.find('button').length).toEqual(1);

    input.simulate('keyDown', {
      keyCode: 13,
      key: "enter"
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it('form input handle ESCAPE', () => {
    const getEditorState = () => editorState;
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormLink
        getEditorState={getEditorState}
        onCancel={onCancel}
      />
    );

    const input = wrapper.find('input');

    expect(input.text()).toEqual('');
    expect(wrapper.find('button').length).toEqual(1);

    input.simulate('keyDown', {
      keyCode: 27,
      key: "escape"
    });

    expect(onCancel).toHaveBeenCalled();
  });
});
