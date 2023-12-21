import React from "react";

import { render } from "@testing-library/react";

import Tooltip from "./index";

describe("Test the component", () => {
  it("checks if tooltip matches snapshot", () => {
    const TooltipIcon = render(
      <Tooltip showIcon={true} keyword="" position="top" message="" />
    );
    const TooltipNoIcon = render(
      <Tooltip showIcon={false} keyword="" position="top" message="" />
    );
    expect(TooltipIcon).toMatchSnapshot();
  });
});
