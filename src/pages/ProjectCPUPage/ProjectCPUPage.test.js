/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import ProjectCPUPage, { mapStateToProps } from "./";

const ProjectCpuPageProps = {
  fetchCpu: jest.fn(),
  handlePeriodChange: jest.fn(),
  getDateCreated: jest.fn(),
  clearProjectCPU: jest.fn(),
  getProjectCPU: jest.fn(),
  isFetchingCPU: false,
  projects: [],
  cpuMetrics: [{ metrics: [{ slug: "slug" }] }],
  location: { pathname: "path" },
  match: { params: { projectID: "1", userID: "2" } },
};

describe("test out component", () => {
  it("should matchs  component snapshot", () => {
    const Wrapper = ProjectCPUPage.WrappedComponent;
    const component = render(<Wrapper {...ProjectCpuPageProps} />);

    expect(component).toMatchSnapshot();
  });
  it("match snapshot", () => {
    const NewComponent = ProjectCPUPage.WrappedComponent;
    const wrapper = render(<NewComponent {...ProjectCpuPageProps} />);
    wrapper.setProps(ProjectCpuPageProps);
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });
});

describe("testing  the mapstate   to props", () => {
  it("match  mapstostate", () => {
    expect(
      mapStateToProps({
        projectCPUReducer: { isFetchingCPU: false, cpuMetrics: [] },
        userProjectsReducer: { projects: [] },
      })
    ).toEqual({ isFetchingCPU: false, cpuMetrics: [], projects: [] });
  });
});
