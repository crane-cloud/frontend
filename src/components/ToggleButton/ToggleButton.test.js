import React from "react";
import { render } from "@testing-library/react";

import ToggleButton from "./index";

describe("Toggle Button Component", () => {
  it("Renders a Toggle button component", () => {
    const buttonEvent = jest.fn();
    const ButtonComponent = render(<ToggleButton onClick={buttonEvent} />);

    expect(ButtonComponent).toMatchSnapshot();
  });
});
