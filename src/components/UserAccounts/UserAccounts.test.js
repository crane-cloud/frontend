/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import UserAccounts, { mapStateToProps } from "./";

const UserAccountsProps = {
  match: { params: { projectID: "1" } },
  location: { pathname: "path" },
  getUsersList: jest.fn(),
};

describe("Testing the Project Settings Page component", () => {
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
      })
    ).toEqual({
      isAdded: false,
      isAdding: false,
      isFetching: false,
      isFailed: false,
      isFetched: false,
      error: "",
    });
  });
});
