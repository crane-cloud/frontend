/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import PvsListPage, { mapStateToProps } from "./";

const PvsListPageProps = {
  clusters: { log1: 1, log2: 2 },
  match: { params: { projectId: "1" } },
  getPvs: jest.fn(),
};
// {} ={}
describe("Testing the PVs Page component", () => {
  const WrapperPvsListPage = PvsListPage.WrappedComponent;
  const PvsListPageComponent = shallow(
    <WrapperPvsListPage {...PvsListPageProps} />
  );
  it("should match the snapshot for PvsListPage after adding props", () => {
    PvsListPageComponent.setProps(PvsListPageProps);
    expect(PvsListPageComponent).toBeDefined();
  });
  it("matchs the PvsListPage component snapshot", () => {
    expect(PvsListPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        pvsReducer: {
          isFetched: false,
          pvs: [],
          isRetrieving: false,
        },
      })
    ).toEqual({
      isFetched: false,
      pvs: [],
      isRetrieving: false,
    });
  });
});
