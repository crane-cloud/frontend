import React from "react";
import { render } from "@testing-library/react";

import DonutChart from ".";

describe("Test the donut chart component", () => {
  it("checks if the donut chart component matches the snapshot", () => {
    const onMouseEnter = jest.fn();
    const data = [
      { name: "sample1" },
      { name: "sample2" },
      { name: "sample3" },
      { name: "sample4" },
      { name: "sample5" },
    ];
    const DonutChartComponent = render(
      <DonutChart
        center_x={0}
        center_y={0}
        InnerRadius={0}
        OuterRadius={0}
        data={data}
        height={0}
        width={0}
        onPieEnter={onMouseEnter}
      />
    );
    expect(DonutChartComponent).toMatchSnapshot();
  });
});
