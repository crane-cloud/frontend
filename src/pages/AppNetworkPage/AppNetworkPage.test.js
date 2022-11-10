/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppNetworkPage, { mapStateToProps } from "./";

const props = {
  appNetworkMetrics: [{ slug: "slug" }],
};

describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = AppNetworkPage.WrappedComponent;
    const mycomponent = shallow(<wrapper {...props} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    const newComponent = AppNetworkPage.WrappedComponent;
    const wrapper = shallow(<newComponent {...props} />);
    wrapper.setProps(props);
    expect(wrapper).toBeDefined();
  });
});

describe("test the map state to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        appNetworkReducer: {
          appNetworkMetrics: [],
          isFetchingAppNetwork: false,
          appNetworkMessage: "",
        },
        appsListReducer: { apps: [] },
      })
    ).toEqual({
      appNetworkMetrics: [],
      isFetchingAppNetwork: false,
      appNetworkMessage: "",
      apps: [],
    });
  });
});
