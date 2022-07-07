/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import DatabaseList, { mapStateToProps } from "./";

const DatabaseListProps = {
  projects: [{ log1: 1, log2: 2 }],
  match: { params: { projectId: "1" } },
  getProjectDatabases: jest.fn(),
};
// {} ={}
describe("Testing the DatabaseList Page component", () => {
  const WrapperDatabaseList = DatabaseList.WrappedComponent;
  const DatabaseListComponent = shallow(
    <WrapperDatabaseList {...DatabaseListProps} />
  );
  it("should match the snapshot for DatabaseList after adding props", () => {
    DatabaseListComponent.setProps(DatabaseListProps);
    expect(DatabaseListComponent).toBeDefined();
  });
  it("matchs the DatabaseList component snapshot", () => {
    expect(DatabaseListComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        userProjectsReducer: { projects: [] },
        projectDatabasesReducer: {
          databases: [],
          databasesFetched: false,
          isFetchingDatabases: false,
        },
        createDatabaseReducer: { isCreated: false },
      })
    ).toEqual({
      databases: [],
      projects: [],
      databasesFetched: false,
      isFetchingDatabases: false,
      isCreated: false,
    });
  });
});
