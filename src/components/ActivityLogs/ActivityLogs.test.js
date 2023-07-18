import React from 'react';
import { shallow } from 'enzyme';
import ActivityLogs from './';
import { handleGetRequest } from "../../apis/apis.js";

jest.mock("../../apis/apis.js");

describe('ActivityLogs', () => {
  test('renders the component', () => {
    const wrapper = shallow(<ActivityLogs projectID="123" />);
    expect(wrapper.exists()).toBe(true);
  });

  test('matches the snapshot', () => {
    const wrapper = shallow(<ActivityLogs projectID="123" />);
    expect(wrapper).toMatchSnapshot();
  });


});
