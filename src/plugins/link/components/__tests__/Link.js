import React from 'react';
import { shallow } from 'enzyme';
import Link from '../Link';

describe('Link component', () => {
  it('render span with children', () => {
    const children = '<span>icon</span>';
    const wrapper = shallow(
      <Link children={children} />
    );

    expect(wrapper.prop('children')).toEqual(children);
 });
});
