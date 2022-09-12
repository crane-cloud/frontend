/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import SpendingPeriod from ".";
const SpendingPeriodProps = {
  switchCalendars: jest.fn(),
  displayCalendar: jest.fn(),
  closeCalendar: jest.fn(),
  handleClickOutside: jest.fn(),
  handleChange: jest.fn(),
  handleFromDate: jest.fn(),
  handleToDate: jest.fn(),
  handleSubmit: jest.fn(),
};
describe('Test billing period component', () => {
  const SpendingPeriodWrapper = shallow(<SpendingPeriod {...SpendingPeriodProps} />);
  it('Test for billing class constructor', () => {
    expect(SpendingPeriodWrapper.exists()).toBeTruthy();
    expect(SpendingPeriodWrapper).toHaveLength(1);
  });
  it("billing period component should match snapshot", () => {
    expect(SpendingPeriodWrapper).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    SpendingPeriodWrapper.setProps(SpendingPeriodProps);
    expect(SpendingPeriodWrapper).toBeDefined();
    expect(SpendingPeriodWrapper).toHaveLength(1);
  });
});
