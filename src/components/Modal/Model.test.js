import React from "react";

import { render } from "@testing-library/react";

import Model from ".";

describe("Test the Model component", () => {
  it("checking for proper rendering", () => {
    const ModelComponent = render(<Model />);
    expect(ModelComponent).toMatchSnapshot();
  });
});
