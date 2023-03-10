import React from "react";
import { shallow } from "enzyme";
import Header from "../../components/Header";

import LoginPage from "./index";

const Props = {
  saveUser: jest.fn(),
  removeUser: jest.fn(),
};

describe("<Login /> Component", () => {
  const handleChange = jest.fn();
  const toGithubauth = jest.fn();
  const validateEmail = jest.fn();
  const handleSubmit = jest.fn();
  const initiateGitHubLogin = jest.fn();

  const WrapperLoginPage = LoginPage.WrappedComponent;
  const LoginPageComponent = shallow(<WrapperLoginPage {...Props} />);
  // const LoginPageComponent = shallow(<LoginPage/>);
  LoginPageComponent.setProps(Props);

  it("component should match the snapshot", () => {
    expect(LoginPageComponent).toMatchSnapshot();
    expect(handleChange).toBeDefined();
    expect(toGithubauth).toBeDefined();
    expect(validateEmail).toBeDefined();
    expect(handleSubmit).toBeDefined();
    expect(initiateGitHubLogin).toBeDefined();
  });

  it("should have an email field", () => {
    expect(LoginPageComponent.find('InputText[name="email"]').length).toEqual(
      1
    );
  });

  it("should have proper props for email field", () => {
    expect(LoginPageComponent.find('InputText[name="email"]').props()).toEqual({
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
      LoginPageComponent.find('InputText[name="password"]').length
    ).toEqual(1);
  });
  it("should have proper props for password field", () => {
    expect(
      LoginPageComponent.find('InputText[name="password"]').props()
    ).toEqual({
      onChange: expect.any(Function),
      placeholder: "Password",
      required: true,
      value: "",
      type: "password",
      name: "password",
    });
  });

  // it("should have proper props for submit button", () => {
  //   expect(LoginPageComponent.find(".LoginButton").props()).toBe({
  //     onClick: expect.any(Function),
  //     className: "LoginButton AuthBtn",
  //     type: "submit",
  //     children: "login",
  //   });
  // });
});
