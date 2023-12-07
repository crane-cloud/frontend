import React from "react";
import { shallow } from "enzyme";
import DashboardLayout from "./DashboardLayout";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideBar from "../SideBar";

describe("DashboardLayout component", () => {
  const mockProps = {
    children: <div>Content</div>,
    name: "John Doe",
    credits: { amount: 100 },
    header: "Dashboard",
    short: false
  };

  it("renders the DashboardLayout component correctly", () => {
    const wrapper = shallow(<DashboardLayout {...mockProps} />);

    // Check if child components are rendered
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(InformationBar)).toHaveLength(1);
    expect(wrapper.find(SideBar)).toHaveLength(1);

    // Check if props are passed correctly to child components
    expect(wrapper.find(Header).prop("credits")).toBe(mockProps.credits.amount);
    expect(wrapper.find(InformationBar).prop("header")).toBe(mockProps.header);
    expect(wrapper.find(SideBar).prop("name")).toBe(mockProps.name);

    // children are rendered on mount test
    expect(wrapper.find(".DashboardChildrenSection").contains(mockProps.children)).toBe(false);

    // Check if CSS classes are applied correctly
    expect(wrapper.find(".DashboardPage")).toHaveLength(1);
    expect(wrapper.find(".DashboardTopBarSection")).toHaveLength(1);
    expect(wrapper.find(".DashboardMainSection")).toHaveLength(1);
    expect(wrapper.find(".DashboardSideBarSection")).toHaveLength(1);
    expect(wrapper.find(".DashboardMainContentSection")).toHaveLength(1);
    expect(wrapper.find(".DasboardChildrenSection").hasClass("SmallContainer")).toBe(true);
  });

  it("renders the DashboardLayout component correctly with short container", () => {
    const propsWithShortContainer = {
      ...mockProps,
      short: true,
    };
    const wrapper = shallow(<DashboardLayout {...propsWithShortContainer} />);

    expect(wrapper.find(".DasboardChildrenSection").hasClass("ShortContainer")).toBe(true);
  });
});
