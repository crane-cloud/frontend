import React from 'react';

import { shallow } from 'enzyme';

import Status from './index';

describe('Status Component', () => {
  it('Renders a Status component', () => {
    const StatusComponent = shallow(<Status/>);
    expect(StatusComponent.find('.StatusSignal').hasClass('StatusSignal')).toBe(true);
   expect(StatusComponent).toMatchSnapshot();
  });
  it('Renders a Status component running status', () => {
    const StatusComponent = shallow(<Status  status={"running"} />);
    expect(StatusComponent.find('.StatusIsOn').hasClass('StatusIsOn')).toBe(true);
   expect(StatusComponent).toMatchSnapshot();
  });
});