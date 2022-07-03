import React from 'react';

import { shallow } from 'enzyme';

import NewButton from './index';

describe('Button Component', () => {
  it('Renders a descriptive button component', () => {

    const buttonEvent = jest.fn();
    const ButtonComponent = shallow(<NewButton className="New-Btn" onClick={buttonEvent} label="Close"/>);

    expect(ButtonComponent.find('.uppercase').text()).toBe('Close');
    expect(ButtonComponent.find('.uppercase').hasClass('uppercase')).toBe(true);

    ButtonComponent.find('.uppercase').simulate('click');
    expect(buttonEvent).toHaveBeenCalled();
  });
});