/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ProjectCPUPage ,{ mapStateToProps } from "./";

const ProjectCpuPageProps = {
  fetchCpu: jest.fn(),
  handlePeriodChange: jest.fn(),
  getDateCreated: jest.fn(),
  cpuMetrics: [{ slug: "slug" }],
  match: {params:{}}
};



describe('Test component Container', () => {
  it('Test class constructor', () => {
    const wrappedProjectCPUPage = ProjectCPUPage.WrappedComponent;
    const wrapper = shallow(<wrappedProjectCPUPage />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
  });
});

describe("test out component", () => {
  it("should matchs  component snapshot", () => {
    const wrapper = ProjectCPUPage.WrappedComponent;
    const component = shallow(<wrapper {...ProjectCpuPageProps} />);

    expect(component).toMatchSnapshot();
  });
  it("match snapshot", () => {
    const newComponent = ProjectCPUPage.WrappedComponent;
    const wrapper = shallow(<newComponent {...ProjectCpuPageProps} />);
    wrapper.setProps(ProjectCpuPageProps);
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

});

describe("testing  the mapstate   to props", () => {
  it("match  mapstostate", () => {
    expect(mapStateToProps({
        projectCPUReducer: { isFetchingCPU: false, cpuMetrics: [] },
        userProjectsReducer: { projects: [] },
      })
    ).toEqual({ isFetchingCPU: false, cpuMetrics: [], projects: [] });
  });
});
