/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ClusterSettingsPage, { mapStateToProps } from "./";

const ClusterSettingsPageProps = {
  clusters: ["log1", "log2"],
  match: { params: { clusterID: "1" } },
  clearUpdateClusterState: jest.fn(),
  updateCluster: jest.fn(),
};
// {} ={}
describe("Testing the App Metrics Page component", () => {
  const WrapperClusterSettingsPage = ClusterSettingsPage.WrappedComponent;
  const ClusterSettingsPageComponent = shallow(
    <WrapperClusterSettingsPage {...ClusterSettingsPageProps} />
  );
  it("should match the snapshot for ClusterSettingsPage after adding props", () => {
    ClusterSettingsPageComponent.setProps(ClusterSettingsPageProps);
    expect(ClusterSettingsPageComponent).toBeDefined();
  });
  it("matchs the ClusterSettingsPage component snapshot", () => {
    expect(ClusterSettingsPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the Appmetricspage mapstostate", () => {
    expect(
      mapStateToProps({
        clustersReducer: {
          clusters: [],
        },
        updateClusterReducer: {
          isUpdating: false,
          errorMessage: "",
          isFailed: false,
          isUpdated: false,
        },
      })
    ).toEqual({
      clusters: [],
      isUpdating: false,
      errorMessage: "",
      isFailed: false,
      isUpdated: false,
    });
  });
});
