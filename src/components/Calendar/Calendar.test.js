/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import Calendar from "./";

const CalendarProps = {
  prevMonth: jest.fn(),
  nextMonth: jest.fn(),
  daysInMonth: jest.fn(),
  renderDays: jest.fn(),
  handleSelected: jest.fn(),
  onChange: jest.fn(),
};

describe("TestContainer", () => {
  const CalendarWrapper = render(<Calendar {...CalendarProps} />);
  it("Test class constructor", () => {
    expect(CalendarWrapper.exists()).toBeTruthy();
    expect(CalendarWrapper).toHaveLength(1);
  });
  it("matchs the component snapshot", () => {
    expect(CalendarWrapper).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    CalendarWrapper.setProps(CalendarProps);
    expect(CalendarWrapper).toBeDefined();
    expect(CalendarWrapper).toHaveLength(1);
  });
});
