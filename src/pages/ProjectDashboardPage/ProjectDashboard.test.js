/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import ProjectDashboardPage, { mapStateToProps } from "./";

const ProjectDashboardPageProps = {
  clusters: { log1: 1, log2: 2 },
  match: { params: { projectId: "1" } },
  getProjectMemory: jest.fn(),
  getProjectCPU: jest.fn(),
  getProjectNetwork: jest.fn(),
  clearProjectCPU: jest.fn(),
  projects: [
    {
      isRetrieving: false,
    },
  ],
};
// {} ={}
describe("Testing the App Metrics Page component", () => {
  const WrapperProjectDashboardPage = ProjectDashboardPage.WrappedComponent;
  const ProjectDashboardPageComponent = render(
    <WrapperProjectDashboardPage {...ProjectDashboardPageProps} />
  );
  it("should match the snapshot for ProjectDashboardPage after adding props", () => {
    ProjectDashboardPageComponent.setProps(ProjectDashboardPageProps);
    expect(ProjectDashboardPageComponent).toBeDefined();
  });
  it("matchs the ProjectDashboardPage component snapshot", () => {
    expect(ProjectDashboardPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        projectMemoryReducer: {
          isFetchingMemory: false,
          memoryMetrics: [],
          memoryMessage: "",
        },
        projectCPUReducer: {
          isFetchingCPU: false,
          cpuMetrics: [],
          cpuMessage: "",
        },
        projectNetworkReducer: {
          isFetchingNetwork: false,
          networkMetrics: [],
          networkMessage: "",
        },
        userProjectsReducer: { projects: [] },
        userCreditsReducer: { credits: [] },
      })
    ).toEqual({
      isFetchingMemory: false,
      memoryMetrics: [],
      memoryMessage: "",
      isFetchingCPU: false,
      cpuMetrics: [],
      cpuMessage: "",
      isFetchingNetwork: false,
      networkMetrics: [],
      networkMessage: "",
      projects: [],
      credits: [],
    });
  });
});
