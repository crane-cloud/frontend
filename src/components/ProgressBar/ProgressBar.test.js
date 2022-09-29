import React from 'react';

import { shallow } from 'enzyme';

import ProgressBar from '.';

describe('Testing Progress bar Component', () => {
  it('Renders Progress bar component', () => {
    const ProgressBarComponent = shallow(<ProgressBar/>);
    expect(ProgressBarComponent.find('.ProgressBarContainer')
    .hasClass('ProgressBarContainer')).toBe(true);
   expect(ProgressBarComponent).toMatchSnapshot();
  });
});