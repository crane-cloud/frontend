import React from 'react';

import { shallow } from 'enzyme';

import AppStatus from './index';

describe('AppStatus Component', () => {
  it('Renders a AppStatus component', () => {
    const AppStatusComponent = shallow(<AppStatus/>);
    expect(AppStatusComponent.find('.StatusWrapper').hasClass('StatusWrapper')).toBe(true);
   expect(AppStatusComponent).toMatchSnapshot();
  });
 
});