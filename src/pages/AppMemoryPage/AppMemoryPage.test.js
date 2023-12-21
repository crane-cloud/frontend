/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import AppMemoryPage, { mapStateToProps } from "./";

const props = {
  data: { id: "1" },
  match: { params: { projectID: "2" } },
  appMemoryMetrics: [{ item: "item" }],
  getUserProjects: jest.fn(),
  getClustersList: jest.fn(),
  clearAppMemory: jest.fn(),
  getAppMemory: jest.fn(),
};

describe("test the component", () => {
  const NewComponent = AppMemoryPage.WrappedComponent;
  const Wrapper = render(<NewComponent {...props} />);
  it("matchs the component snapshot", () => {
    expect(Wrapper).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    Wrapper.setProps(props);
    expect(Wrapper).toBeDefined();
  });
});

describe("test the map state to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        appMemoryReducer: { isFetchingAppMemory: false, appMemoryMetrics: [] },
        appsListReducer: { apps: [] },
      })
    ).toEqual({ isFetchingAppMemory: false, appMemoryMetrics: [], apps: [] });
  });
});
