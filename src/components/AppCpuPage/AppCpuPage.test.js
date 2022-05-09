/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import {AppCpuPage, mapStateToProps } from "./";

const AppCpuPageProps = {
  getAppName: jest.fn(),
  handlePeriodChange: jest.fn(),
  fetchCpu: jest.fn(),
  getDateCreated: jest.fn(),
  getAppCpuMetrics: jest.fn(),
  appCPUMetrics: [{ slug: "slug" }],
  match: {params:{}}
};

// LEAVE THE COMMENTED OUT CODE

describe('TestContainer', () => {
  // const testWrapper = shallow(<AppCpuPage {...AppCpuPageProps} />);
  it('Test class constructor', () => {
    const wrappedAppCPUPage = AppCpuPage.WrappedComponent;
    const wrapper = shallow(<wrappedAppCPUPage />);
    // const wrapperInstance = wrapper.instance();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
    // const testWrapperInstance = testWrapper.instance()
    // console.log(testWrapperInstance)
    // expect(wrapper.state.period).toBe("1d");
  });
});
describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = AppCpuPage.WrappedComponent;
    const mycomponent = shallow(<wrapper {...AppCpuPageProps} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    const newComponent = AppCpuPage.WrappedComponent;
    const wrapper = shallow(<newComponent {...AppCpuPageProps} />);
    wrapper.setProps(AppCpuPageProps);
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
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
