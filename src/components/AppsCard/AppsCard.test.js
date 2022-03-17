/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppsCard, { mapStateToProps } from "./";

const props = {
  appMemoryMetrics: [{ slug: "slug" }],
};

describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = AppsCard.WrappedComponent;
    const mycomponent = shallow(<wrapper {...props} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match the snapshot", () => {
    const newComponent = AppsCard.WrappedComponent;
    const wrapper = shallow(<newComponent {...props} />);
    wrapper.setProps(props);
    expect(wrapper).toBeDefined();
  });
});

describe("test the map state to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        user: { data: [] },
        appMemoryReducer: {
          appMemoryMetrics: [],
          isFetchingAppMemory: false,
          appMemoryMessage: "",
        },
      })
    ).toEqual({
      data: [],
      appMemoryMetrics: [],
      isFetchingAppMemory: false,
      appMemoryMessage: "",
    });
  });
});
