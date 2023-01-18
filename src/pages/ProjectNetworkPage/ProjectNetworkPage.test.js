import React from "react";
import { shallow } from "enzyme";
import ProjectNetworkPage ,{ mapStateToProps } from "./";

const ProjectNetworkPageProps = {
  fetchNetwork: jest.fn(),
  handlePeriodChange: jest.fn(),
  getDateCreated: jest.fn(),
  getProjectNetwork: jest.fn(),
  clearProjectNetwork: jest.fn(),
  networkMetrics: [{metrics : [{ slug: "slug" }]} ],
  match: {params:{}},
  location:{pathname:"path"},
  projects:[],
  isFetchingNetwork:false
};


describe(" components test", () => {
  it("matching to  snapshots", () => {
    const Wrapper = ProjectNetworkPage.WrappedComponent;
    const component = shallow(<Wrapper {...ProjectNetworkPageProps} />);

    expect(component).toMatchSnapshot();
  });
  it("test if its matching snapshot", () => {
    const Component = ProjectNetworkPage.WrappedComponent;
    const wrapper = shallow(<Component {...ProjectNetworkPageProps} />);
    wrapper.setProps(ProjectNetworkPageProps);
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

});

describe("testing the mapstate method", () => {
  it("mapstostate should be as expected", () => {
    expect(mapStateToProps({
        projectNetworkReducer: { isFetchingNetwork: false, networkMetrics: [] },
        userProjectsReducer: { projects: [] },
      })
    ).toEqual({ isFetchingNetwork: false, networkMetrics: [], projects: [] });
  });
});
