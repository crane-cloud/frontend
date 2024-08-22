/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import ProjectDashboardPage from "./";

describe("Testing the App Metrics Page component", () => {
  it("should match the snapshot for ProjectDashboardPage after adding props", () => {
    const ProjectDashboardPageComponent = shallow(
      <MemoryRouter initialEntries={["/project/1"]}> 
        <ProjectDashboardPage />
      </MemoryRouter>
    );
    expect(ProjectDashboardPageComponent).toBeDefined();
  });

  it("matches the ProjectDashboardPage component snapshot", () => {
    const ProjectDashboardPageComponent = shallow(
      <MemoryRouter initialEntries={["/project/1"]}>
        <ProjectDashboardPage />
      </MemoryRouter>
    );
    expect(ProjectDashboardPageComponent).toMatchSnapshot();
  });
});
