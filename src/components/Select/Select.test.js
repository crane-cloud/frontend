import React from 'react';

import { shallow } from 'enzyme';

import Select from './index';

describe('Select Component', () => {
  it('Renders a Select component', () => {

    const selectEvent = jest.fn();
    const SelectComponent = shallow(<Select onChange={selectEvent} options={[{"id": 1, "name":"test"}]} required placeholder='Testing'/>);
    expect(SelectComponent).toMatchSnapshot();

  });
});