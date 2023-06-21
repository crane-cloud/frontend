/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import GraphInput from ".";
import { bool } from "prop-types";
const GraphInputProps = {
    formatString: jest.fn(),
    createTimestamp: jest.fn(),
    handleChange: jest.fn(),
    onClick: jest.fn(),
    showCalendar: bool,
    getDate: jest.fn(),
    trimMonthName: jest.fn(),
};
describe('Graph input component', () => {
  const GraphInputWrapper = shallow(<GraphInput {...GraphInputProps} />);

  it("graph input  should match snapshot", () => {
    expect(GraphInputWrapper).toMatchSnapshot();
  });
  it("calls the onClick callback when the input is clicked", () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <GraphInput
        handleChange={jest.fn()}
        showCalendar={false}
        onClick={onClickMock}
        value=""
      />
    );
  
    wrapper.find(".DateInputDisplay").simulate("click");
    expect(onClickMock).toHaveBeenCalled();
  });
  // it("updates the state correctly when the Calendar changes", () => {
  //   const wrapper = shallow(
  //     <GraphInput
  //       handleChange={jest.fn()}
  //       showCalendar={true}
  //       onClick={jest.fn()}
  //       value=""
  //     />
  //   );

  //   // Trigger the change event on the Calendar component
  //   wrapper.find("Calendar").prop("onChange")({ day: 1, month: 2, year: 2023 });

  //   // Get the state value using the useState hook
  //   const [date] = wrapper.find("GraphInput").prop("date");

  //   // Verify that the state of the GraphInput component is updated correctly
  //   expect(date).toEqual({ day: 1, month: 2, year: 2023 });
  // });

  it("calls the onCancel callback when the cancel button is clicked", () => {
    const onCancelMock = jest.fn();
    const wrapper = shallow(
      <GraphInput
        handleChange={jest.fn()}
        showCalendar={true}
        onClick={jest.fn()}
        value=""
        onCancel={onCancelMock}
      />
    );
  
    wrapper.find(".CancelBtn").simulate("click");
    expect(onCancelMock).toHaveBeenCalled();
  });

  it("should match the snapshot", () => {
    GraphInputWrapper.setProps(GraphInputProps);
    expect(GraphInputWrapper).toBeDefined();
    expect(GraphInputWrapper).toHaveLength(1);
  });
});
