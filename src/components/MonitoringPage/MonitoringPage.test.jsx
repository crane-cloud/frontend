import React from "react";
import { shallow } from "enzyme";
import MonitoringPage from "./index";

describe("Testing the MonitoringPage component", () => {
  const monitoringPageWrapper = shallow(<MonitoringPage />);
  const handleDropdown = jest.fn();
  const viewAppModules = jest.fn();
  const viewDBModules = jest.fn();
  const viewRegistryModules = jest.fn();
  const viewMiraModules = jest.fn();
  const handleClickOutside = jest.fn();
  const getStatusData = jest.fn();

  it("should match the monitoring page snapshot", () => {
    expect(monitoringPageWrapper).toMatchSnapshot();
    expect(handleDropdown).toBeDefined();
    expect(viewAppModules).toBeDefined();
    expect(viewDBModules).toBeDefined();
    expect(viewRegistryModules).toBeDefined();
    expect(viewMiraModules).toBeDefined();
    expect(handleClickOutside).toBeDefined();
    expect(getStatusData).toBeDefined();
  });
});
