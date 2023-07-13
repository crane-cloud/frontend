import React from 'react';

import { shallow } from 'enzyme';

import Feedback from './index';

describe('Feedback Component', () => {
  it('Renders a Feedback component', () => {

    const FeedbackComponent = shallow(<Feedback className="success" type='Succes SuccessOnWhite' message='Failed'/>);
    expect(FeedbackComponent).toMatchSnapshot();

    
  });
});