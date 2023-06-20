import React from 'react';
import { shallow } from 'enzyme';
import AdminLogsPage from './';

describe('AdminLogsPage', () => {
  it('renders without crashing', () => {
    shallow(<AdminLogsPage />);
  });
  
  it('matches the snapshot', () => {
    const wrapper = shallow(<AdminLogsPage />);
    expect(wrapper).toMatchSnapshot();
  });
  

});
