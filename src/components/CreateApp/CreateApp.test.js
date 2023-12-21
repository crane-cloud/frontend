/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import CreateApp, { mapStateToProps } from "./";

const CreateAppProps = {
  clusters: { log1: 1, log2: 2 },
  match: { params: { projectId: "1" } },
  clearUpdateClusterState: jest.fn(),
  updateCluster: jest.fn(),
  data: { beta: true },
  clearState: jest.fn(),
  getClustersList: jest.fn(),
};
// {} ={}
describe("Testing the App Metrics Page component", () => {
  const WrapperCreateApp = CreateApp.WrappedComponent;
  const CreateAppComponent = render(<WrapperCreateApp {...CreateAppProps} />);
  it("should match the snapshot for CreateApp after adding props", () => {
    CreateAppComponent.setProps(CreateAppProps);
    expect(CreateAppComponent).toBeDefined();
  });
  it("matchs the CreateApp component snapshot", () => {
    expect(CreateAppComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the Appmetricspage mapstostate", () => {
    expect(
      mapStateToProps({
        clustersReducer: {
          clusters: [],
        },
        user: { data: [] },
      })
    ).toEqual({
      clusters: [],
      data: [],
    });
  });
});
