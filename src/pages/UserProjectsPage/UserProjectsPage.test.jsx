/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import UserProjectsPage, { mapStateToProps } from "./";

const UserProjectsPageProps = {
  data: { id:"1" },
  match: { params: { projectID: "1" } },
  getUserProjects: jest.fn(),
  getClustersList: jest.fn(),
  clusters: {},
  getUserCredits: jest.fn(),
};

describe("Testing the user projects Page component", () => {
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
        clustersReducer: { clusters: {} },
        userProjectsReducer: { isRetrieving: false, projects: [], isFetched: false },
        userCreditsReducer: { credits: {} },
      })
    ).toEqual({
      data:[],
      isRetrieving: false,
      projects: [],
      clusters: {},
      isFetched: false,
      credits: {},
    });
  });
});
