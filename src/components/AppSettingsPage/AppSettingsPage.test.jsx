/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ProjectSettingsPage, { mapStateToProps } from "./";

const AppSettingsPage = {
  match: { params: { projectID: "1" } },
  location: {pathname:"path"},
  data: {beta:[]},
  handleDeleteApp: jest.fn(),
  showDeleteAlert: jest.fn(),
  hideDeleteAlert: jest.fn(),
  renderRedirect: jest.fn(),
  handleChange: jest.fn(),
  showUpdateModal: jest.fn(),
  hideUpdateModal: jest.fn(),
  clearFetchAppState: jest.fn(),
  clearState: jest.fn(),
  clearUpdateAppstate: jest.fn(),
  clearUrlRevertState: jest.fn(),
  getSingleApp: jest.fn(),
  clearUpdateAppState: jest.fn()
};


describe("Testing the Project Settings Page component", () => {
  const WrapperProjectSettingsPage = ProjectSettingsPage.WrappedComponent;
  const ProjectSettingsPageComponent = shallow(<WrapperProjectSettingsPage {...AppSettingsPage}/>);
  
  it("should match the snapshot for ProjectSettingsPage after adding props", () => {
    ProjectSettingsPageComponent.setProps(ProjectSettingsPage);
    expect(ProjectSettingsPageComponent).toBeDefined();
  });
  it("matchs the ProjectSettingsPage component snapshot", () => {
    expect(ProjectSettingsPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch for ProjectSettingsPage", () => {
  it("matches the ProjectSettingsPage mapstostate", () => {
    expect(
      mapStateToProps({
        deleteAppReducer: { isDeleting:false, isDeleted:false, isFailed:false,  message:""},
        updateAppReducer: { isUpdated:false, isUpdating:false, errorMessage: null },
        revertUrlReducer: { isReverted:false, isReverting:false },
        singleAppReducer: { isFetched:false, app:null },
        user: {  }
      })
    ).toEqual({
        isUpdated: false,
        isUpdating: false,
        message: "",
        isDeleting: false,
        isFailed: false,
        isDeleted: false,
        errorMessage: null,
        isReverted: false,
        isReverting: false,
        app: null,
        isFetched: false,
    });
  });
});
