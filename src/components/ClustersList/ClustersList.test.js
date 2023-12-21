/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import ClustersList, { mapStateToProps } from "./";

const ClustersListProps = {
  app: { name: "sanlam" },
  params: { projectID: "1" },
  message: "This successful",
  getClustersList: jest.fn(),
};

describe("Test ClustersList component", () => {
  let clusterlistWrapper;
  beforeEach(() => {
    const ClustersListwrapper = ClustersList.WrappedComponent;
    clusterlistWrapper = render(<ClustersListwrapper {...ClustersListProps} />);
  });

  it("should check `componentDidMount()`", () => {
    clusterlistWrapper.instance().componentDidMount();
    expect(ClustersListProps.getClustersList).toHaveBeenCalledTimes(2);

    expect(ClustersListProps.getClustersList).toBeDefined();
    expect(ClustersListProps.params).toBeDefined();
    expect(clusterlistWrapper.instance().props.getClustersList).toBeCalled();
  });
  it("matching component snapshot for ClustersList", () => {
    expect(clusterlistWrapper).toMatchSnapshot();
  });
});

describe("Test ClustersList's map state to props and dispatch", () => {
  it("test result to match the mapstostate function", () => {
    expect(
      mapStateToProps({
        clustersReducer: {
          isRetrieving: false,
          isRetrieved: false,
          clusters: { clusters: [] },
        },
      })
    ).toEqual({
      isRetrieving: false,
      isRetrieved: false,
      clusters: [],
    });
  });
});
