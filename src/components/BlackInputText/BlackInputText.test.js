import React from "react";

import { shallow } from "enzyme";

import BlackInputText from "./index";

const BlackInputTextProps = {
  value: "text",
  required: false,
  type: "text",
  readOnly: false,
  onfocus: () => {},
};

describe("Test the component", () => {
  const OnChangeEvent = jest.fn();
  const BlackInputTextComponent = shallow(
    <BlackInputText name="" placeholder="*" value="" onChange={OnChangeEvent} />
  );

  it("should match the snapshot for TextArea after adding props", () => {
    BlackInputTextComponent.setProps(BlackInputTextProps);
    expect(BlackInputTextProps).toBeDefined();
  });
  it("checks if BlackInputText rendered as expected", () => {
    BlackInputTextComponent.find("input").simulate("change", {
      target: { value: "typing" },
    });
    expect(OnChangeEvent).toHaveBeenCalled();
    expect(BlackInputTextComponent).toMatchSnapshot();
  });
});
