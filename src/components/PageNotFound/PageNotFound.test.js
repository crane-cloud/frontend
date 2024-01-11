import React from "react";

import { render } from "@testing-library/react";

import PageNotFound from ".";

describe("Page not found Component", () => {
  it("Renders a page not found component", () => {
    const PageNotFoundComponent = render(<PageNotFound />);
    expect(
      PageNotFoundComponent.find(".ErrorPageConent").hasClass("ErrorPageConent")
    ).toBe(true);
    expect(PageNotFoundComponent).toMatchSnapshot();
  });
});
