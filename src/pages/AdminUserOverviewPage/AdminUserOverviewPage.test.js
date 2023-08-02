import React from "react";
import { shallow } from "enzyme";
import AdminUserOverviewPage from "./";
import AdminInactiveUsers from "../../components/AdminInactiveUsers";

describe("AdminUserOverviewPage Component", () => {
  it("should render without errors", () => {
    const wrapper = shallow(<AdminUserOverviewPage />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render AdminInactiveUsers component", () => {
    const wrapper = shallow(<AdminUserOverviewPage />);
    expect(wrapper.find(AdminInactiveUsers)).toHaveLength(1);
  });
});
