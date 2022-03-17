/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppMetricsPage, { mapStateToProps } from "./";

const AppMetricsPageProps = {
  logs: [{metric: 0.5}],
};

describe("Testing the App Metrics Page component", () => {
  const WrapperAppMetricsPage = AppMetricsPage.WrappedComponent;
  const AppMetricsPageComponent = shallow(<WrapperAppMetricsPage {...AppMetricsPageProps} />);
  it("matchs the AppMetricsPage component snapshot", () => {
    expect(AppMetricsPageComponent).toMatchSnapshot();
  });
  it("should match the snapshot for AppMetricsPage after adding props", () => {
    AppMetricsPageComponent.setProps(AppMetricsPageProps);
    expect(AppMetricsPageComponent).toBeDefined();
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
    });
  });
});
