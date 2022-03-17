/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppsPage, { mapStateToProps } from "./";

const AppsPageProps = {
  response: { apps: "apps" },
};

describe("testing the Apps page component", () => {
  it("this matchs Apps page component snapshot", () => {
    const AppsPagewrapped = AppsPage.WrappedComponent;
    const mycomponent = shallow(<AppsPagewrapped {...AppsPageProps} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match wrapped component snapshot", () => {
    const NewComponent = AppsPage.WrappedComponent;
    const wrapper = shallow(<NewComponent {...AppsPageProps} />);
    wrapper.setProps(AppsPageProps);
    expect(wrapper).toBeDefined();
  });
});

describe("test only map state to props", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        createAppReducer: { isCreated: false },
        userProjectsReducer: { projects:[] }
      })
    ).toEqual({
      projects:[],
      isCreated: false,
    });
  });
});
