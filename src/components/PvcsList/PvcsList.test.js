/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import PvcsListPage, { mapStateToProps } from "./";

const PvcsListPageProps = {
  clusters: { log1: 1, log2: 2 },
  match: { params: { projectId: "1" } },
  getPvcs: jest.fn(),
};
// {} ={}
describe("Testing the PVCs Page component", () => {
  const WrapperPvcsListPage = PvcsListPage.WrappedComponent;
  const PvcsListPageComponent = shallow(
    <WrapperPvcsListPage {...PvcsListPageProps} />
  );
  it("should match the snapshot for PvcsListPage after adding props", () => {
    PvcsListPageComponent.setProps(PvcsListPageProps);
    expect(PvcsListPageComponent).toBeDefined();
  });
  it("matchs the PvcsListPage component snapshot", () => {
    expect(PvcsListPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        pvcsReducer: {
          isFetched: false,
          pvcs: [],
          isRetrieving: false,
        },
      })
    ).toEqual({
      isFetched: false,
      pvcs: [],
      isRetrieving: false,
    });
  });
});
