import React from 'react';
import { Entity } from 'draft-js';
import { shallow } from 'enzyme';
import Link from '../Link';

describe('Link component', () => {

  it('render span with children', () => {
    const entityKey = Entity.create('LINK', 'MUTABLE', {
      url: 'http://www.domain.com',
      target: '_self',
      nofollow: false,
    });

    const children = '<span>icon</span>';
    const wrapper = shallow(
      <Link entityKey={entityKey} children={children} />
    );

    expect(wrapper.prop('children')).toEqual(children);
 });
});
