import React from "react";

import { render } from "@testing-library/react";

import AppStatus from "./index";

describe("AppStatus Component", () => {
  it("Renders a AppStatus component", () => {
    const AppStatusComponent = render(<AppStatus />);
    expect(
      AppStatusComponent.find(".StatusWrapper").hasClass("StatusWrapper")
    ).toBe(true);
    expect(AppStatusComponent).toMatchSnapshot();
  });
});
