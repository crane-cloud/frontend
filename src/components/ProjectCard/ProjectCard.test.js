/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import ProjectCard, { mapStateToProps } from "./";

const props = {
  getProjectMemoryMetrics: jest.fn(),
  memoryMetrics: [{ slug: "slug" }],
};

describe("test the component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = ProjectCard.WrappedComponent;
    const mycomponent = render(<wrapper {...props} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("component should match the snapshot", () => {
    const newComponent = ProjectCard.WrappedComponent;
    const wrapper = render(<newComponent {...props} />);
    wrapper.setProps(props);
    expect(wrapper).toBeDefined();
  });
});

describe("testing the mapstate to props ", () => {
  it(" mapstostate test", () => {
    expect(
      mapStateToProps({
        projectMemoryReducer: {
          isFetchingMemory: false,
          memoryMetrics: [],
        },
      })
    ).toEqual({
      memoryMetrics: [],
      isFetchingMemory: false,
    });
  });
});
