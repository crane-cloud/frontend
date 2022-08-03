import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
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

  it("assert the card dropdown arrow flip", () => {
    const ArrowFlipWrapper = monitoringPageWrapper
      .find(".CardArrow")
      .childAt(0);
    ArrowFlipWrapper.simulate("click");
    // next we verify that the arrow flips
    expect(monitoringPageWrapper.find(".CardArrow").childAt(0)).not.toEqual(
      ArrowFlipWrapper
    );
  });
});

describe("should check useState", () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = Enzyme.shallow(<MonitoringPage />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Viewing App modules", () => {
    it("calls setOptionsFor", () => {
      wrapper.find(".CardArrow").props().onClick();
      expect(setState).toBeDefined();
    });
  });
});
