import React from "react";
import { shallow } from "enzyme";
import MiraPage from "./index";

describe("Testing the MiraPage component", () => {
  const miraPageWrapper = shallow(<MiraPage />);

  it("should match snapshot", () => {
    expect(miraPageWrapper).toMatchSnapshot();
  });
});
