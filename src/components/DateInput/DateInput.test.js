/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import DateInput from ".";
const DateInputProps = {
    formatString: jest.fn(),
    createTimestamp: jest.fn(),
    getDate: jest.fn(),
    getTime: jest.fn(),
    trimMonthName: jest.fn(),
};
describe('Date input component', () => {
  const DateInputWrapper = shallow(<DateInput {...DateInputProps} />);
  it("date input  should match snapshot", () => {
    expect(DateInputWrapper).toMatchSnapshot();
  });
  it("Date input component should match the snapshot", () => {
    DateInputWrapper.setProps(DateInputProps);
    expect(DateInputWrapper).toBeDefined();
    expect(DateInputWrapper).toHaveLength(1);
  });
});
