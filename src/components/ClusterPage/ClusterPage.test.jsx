/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ClusterPage, { mapStateToProps } from "./";

const clusterPageProps = {
  info: { cluster: "mak-dev" },
};

describe("test cluster page", () => {
  const ClusterWrapper = ClusterPage.WrappedComponent;
  const tempComponent = shallow(<ClusterWrapper {...clusterPageProps} />);
  it("match the component snapshot for cluster page", () => {
    expect(tempComponent).toMatchSnapshot();
  });
  it("Should match the component for props snapshot", () => {
    tempComponent.setProps(clusterPageProps);
    expect(tempComponent).toBeDefined();
  });
});

describe("A test for the component map state to props", () => {
  it("map state to props test", () => {
    expect(
      mapStateToProps({
        databasesReducer: {
          isFetchingDatabases: false,
          databasesFetched: false,
          databases: [],
        },
        addClusterReducer: {
          creatingCluster: false,
          isAdded: false,
          isFailed: false,
          errorOccured: false,
          message: "",
        },
        user: { user: [] },
        appsSummaryReducer: {
          summary: [],
          FetchedAppsSummary: false,
          isFetchingAppsSummary: false,
        },
        usersSummaryReducer: {
          usersSummary: [],
          FetchedUsersSummary: false,
          isFetchingUsersSummary: false,
        },
        clustersReducer: { clusters: [] },
      })
    ).toEqual({
      isFetchingDatabases: false,
      databasesFetched: false,
      databases: [],
      creatingCluster: false,
      isAdded: false,
      isFailed: false,
      errorOccured: false,
      message: "",
      user: [],
      summary: [],
      FetchedAppsSummary: false,
      isFetchingAppsSummary: false,
      usersSummary: [],
      FetchedUsersSummary: false,
      isFetchingUsersSummary: false,
      clusters: [],
    });
  });
});
