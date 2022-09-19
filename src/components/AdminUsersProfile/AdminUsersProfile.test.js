import React from "react";
import { shallow } from "enzyme";
import AdminUserPage, { mapStateToProps } from "./";

const AdminUserPageProps = {
  data: { id: "vnb" },
  user: { name: "jack" },
  updateProfile: jest.fn(),
  clearUpdateProfileState: jest.fn(),
  getUserDetail: jest.fn(),
  clearCreditsState: jest.fn(),
  clearUserCredits: jest.fn(),
  match: {params:{}},
  userCredits: { credit_assignment_records: []},
  adminGetUserCredits: jest.fn()
};

describe("Testing the  user Profile Page component", () => {
  const WrapperAdminUserPage = AdminUserPage.WrappedComponent;
  const AdminUserPageComponent = shallow(
    <WrapperAdminUserPage {...AdminUserPageProps} />
  );
  it("should match the snapshot for AdminUserPage after adding props", () => {
    AdminUserPageComponent.setProps(AdminUserPageProps);
    expect(AdminUserPageComponent).toBeDefined();
  });
  it("matchs the AdminUserPage component snapshot", () => {
    expect(AdminUserPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch user's profle", () => {
  it("matches the Appmetricspage maps to state", () => {
    expect(
      mapStateToProps({
        usersListReducer: { isFetching: false, users: [], isFetched: false },
        addBetaUserReducer: {
          isAdded: false,
          isAdding: false,
          isFailed: false,
          error: "",
        },
        addUserCreditsReducer: { Added: false, Adding: false, Failed: false },
        adminGetUserCreditsReducer: {
          userCredits: [],
          creditsFetched: false,
          isFetchingCredits: false,
        },
      })
    ).toEqual({
      isFetching: false,
      users: [],
      isFetched: false,
      isAdded: false,
      isAdding: false,
      isFailed: false,
      error: "",
      Added: false,
      Adding: false,
      Failed: false,
      userCredits: [],
      creditsFetched: false,
      isFetchingCredits: false,
    });
  });
});
