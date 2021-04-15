import React from 'react';
import { shallow, mount } from 'enzyme';
import Hompage from './home';

it('render correctly', () => {
  const wrapper = shallow(<Hompage />);
  expect(wrapper).toMatchSnapshot();
});
