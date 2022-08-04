/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import UserAccounts, { mapStateToProps } from "./";

const UserAccountsProps = {
  match: { params: { projectID: "1" } },
  location: { pathname: "path" },
  getUsersList: jest.fn(),
};

describe("Testing the User Accounts Page component", () => {
  const WrapperUserAccounts = UserAccounts.WrappedComponent;
  const UserAccountsComponent = shallow(
    <WrapperUserAccounts {...UserAccountsProps} />
  );

  it("should match the snapshot for UserAccounts after adding props", () => {
    UserAccountsComponent.setProps(UserAccounts);
    expect(UserAccountsComponent).toBeDefined();
  });
  it("matchs the UserAccounts component snapshot", () => {
    expect(UserAccountsComponent).toMatchSnapshot();
  });
  it("should check the search input field", () => {
    UserAccountsComponent.find("input")
      .props()
      .onChange({
        target: {
          name: "rhod",
          value: "rhodin",
        },
      });
    expect(UserAccountsComponent.state("input")).toBeUndefined();
  });
});

describe("Testing the exported mapstate to props and dispatch for UserAccounts", () => {
  it("matches the UserAccounts mapstostate", () => {
    expect(
      mapStateToProps({
        usersListReducer: { isFetching: false, isFetched: false },
        addBetaUserReducer: {
          isAdded: false,
          isAdding: false,
          isFailed: false,
          error: "",
        },
        addUserCreditsReducer: {
          Added: false,
          Adding: false,
          Failed: false,
        },
      })
    ).toEqual({
      isAdded: false,
      isAdding: false,
      isFetching: false,
      isFailed: false,
      isFetched: false,
      Added: false,
      Adding: false,
      Failed: false,
      error: "",
    });
  });
});
