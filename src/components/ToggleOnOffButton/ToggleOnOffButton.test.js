import React from "react";

import { render } from "@testing-library/react";

import ToggleOnOffButton from "./index";

describe("Status Component", () => {
  it("Renders a Status component", () => {
    const ToggleOnOffComponent = render(<ToggleOnOffButton />);
    expect(
      ToggleOnOffComponent.find(".ToggleBase").hasClass("ToggleBase")
    ).toBe(true);
    expect(ToggleOnOffComponent).toMatchSnapshot();
  });
});
