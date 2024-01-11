/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import CreateProject, { mapStateToProps } from "./";

const CreateProjectProps = {
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
  const WrapperCreateProject = CreateProject.WrappedComponent;
  const CreateProjectComponent = render(
    <WrapperCreateProject {...CreateProjectProps} />
  );
  it("should match the snapshot for CreateProject after adding props", () => {
    CreateProjectComponent.setProps(CreateProjectProps);
    expect(CreateProjectComponent).toBeDefined();
  });
  it("matchs the CreateProject component snapshot", () => {
    expect(CreateProjectComponent).toMatchSnapshot();
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
