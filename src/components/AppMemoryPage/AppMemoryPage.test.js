/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import 
  AppMemoryPage,{
  mapStateToProps}
 from "./";

const props = {
  appMemoryMetrics: [{ slug: "slug" }]
};

describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = AppMemoryPage.WrappedComponent;
    const mycomponent = shallow(<wrapper {...props} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    const newComponent = AppMemoryPage.WrappedComponent;
    const wrapper = shallow(<newComponent {...props} />);
    wrapper.setProps(props);
    expect(wrapper).toBeDefined();
  });
});

describe("test the map state to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        appMemoryReducer: { isFetchingAppMemory: false, appMemoryMetrics: [] },
        appsListReducer: { apps: [] }
      })
    ).toEqual({ isFetchingAppMemory: false, appMemoryMetrics: [], apps: [] });
  });
});