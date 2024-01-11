import React from "react";

import { render } from "@testing-library/react";

import ResourceCard from "./index";

describe("ResourceCard Component", () => {
  it("Renders the ResourceCard component", () => {
    const ResourceCardComponent = render(
      <ResourceCard className="ResourceCard" title="db" count="2" />
    );

    expect(ResourceCardComponent.find(".CardHeader").text()).toBe("db");
    expect(
      ResourceCardComponent.find(".CardHeader").hasClass("CardHeader")
    ).toBe(true);

    expect(ResourceCardComponent.find(".ResourceDigit").text()).toBe("2");
    expect(
      ResourceCardComponent.find(".ResourceDigit").hasClass("ResourceDigit")
    ).toBe(true);
  });
});
