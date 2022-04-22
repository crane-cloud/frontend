import React from 'react';

import { shallow } from 'enzyme';

import MetricsCard from './index';

describe('MetricsCard Component', () => {
  it('Renders the MetricsCard component', () => {
    const MetricsCardComponent = shallow(<MetricsCard/>);
    expect(MetricsCardComponent.find('.CardHeaderSection').hasClass('CardHeaderSection')).toBe(true);
   expect(MetricsCardComponent).toMatchSnapshot();
  });
});