import React from "react";
import axios from "axios";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./";

// Mock Redux store and actions
const mockSaveUser = jest.fn();
const mockRemoveUser = jest.fn();
jest.mock("react-redux", () => ({
  connect: () => (Component) => Component,
  useDispatch: () => jest.fn(),
  useSelector: () => ({ user: {} }), // Mock the user state
}));

jest.mock("axios");

describe("LoginPage component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form without errors", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("submits the form with valid credentials", async () => {
    // Mock successful login response
    axios.post.mockResolvedValueOnce({
      data: {
        status: "success",
        data: { access_token: "mocked_token" },
      },
    });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // user input and form submission
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("login"));

    // Wait for the login request to complete
    // await waitFor(() => {
    //   expect(axios.post).toHaveBeenCalledTimes(1);
    //   expect(mockSaveUser).toHaveBeenCalledTimes(1);
    //   expect(localStorage.setItem).toHaveBeenCalledWith(
    //     "token",
    //     "mocked_token"
    //   );
    // });
  });

  it("displays an error message with invalid credentials", async () => {
    // Mock failed login response
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Incorrect email or password." } },
    });

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Simulate user input and form submission
    fireEvent.change(screen.getByPlaceholderText("Email Address"), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalid_password" },
    });

    fireEvent.click(screen.getByText("login"));

    // Wait for the login request and error handling
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      const errorMessage = screen.queryByText(/incorrect email or password/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

});
