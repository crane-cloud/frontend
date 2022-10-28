/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ProjectSettingsPage, { mapStateToProps } from "./";

const ProjectSettingsPageProps = {
  match: { params: { projectID: "1" } },
  projectMembers: { project_users: [] },
  location: { pathname: "path" },
  data: [],
  deleteProject: jest.fn(),
  updateProject: jest.fn(),
  getProjectMembers: jest.fn(),
  clearInvitingMembersState: jest.fn(),
  clearDeleteProjectState: jest.fn(),
  clearUpdateProjectState: jest.fn(),
};

describe("Testing the Project Settings Page component", () => {
  const WrapperProjectSettingsPage = ProjectSettingsPage.WrappedComponent;
  const ProjectSettingsPageComponent = shallow(
    <WrapperProjectSettingsPage {...ProjectSettingsPageProps} />
  );

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
        deleteProjectReducer: {
          isDeleting: false,
          isDeleted: false,
          isFailed: false,
          message: "",
        },
        updateProjectReducer: {
          isUpdated: false,
          isUpdating: false,
          errorMessage: null,
        },
        projectMembersReducer: { projectMembers: { project_users: [] } },
        inviteMembersReducer: {
          invitation: null,
          isSending: false,
          isSent: false,
        },
        removeMemberReducer: {
          member: null,
          isRemoving: false,
          isRemoved: false,
        },
        updateMemberRoleReducer: {
          isRoleUpdated: false,
          isRoleUpdating: false,
          updateMessage: "",
          isRoleUpdateFailed: false,
        },
        user: { data: [] },
      })
    ).toEqual({
      isUpdated: false,
      isUpdating: false,
      message: "",
      isDeleting: false,
      isFailed: false,
      isDeleted: false,
      errorMessage: null,
      projectMembers: { project_users: [] },
      invitation: null,
      isSending: false,
      isSent: false,
      member: null,
      isRemoving: false,
      isRoleUpdated: false,
      isRoleUpdating: false,
      isRoleUpdateFailed: false,
      isRemoved: false,
      updateMessage: "",
      clearDeleteProjectState: undefined,
      data: [],
    });
  });
});
