import React from "react";
import { render } from "@testing-library/react";

// import Header from "../../components/Header";
import { API_BASE_URL } from "../../config";
import axios from "axios";

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

  let LoginPageComponent;

  beforeEach(() => {
    LoginPageComponent = render(<WrapperLoginPage {...Props} />);
  });

  // LoginPageComponent.setProps(Props);

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

  it("should initialize the login state correctly", () => {
    const expectedInitialState = {
      email: "",
      password: "",
      loading: false,
      error: "",
      gitLoading: false,
      feedbackMessage: "",
      passwordShown: false,
      hidden: true,
    };

    expect(LoginPageComponent.state()).toEqual(expectedInitialState);
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

  it("should toggle the 'passwordShown' state when 'togglePassword' is called", () => {
    LoginPageComponent.instance().togglePassword();

    expect(LoginPageComponent.state("passwordShown")).toBe(true);

    LoginPageComponent.instance().togglePassword();

    expect(LoginPageComponent.state("passwordShown")).toBe(false);
  });

  it("should update the state correctly when 'handleChange' is called", () => {
    const mockEvent = {
      target: {
        name: "name",
        value: "John Doe",
      },
    };

    LoginPageComponent.instance().handleChange(mockEvent);

    expect(LoginPageComponent.state("name")).toBe("John Doe");
  });

  it("should validate the email correctly when 'validateEmail' is called", () => {
    const validEmail = "test@example.com";
    const invalidEmail = "invalid-email";

    expect(LoginPageComponent.instance().validateEmail(validEmail)).toBe(true);
    expect(LoginPageComponent.instance().validateEmail(invalidEmail)).toBe(
      false
    );
  });

  it("should update the state correctly and call 'axios.post' when 'handleSubmit' is called with valid data", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    const axiosPostSpy = jest.spyOn(axios, "post");

    LoginPageComponent.setState({
      email: "test@example.com",
      password: "password",
    });

    LoginPageComponent.instance().handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    expect(LoginPageComponent.state("loading")).toBe(true);
    expect(axiosPostSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        email: "test@example.com",
        password: "password",
      })
    );
  });

  // it("should make a POST request to the server when 'initiateGitHubLogin' is called with a code", () => {
  //   const code = "testCode";

  //   const axiosPostSpy = jest.spyOn(axios, "post");

  //   LoginPageComponent.instance().initiateGitHubLogin(code);

  //   expect(axiosPostSpy).toHaveBeenCalledWith(
  //     `${API_BASE_URL}/users/oauth`,
  //     {
  //       code: "testCode",
  //     }
  //   );
  // });

  it("should update the state correctly when 'initiateGitHubLogin' is called successfully", () => {
    const code = "testCode";
    const responseData = {
      status: "success",
      data: {
        access_token: "accessToken",
      },
    };

    jest.spyOn(axios, "post").mockResolvedValue({ data: responseData });

    LoginPageComponent.instance().initiateGitHubLogin(code);

    expect(LoginPageComponent.state("gitLoading")).toBe(true);
    expect(LoginPageComponent.state("feedbackMessage")).toBe("Please wait");
  });

  it("should update the state correctly when 'initiateGitHubLogin' fails", () => {
    const code = "testCode";

    jest.spyOn(axios, "post").mockRejectedValueOnce({});

    LoginPageComponent.instance().initiateGitHubLogin(code);

    expect(LoginPageComponent.state("gitLoading")).toBe(true);
    expect(LoginPageComponent.state("error")).toBe("");
    expect(LoginPageComponent.state("feedbackMessage")).toBe("Please wait");
  });

  it("should update the state correctly when 'handleSubmit' is called with invalid data", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    LoginPageComponent.instance().handleSubmit(mockEvent);

    expect(LoginPageComponent.state("error")).toBe(
      "Please enter your email and password"
    );
  });

  it("should render the GitHub login button", () => {
    LoginPageComponent.setState({
      gitLoading: false,
    });

    expect(LoginPageComponent.find(".GithubLoginBtn").exists()).toBe(true);
    expect(LoginPageComponent.find(".GithubLoginBtn").prop("disabled")).toBe(
      false
    );
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
});
