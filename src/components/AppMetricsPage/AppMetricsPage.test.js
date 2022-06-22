/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppMetricsPage, { mapStateToProps } from "./";

const AppMetricsPageProps = {
  logs: ["log1", "log2"],
  match: { params: { projectID: "1" } },
  getAppLogs: jest.fn(),
  getAppMemory: jest.fn(),
  getAppCPU: jest.fn(),
  getAppNetwork: jest.fn(),
  clearUrlRevertState: jest.fn(),
};
// {} ={}
describe("Testing the App Metrics Page component", () => {
  const WrapperAppMetricsPage = AppMetricsPage.WrappedComponent;
  const AppMetricsPageComponent = shallow(<WrapperAppMetricsPage {...AppMetricsPageProps} />);
  it("should match the snapshot for AppMetricsPage after adding props", () => {
    AppMetricsPageComponent.setProps(AppMetricsPageProps);
    expect(AppMetricsPageComponent).toBeDefined();
  });
  it("matchs the AppMetricsPage component snapshot", () => {
    expect(AppMetricsPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the Appmetricspage mapstostate", () => {
    expect(
      mapStateToProps({
        appMemoryReducer: {
          isFetchingAppMemory: false,
          appMemoryMetrics: [],
          appMemoryMessage: "",
        },
        appLogsReducer: {
          logs: [],
          retrievedLogs: false,
          retrieveingLogs: false,
        },
        appCpuReducer: {
          isFetchingCPU: false,
          appCPUMetrics: [],
          cpuMessage: "",
        },
        appNetworkReducer: {
          appNetworkMetrics: [],
          isFetchingAppNetwork: false,
          appNetworkMessage: "",
        },
        appsListReducer: { apps: [] },
        revertUrlReducer: {
          isReverting: false,
          isReverted: false
        }
      })
    ).toEqual({
      isFetchingAppMemory: false,
      appMemoryMetrics: [],
      appMemoryMessage: "",
      logs: [],
      retrievedLogs: false,
      retrieveingLogs: false,
      isFetchingCPU: false,
      appCPUMetrics: [],
      cpuMessage: "",
      appNetworkMetrics: [],
      isFetchingAppNetwork: false,
      appNetworkMessage: "",
      apps: [],
      isReverted:false,
      isReverting:false
    });
  });
});
