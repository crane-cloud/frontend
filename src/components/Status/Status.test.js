import React from "react";

import { render } from "@testing-library/react";

import Status from "./index";

describe("Status Component", () => {
  it("Renders a Status component", () => {
    const StatusComponent = render(<Status />);
    expect(StatusComponent.find(".StatusSignal").hasClass("StatusSignal")).toBe(
      true
    );
    expect(StatusComponent).toMatchSnapshot();
  });
  it("Renders a Status component running status", () => {
    const StatusComponent = render(<Status status={"running"} />);
    expect(StatusComponent.find(".StatusIsOn").hasClass("StatusIsOn")).toBe(
      true
    );
    expect(StatusComponent).toMatchSnapshot();
  });
});
