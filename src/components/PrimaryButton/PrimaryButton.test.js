import React from "react";
import { shallow } from "enzyme";
import PrimaryButton from "./index";

describe("PrimaryButton Component", () => {
  it("renders a button component with text and triggers click event", () => {
    const buttonEvent = jest.fn();
    const buttonLabel = "Login";
    const ButtonComponent = shallow(
      <PrimaryButton onClick={buttonEvent}>{buttonLabel}</PrimaryButton>
    );

    // Verify that the button text is rendered correctly
    expect(ButtonComponent.text()).toBe(buttonLabel);

    // Trigger a click event on the button
    ButtonComponent.simulate("click");

    // Verify that the click event was triggered
    expect(buttonEvent).toHaveBeenCalled();
  });

  it("applies additional class names and props", () => {
    const className = "Primary-Btn";
    const buttonLabel = "Submit";
    const additionalProps = {
      disabled: true,
    };

    const ButtonComponent = shallow(
      <PrimaryButton className={className} {...additionalProps}>
        {buttonLabel}
      </PrimaryButton>
    );

    // Verify that the additional class names are applied
    expect(ButtonComponent.hasClass(className)).toBe(true);

    // Verify that additional props are applied
    expect(ButtonComponent.prop("disabled")).toBe(true);
  });
});
