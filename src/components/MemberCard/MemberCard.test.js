import React from "react";
import { render } from "@testing-library/react";

import MemberCard from ".";

describe("Testing the MemberCard component", () => {
  it("should match the member card snapshot", () => {
    const MemberCardComponent = render(<MemberCard name="" title="" icon="" />);
    expect(MemberCardComponent).toMatchSnapshot();
  });
});
