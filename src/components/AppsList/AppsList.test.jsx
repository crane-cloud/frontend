/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppsList, { mapStateToProps } from "./";

const AppsListProps = {
  app: { name: "sanlam" },
  params: { projectID: "1" },
  message: "This successful",
  getAppsList: jest.fn(),
};

describe("Test AppsList component", () => {
  let applistWrapper;
  beforeEach(() => {
    const AppsListwrapper = AppsList.WrappedComponent;
    applistWrapper = shallow(<AppsListwrapper {...AppsListProps} />);
  });

  it("should check `componentDidMount()`", () => {
    applistWrapper.instance().componentDidMount();
    expect(AppsListProps.getAppsList).toHaveBeenCalledTimes(2); 
    
    expect(AppsListProps.getAppsList).toBeDefined();
    expect(AppsListProps.params).toBeDefined();
    expect(applistWrapper.instance().props.getAppsList).toBeCalled();
  });
  it("matching component snapshot for AppsList", () => {
    expect(applistWrapper).toMatchSnapshot();
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
