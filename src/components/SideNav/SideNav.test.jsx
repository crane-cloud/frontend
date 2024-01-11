import React from "react";
import { render } from "@testing-library/react";

import SideNav from ".";

describe("SideNav component", () => {
  const defaultProps = {
    clusterId: "mockClusterId",
    clusterName: "Mock Cluster",
  };

  it("should render the SideNav component", () => {
    const wrapper = render(<SideNav {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should handle menu click on mobile", () => {
    const wrapper = render(<SideNav {...defaultProps} />);
    const menuIcon = wrapper.find(".MenuIcon");
    menuIcon.simulate("click");
    // expect(wrapper.state("OpenForsmallScreen")).toBe(true); // Check if the state is updated correctly
  });
});
