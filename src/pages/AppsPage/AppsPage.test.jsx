/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import AppsPage, { mapStateToProps } from "./";

const AppsPageProps = {
  response: { apps: "apps" },
  match: { params: { projectID: "id" } },
  clearState: jest.fn(),
  projects: [],
};

describe("testing the Apps page component", () => {
  it("this matchs Apps page component snapshot", () => {
    const AppsPagewrapped = AppsPage.WrappedComponent;
    const mycomponent = render(<AppsPagewrapped {...AppsPageProps} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match wrapped component snapshot", () => {
    const NewComponent = AppsPage.WrappedComponent;
    const wrapper = render(<NewComponent {...AppsPageProps} />);
    wrapper.setProps(AppsPageProps);
    expect(wrapper).toBeDefined();
  });
});

describe("test only map state to props", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        userProjectsReducer: { projects: [] },
      })
    ).toEqual({
      projects: [],
    });
  });
});
