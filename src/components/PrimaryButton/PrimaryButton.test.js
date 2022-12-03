import React from "react";

import { shallow } from "enzyme";

import PrimaryButton from "./index";

describe("Button Component", () => {
  it("Renders a button component", () => {
    const buttonEvent = jest.fn();
    const ButtonComponent = shallow(
      <PrimaryButton className="Primary-Btn" onClick={buttonEvent}>
        Login
      </PrimaryButton>
    );

    expect(ButtonComponent.find(".Primary-Btn").text()).toBe("Login");
    expect(
      ButtonComponent.find(".Primary-Btn").hasClass("Primary-Btn uppercase")
    ).toBe(true);

    ButtonComponent.find(".Primary-Btn").simulate("click");
    expect(buttonEvent).toHaveBeenCalled();
  });
});
