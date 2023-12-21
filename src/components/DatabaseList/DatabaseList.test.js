/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import DatabaseList, { mapStateToProps } from "./";

const DatabaseListProps = {
  projects: [{ log1: 1, log2: 2 }],
  match: { params: { projectId: "1" } },
  getProjectDatabases: jest.fn(),
};
// {} ={}
describe("Testing the DatabaseList Page component", () => {
  const WrapperDatabaseList = DatabaseList.WrappedComponent;
  const DatabaseListComponent = render(
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
      })
    ).toEqual({
      databases: [],
      projects: [],
      databasesFetched: false,
      isFetchingDatabases: false,
    });
  });
});
