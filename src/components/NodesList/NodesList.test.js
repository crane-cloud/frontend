/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import NodesList, { mapStateToProps } from "./";

const NodesListProps = {
  clusters: { log1: 1, log2: 2 },
  match: { params: { projectId: "1" } },
  clearUpdateClusterState: jest.fn(),
  updateCluster: jest.fn(),
  data: { beta: true },
  clearState: jest.fn(),
  getClustersList: jest.fn(),
  getNodesList: jest.fn(),
};
// {} ={}
describe("Testing the App Metrics Page component", () => {
  const WrapperNodesList = NodesList.WrappedComponent;
  const NodesListComponent = render(<WrapperNodesList {...NodesListProps} />);
  it("should match the snapshot for NodesList after adding props", () => {
    NodesListComponent.setProps(NodesListProps);
    expect(NodesListComponent).toBeDefined();
  });
  it("matchs the NodesList component snapshot", () => {
    expect(NodesListComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the Appmetricspage mapstostate", () => {
    expect(
      mapStateToProps({
        nodesReducer: {
          isRetrieving: false,
          nodes: [],
          isFetched: false,
        },
      })
    ).toEqual({ isRetrieving: false, nodes: [], isFetched: false });
  });
});
