import React from "react";

import { render } from "@testing-library/react";

import Spinner from "./index";

describe("Spinner Component", () => {
  it("Renders a Spinner component", () => {
    const SpinnerComponent = render(<Spinner />);
    expect(
      SpinnerComponent.find(".SmallSpinnerWrapper").hasClass(
        "SmallSpinnerWrapper"
      )
    ).toBe(true);
    expect(SpinnerComponent).toMatchSnapshot();
  });
});
