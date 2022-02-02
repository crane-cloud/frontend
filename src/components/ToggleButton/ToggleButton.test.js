import React from 'react';

import { shallow } from 'enzyme';

import ToggleButton from './index';

describe('Toggle Button Component', () => {
  it('Renders a Toggle button component', () => {

    // const buttonEvent = jest.fn();
    const ButtonComponent = shallow(<ToggleButton />);
    
    // expect(ButtonComponent.find('.ToggleButtonContainer').hasClass('ToggleButtonContainer')).toBe(true);
    // expect(component.find('#item-id').prop('style')).toHaveProperty('backgroundColor' 'black');
    expect(ButtonComponent).toMatchSnapshot();

  });
});