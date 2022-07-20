import React from "react";
import { shallow } from "enzyme";

import CreateNewPassword from "./index";

const Props = {
  saveUser: jest.fn(),
  removeUser: jest.fn(),
};

describe(" New password Component", () => {
  const handleOnChange = jest.fn();
  const handleSubmit = jest.fn();

  const CreateNewPasswordComponent = shallow(<CreateNewPassword {...Props} />);
  // const CreateNewPasswordComponent = shallow(<CreateNewPassword/>);
  CreateNewPasswordComponent.setProps(Props);

  it("component should match the snapshot", () => {
    expect(CreateNewPasswordComponent).toMatchSnapshot();
    expect(handleOnChange).toBeDefined();
    expect(handleSubmit).toBeDefined();
  });

  it("should have an password field", () => {
    expect(CreateNewPasswordComponent.find('InputPassword[name="password"]').length).toEqual(
      1
    );
  });

  it("should have proper props for email field", () => {
    expect(CreateNewPasswordComponent.find('InputPassword[name="password"]').props()).toEqual({
      onChange: expect.any(Function),
      placeholder: "Password",
      required: false,
      value: "",
      name: "password",
    });
  });

  it("should have a password field", () => {
    expect(
      CreateNewPasswordComponent.find('InputPassword[name="password"]').length
    ).toEqual(1);
  });
  it("should have proper props for password field", () => {
    expect(
      CreateNewPasswordComponent.find('InputPassword[name="password"]').props()
    ).toEqual({
      onChange: expect.any(Function),
      placeholder: "Password",
      required: false,
      value: "",
      name: "password",
    });
  });
});
