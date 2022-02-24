import React from 'react';
import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import App from './index';

describe('App Component', () => {
  it('should match the snapshot', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});