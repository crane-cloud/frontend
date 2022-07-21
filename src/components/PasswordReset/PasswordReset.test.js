import React from "react";
import { shallow } from "enzyme";

import PasswordReset from "./index";

describe(" New password Component", () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const validateEmail = jest.fn();

  const PasswordResetComponent = shallow(<PasswordReset />);

  it("component should match the snapshot", () => {
    expect(PasswordResetComponent).toMatchSnapshot();
    expect(handleChange).toBeDefined();
    expect(handleSubmit).toBeDefined();
    expect(validateEmail).toBeDefined();
  });

  it("Test onChange component method", () => {
    const event = {
      target: {
        value: 'New',
        name: 'email',
      },
    };
    const instance = PasswordResetComponent.instance();

    instance.handleChange(event);
    instance.validateEmail(event);
    expect(instance.state.email).toBe('New');
  });

  it("should have an password field", () => {
    expect(PasswordResetComponent.find('InputText[name="email"]').length).toEqual(
      1
    );
  });

  it("should have proper props for email field", () => {
    expect(PasswordResetComponent.find('InputText[name="email"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "Email Address",
      required: true,
      value: "New",
      name: "email",
    });
  });

  it("should have a email field", () => {
    expect(
      PasswordResetComponent.find('InputText[name="email"]').length
    ).toEqual(1);
  });
  it("should have proper props for email field", () => {
    expect(
      PasswordResetComponent.find('InputText[name="email"]').props()
    ).toEqual({
      onChange: expect.any(Function),
      placeholder: "Email Address",
      required: true,
      value: "New",
      name: "email",
    });
  });
});
