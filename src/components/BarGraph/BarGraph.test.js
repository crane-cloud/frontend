import React from "react";
import { render } from "@testing-library/react";

import BarGraph from "./";

describe("Test the bar graph component", () => {
  const barGraphData = [{ name: "1" }, { name: "2" }];
  const barGraphProps = {
    data: barGraphData,
    height: 0,
    width: 0,
    barSize: 0,
    width_percentage: 0,
    height_percentage: 0,
  };
  const BarGraphComponent = render(<BarGraph {...barGraphProps} />);
  it("checks if the bar graph component matches the snapshot", () => {
    expect(BarGraphComponent).toMatchSnapshot();
  });
});
