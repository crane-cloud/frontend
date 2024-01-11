import React from "react";

import { render } from "@testing-library/react";

import NewLogo from "./index";

describe("Test new logo", () => {
  const NewLogoComponent = render(<NewLogo />);
  it("checks whether required elements rendered", () => {
    const BrandLogoType = NewLogoComponent.find("div > div");
    expect(BrandLogoType.hasClass("BrandLogoType")).toEqual(true);
    expect(BrandLogoType.text()).toBe("Crane Cloud");
  });
  it("checks rendered component matches snapshot", () => {
    expect(NewLogoComponent).toMatchSnapshot();
  });
});
