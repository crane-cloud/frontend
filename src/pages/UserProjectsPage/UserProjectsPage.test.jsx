import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For extended jest-dom assertions
import { Provider } from "react-redux"; // Import your Redux Provider
import configureStore from "redux-mock-store"; // Install the redux-mock-store library
import thunk from "redux-thunk"; // If you're using redux-thunk

import UserProjectsPage from "./";

// Mock your Redux store
const middlewares = [thunk]; // Add any middlewares you're using
const mockStore = configureStore(middlewares);

const initialState = {
  user: {
    data: {
      id: "123",
      username: "testUser",
    },
  },
  clustersReducer: {
    clusters: [],
  },
  userProjectsReducer: {
    isRetrieving: false,
    projects: [],
    pagination: {},
    isFetched: false,
  },
  userCreditsReducer: {
    credits: {},
  },
};

let store;

beforeEach(() => {
  store = mockStore(initialState);
});

it("renders UserProjectsPage component", () => {
  render(
    <Provider store={store}>
      <UserProjectsPage />
    </Provider>
  );

  // Add your testing assertions based on the component's behavior
  expect(screen.getByText("Projects")).toBeInTheDocument();
  // Add more assertions as needed
});

// Add more test cases as needed based on your component's behavior
