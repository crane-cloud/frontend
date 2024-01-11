/* eslint-disable no-undef */
import React from "react";

import { render } from "@testing-library/react";

import LandingPage, { mapStateToProps } from "./";

const LandingPageProps = {
  user: {
    data: {
      id: undefined,
    },
  },
};
const userDefinedProps = {
  user: {
    data: {
      id: "test",
    },
  },
};
describe("LandingPage component test", () => {
  let landingpageWrapper, landingpageUserWrapper;
  beforeEach(() => {
    const LandingPagewrapper = LandingPage.WrappedComponent;
    landingpageWrapper = render(<LandingPagewrapper {...LandingPageProps} />);
    landingpageUserWrapper = render(
      <LandingPagewrapper {...userDefinedProps} />
    );
  });
  it("matches rendered component with the existing snapshot", () => {
    expect(landingpageWrapper).toMatchSnapshot();
  });
});
describe("Test the landing page map state to props", () => {
  it("checks the result of map state to props function", () => {
    expect(
      mapStateToProps({
        user: {},
      })
    ).toEqual({
      user: {},
    });
  });
});
