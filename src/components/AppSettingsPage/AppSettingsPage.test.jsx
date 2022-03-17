/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AppSettingsPage, { mapStateToProps } from "./";

const AppSettingsPageProps = {
  data: { app: "test-app" },
};

describe("Test for the AppSettingsPage", () => {
  const AppSettingsPageComponent = AppSettingsPage.WrappedComponent;
  const AppSettingsPageWrapper = shallow(<AppSettingsPageComponent {...AppSettingsPageProps} />);
  it("matchs AppSettingsPage snapshot", () => {
    expect(AppSettingsPageWrapper).toMatchSnapshot();
  });
  it("AppSettingsPage to match component with props", () => {
    AppSettingsPageWrapper.setProps(props);
    expect(AppSettingsPageWrapper).toBeDefined();
  });
});

describe("Test the mapstatetoprops function", () => {
  it("match mapstostate to outcome", () => {
    expect(
      mapStateToProps({
        deleteAppReducer: {
          isDeleting: false,
          isDeleted: false,
          isFailed: false,
          message: "",
        },
        singleAppReducer: { app: [] },
        updateAppReducer: {
          isUpdating: false,
          isUpdated: false,
          errorMessage: "",
        },
        user: { data: [] },
        revertUrlReducer: { isReverting: false, isReverted: false },
      })
    ).toEqual({
      isDeleting: false,
      isDeleted: false,
      isFailed: false,
      message: "",
      app: [],
      isUpdating: false,
      isUpdated: false,
      errorMessage: "",
      data: [],
      isReverting: false,
      isReverted: false,
    });
  });
});
