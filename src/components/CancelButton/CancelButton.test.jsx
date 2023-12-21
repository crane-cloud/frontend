import React from "react";

import { render } from "@testing-library/react";

import CancelButton from "./index";

describe("Button Component", () => {
  it("Renders a button component", () => {
    const buttonEvent = jest.fn();
    const ButtonComponent = render(
      <CancelButton buttonClass="CancelButton" onClick={buttonEvent} />
    );
    expect(ButtonComponent.find(".CancelButton").hasClass("CancelButton")).toBe(
      true
    );

    ButtonComponent.find(".CancelButton").simulate("click");
    expect(buttonEvent).toHaveBeenCalled();
  });
});
