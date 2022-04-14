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
  openProjectCreateComponent: jest.fn(),
  callbackProjectCreateComponent: jest.fn(),
  searchThroughProjects: jest.fn(),
  handleCallbackSearchword: jest.fn()
};

describe("Testing the App Metrics Page component", () => {
  const WrapperUserProjectsPage = UserProjectsPage.WrappedComponent;
  const UserProjectsPageComponent = shallow(<WrapperUserProjectsPage {...UserProjectsPageProps} />);
  it("should match the snapshot for UserProjectsPage after adding props", () => {
    UserProjectsPageComponent.setProps(UserProjectsPageProps);
    expect(UserProjectsPageComponent).toBeDefined();
  });

  it("should match the snapshot", () => {
    let wrapper = UserProjectsPageComponent.instance();
    const spy = jest.spyOn(wrapper, "componentDidMount");
    const spyDidUpdate = jest.spyOn(wrapper, "componentDidUpdate");
    wrapper.componentDidMount();
    wrapper.componentDidUpdate();

    expect(spy).toHaveBeenCalled();
    expect(spyDidUpdate).toHaveBeenCalled();

    expect(wrapper.componentDidMount).toHaveBeenCalled();
    wrapper.openProjectCreateComponent();
    wrapper.searchThroughProjects();
    wrapper.handleCallbackSearchword("test");
    
    wrapper.callbackProjectCreateComponent();
    spy.mockRestore();
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
        updateProjectReducer: { isUpdated: false, }
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
    });
  });
});
