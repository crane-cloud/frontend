import React from 'react';

import { shallow } from 'enzyme';

import RoundAddButton from './index';

describe('Button Component', () => {
  it('Renders a button component', () => {

    const buttonEvent = jest.fn();
    const ButtonComponent = shallow(<RoundAddButton className="RoundAddButton" onClick={buttonEvent} />);

    expect(ButtonComponent.find('.RoundAddButton').hasClass('RoundAddButton')).toBe(true);

    ButtonComponent.find('.RoundAddButton').simulate('click');
    expect(buttonEvent).toHaveBeenCalled();

    expect(ButtonComponent).toMatchSnapshot();

  });
});