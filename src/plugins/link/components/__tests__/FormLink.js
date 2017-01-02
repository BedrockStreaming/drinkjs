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
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormLink
        onSubmit={onSubmit}
        onCancel={onCancel}
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
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('form input handle ENTER with empty url', () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormLink
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
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormLink
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
