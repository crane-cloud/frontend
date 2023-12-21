import React from "react";

import { render } from "@testing-library/react";

import SettingsButton from "./index";

describe("Button Component", () => {
  it("Renders a button component", () => {
    const buttonEvent = jest.fn();
    const ButtonComponent = render(
      <SettingsButton
        className="Settings-Btn"
        onClick={buttonEvent}
        label="Close"
        disable={true}
      />
    );

    expect(ButtonComponent.find(".Settings-Btn").text()).toBe("Close");
    expect(ButtonComponent.find(".Settings-Btn").hasClass("Settings-Btn")).toBe(
      true
    );

    ButtonComponent.find(".Settings-Btn").simulate("click");
    expect(buttonEvent).toHaveBeenCalled();

    expect(ButtonComponent.find(".Settings-Btn").props()["disabled"]).toBe(
      true
    );
  });
});
