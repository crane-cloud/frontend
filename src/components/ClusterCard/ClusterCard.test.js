import React from "react";
import { render } from "@testing-library/react";

import ClusterCard from "./index";

describe("Test the cluster card component", () => {
  const ClusterCardComponent = render(
    <ClusterCard description="" icon="" name="" />
  );
  it("checks if the cluster card component matches the snapshot", () => {
    expect(ClusterCardComponent).toMatchSnapshot();
  });
});
