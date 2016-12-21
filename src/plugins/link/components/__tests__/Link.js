import React from 'react';
import { shallow } from 'enzyme';
import Link from '../Link';
import createLinkEntity from '../../utils/createLinkEntity';

describe('Link component', () => {

  it('render span with children', () => {
    const entityKey = createLinkEntity({
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
