import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";
import RegisterPage from "./index";
import { submit } from "redux-form";

describe("<RegisterPage/> Component", () => {
  const handleOnChange = jest.fn();
  const toGithubauth = jest.fn();
  const validateEmail = jest.fn();
  const handleSubmit = jest.fn();

  const RegisterPageComponent = shallow(<RegisterPage />);

  it(" component should match the snapshot", () => {
    expect(RegisterPageComponent).toMatchSnapshot();
    expect(RegisterPageComponent).toBeDefined();
    expect(handleOnChange).toBeDefined();
    expect(toGithubauth).toBeDefined();
    expect(validateEmail).toBeDefined();
    expect(handleSubmit).toBeDefined();
  });

  it("should have an email field", () => {
    expect(
      RegisterPageComponent.find('InputText[name="email"]').length
    ).toEqual(1);
  });

  it("should have proper props for email field", () => {
    expect(
      RegisterPageComponent.find('InputText[name="email"]').props()
    ).toEqual({
      onChange: expect.any(Function),
      placeholder: "Email Address",
      required: true,
      value: "",
      name: "email",
      type: "email",
    });
  });

  it("should have a password field", () => {
    expect(
      RegisterPageComponent.find('InputText[name="password"]').length
    ).toEqual(1);
  });
  it("should have proper props for password field", () => {
    expect(
      RegisterPageComponent.find('InputText[name="password"]').props()
    ).toEqual({
      onChange: expect.any(Function),
      placeholder: "Password",
      required: true,
      value: "",
      name: "password",
      type: "password",
    });
  });

  it("should have proper props for submit button", () => {
    expect(RegisterPageComponent.find(".LoginButton").props()).toBe({
      onClick: expect.any(Function),
      className: "LoginButton AuthBtn",
      type: "submit",
      children: "Register"
    });
  });
});
