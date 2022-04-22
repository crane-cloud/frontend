/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ProjectMemoryPage ,{ mapStateToProps } from "./";

const ProjectMemoryPageProps = {
  fetchMemory: jest.fn(),
  handlePeriodChange: jest.fn(),
  getDateCreated: jest.fn(),
  getProjectMemory: jest.fn(),
  clearProjectMemory: jest.fn(),
  memoryMetrics: [{metrics : [{ slug: "slug" }]} ],
  match: {params:{}},
  location:{pathname:"path"},
  projects:[],
  isFetchingMemory:false
};




describe("testing the component", () => {
  it("should match  snapshots", () => {
    const Wrapper = ProjectMemoryPage.WrappedComponent;
    const component = shallow(<Wrapper {...ProjectMemoryPageProps} />);
    expect(component).toMatchSnapshot();
  });
  it("if its matching snapshot", () => {
    const Component = ProjectMemoryPage.WrappedComponent;
    const wrapper = shallow(<Component {...ProjectMemoryPageProps} />);
    wrapper.setProps(ProjectMemoryPageProps);
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

});

describe("testing the mapstate export to props", () => {
  it("mapstostate should be as expected", () => {
    expect(mapStateToProps({
        projectMemoryReducer: { isFetchingMemory: false, memoryMetrics: [] },
        userProjectsReducer: { projects: [] },
      })
    ).toEqual({ isFetchingMemory: false, memoryMetrics: [], projects: [] });
  });
});
