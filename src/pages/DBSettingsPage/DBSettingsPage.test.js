/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import DBSettingsPage, { mapStateToProps } from "./";

const SettingsPageProps = {
  match: { params: { projectID: "1" } },
  location: { pathname: "path" },
  data: { beta: [] },

};

describe("Testing the Project Settings Page component", () => {
  const WrapperDBSettingsPage = DBSettingsPage.WrappedComponent;
  const DBSettingsPageComponent = shallow(
    <WrapperDBSettingsPage {...SettingsPageProps} />
  );

  it("should match the snapshot for DBSettingsPage after adding props", () => {
    DBSettingsPageComponent.setProps(DBSettingsPage);
    expect(DBSettingsPageComponent).toBeDefined();
  });
  it("matchs the DBSettingsPage component snapshot", () => {
    expect(DBSettingsPageComponent).toMatchSnapshot();
  });
});

// describe("Testing the exported mapstate to props and dispatch for DBSettingsPage", () => {
//   it("matches the DBSettingsPage mapstostate", () => {
//     expect(
//       mapStateToProps({
//         userProjectsReducer: {
//           projects: [],
//         },
//         singleDBReducer: {
//           database: {},
//           isRetrieving: false,
//           isFetched: false,
//         },
//         deleteDatabaseReducer: {
//           databaseDeleted: false,
//           deletingDatabase: false,
//           databaseDeleteFailed: false,
//           dbDeleteMessage: "",
//         },
//         resetDatabaseReducer: {
//           isReset: false,
//           isReseting: false,
//           resetFailed: false,
//           resetMessage: "",
//         },
//         updateDatabasePasswordReducer: {
//           updatingDBPassword: false,
//           updateDBPasswordFailed: false,
//           dbPasswordUpdated: false,
//           errorMessage: "",
//         },
//         passwordReducer: {
//           password: "",
//           isRetrievingPassword: false,
//           passwordFetched: false,
//         },
//       })
//     ).toEqual({
//       projects: [],
//       database: {},
//       isRetrieving: false,
//       isFetched: false,
//       databaseDeleted: false,
//       deletingDatabase: false,
//       databaseDeleteFailed: false,
//       dbDeleteMessage: "",
//       isReset: false,
//       isReseting: false,
//       resetFailed: false,
//       resetMessage: "",
//       updatingDBPassword: false,
//       updateDBPasswordFailed: false,
//       dbPasswordUpdated: false,
//       errorMessage: "",
//       password: "",
//       isRetrievingPassword: false,
//       passwordFetched: false,
//     });
//   });
// });
