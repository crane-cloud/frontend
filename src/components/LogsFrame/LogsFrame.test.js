import React from "react";

import { shallow } from "enzyme";

import LogsFrame from "./";

describe("Test the logs frame component", () => {
  const LogsFrameComponent = shallow(<LogsFrame data={[]} title="" loading={false} />);
  const LogsFrameLoadingComponent = shallow(<LogsFrame data={[]} title="" loading={true} />);
  it("checks if the logs frame component matches the snapshot", () => {
    expect(LogsFrameComponent).toMatchSnapshot();
  });
  describe("test the toggle button functionality", () => {
    const ToggleButton = LogsFrameComponent.find(".LogsHeaderSection").childAt(1);
    it("checks if the toggle button is the child at index 1", () => {
        expect(ToggleButton.prop("onClick")).toBeDefined();
        ToggleButton.simulate("click");
    });
    it("checks if the logs are rendered", () => {
        const LogsFrameDataComponent = shallow(<LogsFrame data={["sample 1","sample 2"]} title="" loading={false} />);
        expect(LogsFrameDataComponent.find(".LogsAvailable").length).toBe(1);
    })
  });
});
