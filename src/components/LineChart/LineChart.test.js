import React from "react";
import { shallow } from "enzyme";
import LineChart from ".";

describe("Test the line chart component", () => {
  const linechartData = [
    { name: "A", min: 400, max: 2400, sum: 2400 },
    { name: "B", min: 40, max: 240, sum: 240 },
  ];
  const linechartPropsNoPreview = {
    data: linechartData,
    preview: false,
    xLabel: "",
    yLabel: "",
    xDataKey: "",
    yDataKey: "",
    lineDataKey: "",
  };
  const linechartPropsPreivew = {...linechartPropsNoPreview, preview:true};
  const linechartNoData = {...linechartPropsNoPreview, data:[]};

  const LineChartNoPreview = shallow(<LineChart {...linechartPropsNoPreview} />);
  const LineChartPreview = shallow(<LineChart {...linechartPropsPreivew} />);
  const LineChartNoData = shallow(<LineChart {...linechartNoData} />);
  it("checks if the information bar component matches the snapshot", () => {
    expect(LineChartNoPreview).toMatchSnapshot();
  });
});
