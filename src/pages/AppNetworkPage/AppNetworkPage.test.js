/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import AppNetworkPage, { mapStateToProps } from "./";

const props = {
  appNetworkMetrics: [{ slug: "slug" }],
};

describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = AppNetworkPage.WrappedComponent;
    const mycomponent = render(<wrapper {...props} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    const newComponent = AppNetworkPage.WrappedComponent;
    const wrapper = render(<newComponent {...props} />);
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
