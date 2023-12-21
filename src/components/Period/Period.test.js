/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import Period from ".";
const PeriodProps = {
  switchCalendars: jest.fn(),
  displayCalendar: jest.fn(),
  closeCalendar: jest.fn(),
  handleClickOutside: jest.fn(),
  handleChange: jest.fn(),
  handleFromDate: jest.fn(),
  handleToDate: jest.fn(),
  handleSubmit: jest.fn(),
};
describe("Test period component", () => {
  const PeriodWrapper = render(<Period {...PeriodProps} />);
  it("Test for class constructor", () => {
    expect(PeriodWrapper.exists()).toBeTruthy();
    expect(PeriodWrapper).toHaveLength(1);
  });
  it("period component should match snapshot", () => {
    expect(PeriodWrapper).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    PeriodWrapper.setProps(PeriodProps);
    expect(PeriodWrapper).toBeDefined();
    expect(PeriodWrapper).toHaveLength(1);
  });
});
