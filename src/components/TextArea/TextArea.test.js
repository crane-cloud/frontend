import React from "react";

import { render } from "@testing-library/react";

import TextArea from "./index";

const TextAreaProps = {
  value: "text",
  required: false,
};

describe("Test the component", () => {
  const OnChangeEvent = jest.fn();
  const TextAreaComponent = render(
    <TextArea
      required={true}
      name=""
      placeholder="*"
      value=""
      onChange={OnChangeEvent}
    />
  );

  it("should match the snapshot for TextArea after adding props", () => {
    TextAreaComponent.setProps(TextAreaProps);
    expect(TextAreaComponent).toBeDefined();
  });

  it("checks if TextArea rendered as expected", () => {
    TextAreaComponent.find("textarea").simulate("change", {
      target: { value: "typing" },
    });
    expect(OnChangeEvent).toHaveBeenCalled();
    expect(TextAreaComponent).toMatchSnapshot();
  });
});
