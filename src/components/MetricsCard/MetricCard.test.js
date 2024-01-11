import React from "react";

import { render } from "@testing-library/react";

import MetricsCard from "./index";

describe("MetricsCard Component", () => {
  it("Renders the MetricsCard component", () => {
    const MetricsCardComponent = render(<MetricsCard />);
    expect(
      MetricsCardComponent.find(".CardHeaderSection").hasClass(
        "CardHeaderSection"
      )
    ).toBe(true);
    expect(MetricsCardComponent).toMatchSnapshot();
  });
});
