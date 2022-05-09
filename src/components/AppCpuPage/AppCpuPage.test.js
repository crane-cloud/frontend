import React from "react";
import { shallow } from "enzyme";
import AppCpuPage, { mapStateToProps } from "./";

const AppCpuPageProps = {
  getAppName: jest.fn(),
  handlePeriodChange: jest.fn(),
  fetchCpu: jest.fn(),
  getDateCreated: jest.fn(),
  getAppCPU: jest.fn(),
  appCPUMetrics: [{ metrics: { timestamp: "" } }],
  match: { params: {} },
  cpuMessage: "",
  location: { pathname: "derek" },
  apps: [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
  ],
  clearAppCPU: jest.fn(),
};

// LEAVE THE COMMENTED OUT CODE
describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const CPUWrapped = AppCpuPage.WrappedComponent;
    const CPUPropsComponent = shallow(<CPUWrapped {...AppCpuPageProps} />);
    expect(CPUPropsComponent).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    const WrappedCPU = AppCpuPage.WrappedComponent;
    const OriginalConnectedComponent = shallow(
      <WrappedCPU {...AppCpuPageProps} />
    );
    let wrapper = OriginalConnectedComponent.instance();
    const spy = jest.spyOn(wrapper, "componentDidMount");
    wrapper.componentDidMount();

    expect(spy).toHaveBeenCalled();

    expect(wrapper.componentDidMount).toHaveBeenCalled();
    wrapper.handlePeriodChange("1d");
    expect(wrapper.handlePeriodChange).toBeDefined();
    wrapper.fetchCpu(1);
    expect(wrapper.fetchCpu).toBeDefined();
  
    spy.mockRestore();
  });
});

describe("test the map state to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        appCpuReducer: { isFetchingCPU: false, appCPUMetrics: [] },
        appsListReducer: { apps: [] },
      })
    ).toEqual({ isFetchingCPU: false, appCPUMetrics: [], apps: [] });
  });
});
