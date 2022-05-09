/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ClustersList, { mapStateToProps } from "./";

const clusterPageProps = {
  getClustersList: jest.fn(),
};

describe("test cluster page", () => {
  const ClusterWrapper = ClustersList.WrappedComponent;
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
        clustersReducer: { clusters: [], isRetrieving: false, isRetrieved: false },
      })
    ).toEqual({
      isRetrieving: false,
      isRetrieved: false,
    });
  });
});
