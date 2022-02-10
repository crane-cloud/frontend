import React from 'react';

import { shallow } from 'enzyme';

import CancelButton from './index';

describe('Button Component', () => {
  it('Renders a button component', () => {

    const buttonEvent = jest.fn();
    const ButtonComponent = shallow(<CancelButton buttonClass="CancelButton" onClick={buttonEvent} />);
    expect(ButtonComponent.find('.CancelButton').hasClass('CancelButton')).toBe(true);

    ButtonComponent.find('.CancelButton').simulate('click');
    expect(buttonEvent).toHaveBeenCalled();
  });
});