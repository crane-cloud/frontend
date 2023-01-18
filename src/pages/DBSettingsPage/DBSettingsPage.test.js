/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import DBSettingsPage from "./";

const SettingsPageProps = {
  match: { params: { projectID: "1" } },
  location: { pathname: "path" },
  data: { beta: [] },

};

describe("Testing the Project Settings Page component", () => {
  const WrapperDBSettingsPage = DBSettingsPage;
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


//       })
//     ).toEqual({
//       projects: [],
//       errorMessage: "",
//       password: "",
//       isRetrievingPassword: false,
//       passwordFetched: false,
//     });
//   });
// });
