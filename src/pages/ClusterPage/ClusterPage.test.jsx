/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import ClusterPage, { mapStateToProps } from "./";

const clusterPageProps = {
  clusters: { metadata: "mak-dev" },
};

describe("test cluster page", () => {
  const ClusterWrapper = ClusterPage.WrappedComponent;
  const tempComponent = render(<ClusterWrapper {...clusterPageProps} />);
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
        addClusterReducer: {
          creatingCluster: false,
          isAdded: false,
          isFailed: false,
          errorOccured: false,
          message: "",
        },
        user: { user: [] },
        clustersReducer: { clusters: { metadata: [] } },
      })
    ).toEqual({
      creatingCluster: false,
      isAdded: false,
      isFailed: false,
      errorOccured: false,
      message: "",
      user: [],
      clusters: { metadata: [] },
    });
  });
});
