import React from "react";
import { render } from "@testing-library/react";

import TeamPage from ".";

describe("Testing the TeamPage component", () => {
  it("should match the team page snapshot", () => {
    const TeamPageComponent = render(<TeamPage />);
    expect(TeamPageComponent).toMatchSnapshot();
  });
});
