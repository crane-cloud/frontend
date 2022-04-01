/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppsList, { mapStateToProps } from "./";

const AppsListProps = {
  app: { name: "sanlam" },
  params: { projectID: "1"},
};

describe("Test AppsList component", () => {

  const AppsListwrapper = AppsList.WrappedComponent;
  const AppsListComponent = shallow(<AppsListwrapper {...AppsListProps} />);
  it("matching component snapshot for AppsList", () => {
    expect(AppsListComponent).toMatchSnapshot();
  });
  it("should match AppsList component to the snapshot", () => {
    AppsListComponent.setProps(AppsListProps);
    expect(AppsListComponent).toBeDefined();
  });
});

describe("Test AppsList's map state to props and dispatch", () => {
  it("test result to match the mapstostate function", () => {
    expect(
      mapStateToProps({
        appsListReducer: { isRetrieving: false, apps: [], isRetrieved: false },
      })
    ).toEqual({
      isRetrieving: false,
      apps: [],
      isRetrieved: false,
    });
  });
});
