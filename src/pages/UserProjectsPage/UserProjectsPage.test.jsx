/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import UserProjectsPage, { mapStateToProps } from "./";

const UserProjectsPageProps = {
  data: { id:"1" },
  match: { params: { projectID: "1" } },
  getUserProjects: jest.fn(),
  getClustersList: jest.fn(),
  clearUpdateProjectState: jest.fn(),
  clusters: {},
  getUserCredits: jest.fn(),
};

describe("Testing the App Metrics Page component", () => {
  const WrapperUserProjectsPage = UserProjectsPage.WrappedComponent;
  const UserProjectsPageComponent = shallow(<WrapperUserProjectsPage {...UserProjectsPageProps} />);
  it("should match the snapshot for UserProjectsPage after adding props", () => {
    UserProjectsPageComponent.setProps(UserProjectsPageProps);
    expect(UserProjectsPageComponent).toBeDefined();
  });
  it("matchs the UserProjectsPage component snapshot", () => {
    expect(UserProjectsPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the Appmetricspage mapstostate", () => {
    expect(
      mapStateToProps({
        user:{
          data:[]
        },
        addProjectReducer: { isAdded: false, isAdding: false, message:"" , errorCode: null },
        clustersReducer: { clusters: {} },
        deleteProjectReducer:{ isDeleted: false },
        userProjectsReducer: { isRetrieving: false, projects: [], isFetched: false },
        updateProjectReducer: { isUpdated: false, },
        userCreditsReducer: { credits: {} },
      })
    ).toEqual({
      isAdded: false,
      data:[],
      isRetrieving: false,
      projects: [],
      clusters: {},
      isUpdated: false,
      isFetched: false,
      isAdding: false,
      message: "",
      isDeleted: false,
      errorCode: null,
      credits: {},
    });
  });
});
