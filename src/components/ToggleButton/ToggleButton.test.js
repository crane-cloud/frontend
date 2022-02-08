import React from 'react';
import { shallow } from 'enzyme';
import ToggleButton from './index';

describe('Toggle Button Component', () => {
  it('Renders a Toggle button component', () => {

    const buttonEvent = jest.fn();
    const ButtonComponent = shallow(<ToggleButton  onClick={buttonEvent}/>);

    expect(ButtonComponent).toMatchSnapshot();
  });
});