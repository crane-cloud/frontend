import React from "react";
import { render } from "@testing-library/react";

import Header from "../../components/Header";

import AdminLoginPage from "./index";

const Props = {
  saveUser: jest.fn(),
  removeUser: jest.fn(),
};

describe("Admin <Login /> Component", () => {
  const handleChange = jest.fn();
  const validateEmail = jest.fn();
  const handleSubmit = jest.fn();

  const WrapperAdminLoginPage = AdminLoginPage.WrappedComponent;
  const AdminLoginPageComponent = render(<WrapperAdminLoginPage {...Props} />);
  // const AdminLoginPageComponent = render(<AdminLoginPage/>);
  AdminLoginPageComponent.setProps(Props);

  it("component should match the snapshot", () => {
    expect(AdminLoginPageComponent).toMatchSnapshot();
    expect(handleChange).toBeDefined();
    expect(validateEmail).toBeDefined();
    expect(handleSubmit).toBeDefined();
  });

  it("should have an email field", () => {
    expect(
      AdminLoginPageComponent.find('InputText[name="email"]').length
    ).toEqual(1);
  });

  it("should have proper props for email field", () => {
    expect(
      AdminLoginPageComponent.find('InputText[name="email"]').props()
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
      AdminLoginPageComponent.find('InputText[name="password"]').length
    ).toEqual(1);
  });
  it("should have proper props for password field", () => {
    expect(
      AdminLoginPageComponent.find('InputText[name="password"]').props()
    ).toEqual({
      onChange: expect.any(Function),
      placeholder: "Password",
      required: true,
      value: "",
      name: "password",
      type: "password",
    });
  });
});
