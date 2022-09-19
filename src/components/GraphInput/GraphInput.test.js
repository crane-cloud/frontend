/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import GraphInput from ".";
const GraphInputProps = {
    formatString: jest.fn(),
    createTimestamp: jest.fn(),
    getDate: jest.fn(),
    trimMonthName: jest.fn(),
};
describe('Graph input component', () => {
  const GraphInputWrapper = shallow(<GraphInput {...GraphInputProps} />);
  it("graph input  should match snapshot", () => {
    expect(GraphInputWrapper).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    GraphInputWrapper.setProps(GraphInputProps);
    expect(GraphInputWrapper).toBeDefined();
    expect(GraphInputWrapper).toHaveLength(1);
  });
});
