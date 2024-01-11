import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store"; // Install redux-mock-store
import thunk from "redux-thunk"; // Install redux-thunk
import AppMemoryPage from "./";

// Mock your Redux store
const mockStore = configureStore([thunk]);
const initialState = {
  appMemoryReducer: {
    isFetchingAppMemory: false,
    appMemoryMetrics: [],
    appMemoryMessage: null,
  },
  appsListReducer: {
    apps: [],
  },
};
const store = mockStore(initialState);

// Mock the necessary props
const mockProps = {
  match: {
    params: {
      appID: "mockAppID",
    },
  },
  isFetchingAppMemory: false,
  appMemoryMetrics: [],
  getAppMemory: jest.fn(),
  clearAppMemory: jest.fn(),
  apps: {
    apps: [
      {
        id: "mockAppID",
        name: "Mock App",
        date_created: "2022-01-10T12:00:00Z",
      },
    ],
  },
};

describe("AppMemoryPage Component", () => {
  it("renders AppMemoryPage component correctly", async () => {
    render(
      <Provider store={store}>
        <AppMemoryPage {...mockProps} />
      </Provider>
    );

    // Assuming Spinner component has a data-testid attribute
    await waitFor(() =>
      expect(screen.getByTestId("Spinner")).not.toBeInTheDocument()
    );

    // Assuming LineChartComponent has a data-testid attribute
    expect(screen.getByTestId("LineChart")).toBeInTheDocument();
  });

  it("fetches app memory data on component mount", () => {
    render(
      <Provider store={store}>
        <AppMemoryPage {...mockProps} />
      </Provider>
    );

    expect(mockProps.clearAppMemory).toHaveBeenCalled();
    expect(mockProps.getAppMemory).toHaveBeenCalledWith(
      "mockProjectID",
      "mockAppID",
      { step: "2h" }
    );
  });

  it("handles period change and fetches memory accordingly", async () => {
    render(
      <Provider store={store}>
        <AppMemoryPage {...mockProps} />
      </Provider>
    );

    // Assuming PeriodSelector component has a data-testid attribute
    const periodSelector = screen.getByTestId("PeriodSelector");

    // Trigger a period change, you may need to adjust the event depending on your actual implementation
    fireEvent.change(periodSelector, { target: { value: "1d" } });

    // Wait for the asynchronous changes to take effect
    await waitFor(() =>
      expect(mockProps.getAppMemory).toHaveBeenCalledWith(
        "mockProjectID",
        "mockAppID",
        { step: "2h" }
      )
    );
  });
});
