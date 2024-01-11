import React from "react";

import { render } from "@testing-library/react";

import ProgressBar from ".";

describe("Testing Progress bar Component", () => {
  it("Renders Progress bar component", () => {
    const ProgressBarComponent = render(<ProgressBar />);
    expect(
      ProgressBarComponent.find(".ProgressBarContainer").hasClass(
        "ProgressBarContainer"
      )
    ).toBe(true);
    expect(ProgressBarComponent).toMatchSnapshot();
  });
});
