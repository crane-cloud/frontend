import React from 'react';

import { shallow } from 'enzyme';

import Spinner from './index';

describe('Spinner Component', () => {
  it('Renders a Spinner component', () => {

    const SpinnerComponent = shallow(<Spinner />);
    expect(SpinnerComponent.find('.SmallSpinnerWrapper').hasClass('SmallSpinnerWrapper')).toBe(true);
    expect(SpinnerComponent).toMatchSnapshot();

  });
});