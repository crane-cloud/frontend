/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import PodsList, { mapStateToProps } from "./";

const PodsListProps = {
  clusters: { log1: 1, log2: 2 },
  match: { params: { projectId: "1" } },
  clearUpdateClusterState: jest.fn(),
  updateCluster: jest.fn(),
  data: { beta: true },
  clearState: jest.fn(),
  getClustersList: jest.fn(),
  getPodsList: jest.fn(),
};
// {} ={}
describe("Testing the App Metrics Page component", () => {
  const WrapperPodsList = PodsList.WrappedComponent;
  const PodsListComponent = shallow(
    <WrapperPodsList {...PodsListProps} />
  );
  it("should match the snapshot for PodsList after adding props", () => {
    PodsListComponent.setProps(PodsListProps);
    expect(PodsListComponent).toBeDefined();
  });
  it("matchs the PodsList component snapshot", () => {
    expect(PodsListComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the pods list mapstostate", () => {
    expect(
      mapStateToProps({
        podsReducer: {
          isRetrieving: false,
          pods: [],
          isFetched: false,
        },
      })
    ).toEqual({ isRetrieving: false, pods: [], isFetched: false });
  });
});
