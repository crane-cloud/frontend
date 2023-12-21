import React from "react";

import { render } from "@testing-library/react";

import NavLogo from ".";

describe("Test the nav logo", () => {
  it("checks for correct rendering of the component", () => {
    const NavLogoComponent = render(<NavLogo />);
    expect(NavLogoComponent).toMatchSnapshot();
    expect(NavLogoComponent.find("img").length).toBe(1);
  });
});
