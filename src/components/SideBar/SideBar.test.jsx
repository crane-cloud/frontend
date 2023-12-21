import React from "react";
import { render } from "@testing-library/react";

import { useLocation } from "react-router-dom";
import SideBar from ".";

// Mock the useParams hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    projectID: "mockProjectID",
    appID: "mockAppID",
  }),
  useLocation: jest.fn(),
}));

describe("SideBar component", () => {
  const defaultProps = {
    name: "Test Sidebar",
  };

  beforeEach(() => {
    useLocation.mockReturnValue({ pathname: "/mock-path" });
  });

  it("should render the SideBar component", () => {
    const wrapper = render(<SideBar {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the sidebar links correctly", () => {
    const wrapper = render(<SideBar {...defaultProps} />);
    const sidebarLinks = wrapper.find(".SubBarListItem");
    expect(sidebarLinks.length).toBe(0); // Adjust the value based on your expected number of links
  });

  it("should handle menu click on mobile", () => {
    const wrapper = render(<SideBar {...defaultProps} />);
    const menuIcon = wrapper.find(".MenuIcon");
    menuIcon.simulate("click");
    //expect(wrapper.state("OpenForsmallScreen")).toBe(true); // Check if the state is updated correctly
  });
});
