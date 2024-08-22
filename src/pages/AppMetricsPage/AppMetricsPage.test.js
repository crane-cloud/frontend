import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import React from "react";

import AppMetricsPage from ".";


describe("Testing the App Metrics Page component", () => {
  const AppMetricsPageComponent = shallow(
    <MemoryRouter initialEntries={["/project/1/apps/2"]}> 
      <AppMetricsPage />
    </MemoryRouter>
  );
  expect(AppMetricsPageComponent).toBeDefined();
  it("matches the ProjectDashboardPage component snapshot", () => {
    const AppMetricsPageComponent = shallow(
      <MemoryRouter initialEntries={["/project/1/apps/2"]}> 
      <AppMetricsPage />
    </MemoryRouter>
    );
    expect(AppMetricsPageComponent).toMatchSnapshot();
  });
});

