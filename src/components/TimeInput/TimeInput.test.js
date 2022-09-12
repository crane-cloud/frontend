/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import TimeInput from ".";
const TimeInputProps = {
    setTimeOfDay: jest.fn(),
    handleFocus: jest.fn(),
    formatTime: jest.fn(),
    changeHour: jest.fn(),
    changeMinutes: jest.fn(),
    onChange: jest.fn(),
    format24HourClock: jest.fn(),
};
describe('Test Time input component', () => {
  const TimeInputWrapper = shallow(<TimeInput {...TimeInputProps} />);
  it('Test Time input class constructor', () => {
    expect(TimeInputWrapper.exists()).toBeTruthy();
    expect(TimeInputWrapper).toHaveLength(1);
  });
  it("time input component should match snapshot", () => {
    expect(TimeInputWrapper).toMatchSnapshot();
  });
  it("time input should match the snapshot", () => {
    TimeInputWrapper.setProps(TimeInputProps);
    expect(TimeInputWrapper).toBeDefined();
    expect(TimeInputWrapper).toHaveLength(1);
  });
});
