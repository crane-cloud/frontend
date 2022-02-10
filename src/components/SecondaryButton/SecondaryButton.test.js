import React from 'react';

import { shallow } from 'enzyme';

import SecondaryButton from './index';

describe('Button Component', () => {
  it('Renders a button component', () => {
    const ButtonComponent = shallow(<SecondaryButton className="Secondary-Btn SecondaryBlack"  label="Submit"/>);

    expect(ButtonComponent.find('.Secondary-Btn').text()).toBe('Submit');
    expect(ButtonComponent.find('.Secondary-Btn').hasClass('Secondary-Btn')).toBe(true);
  });
});