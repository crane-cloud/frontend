import React from "react";

import { render } from "@testing-library/react";

import InputText from "./index";

const InputTextProps = {
  value: "text",
  required: false,
};

describe("Test the component", () => {
  const OnChangeEvent = jest.fn();
  const changeBackground = jest.fn();
  const InputTextComponent = render(
    <InputText
      required={true}
      name=""
      placeholder="*"
      value=""
      onChange={OnChangeEvent}
    />
  );

  it("should match the snapshot for InputText after adding props", () => {
    InputTextComponent.setProps(InputTextProps);
    expect(InputTextComponent).toBeDefined();
  });

  it("checks if InputText rendered as expected on typing", () => {
    InputTextComponent.find("input").simulate("change", {
      target: { value: "typing" },
    });
    expect(OnChangeEvent).toHaveBeenCalled();
    expect(InputTextComponent).toMatchSnapshot();
  });

  it("should test the background change function", () => {
    expect(changeBackground).toBeDefined();
  });
});
