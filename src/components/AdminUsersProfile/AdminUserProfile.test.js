/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AdminUserPage,{ mapStateToProps } from "./";

const AdminUserPageProps = {
  handleClick: jest.fn(),
  hideModal: jest.fn(),
  showMenu: jest.fn(),
  showBetaUserModal: jest.fn(),
  handleCreditSubmittion: jest.fn(),
  showCreditsModal: jest.fn(),
  hideCreditsModal: jest.fn(),
  closeBetaUserModal: jest.fn(),
  handleChange: jest.fn(),
  handleBetaUserSubmit: jest.fn(),
  renderRedirect: jest.fn(),
  match: {params:{userID:"12"}}
};


describe('TestContainer for admin profile', () => {
  it('Test class constructor', () => {
    const wrappedAdminUserPage = AdminUserPage.WrappedComponent;
    const wrapper = shallow(<wrappedAdminUserPage />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper).toHaveLength(1);
  });
});
describe("test the profile component", () => {
  it("matchs the component snapshot", () => {
    const wrapper = AdminUserPage.WrappedComponent;
    const mycomponent = shallow(<wrapper {...AdminUserPageProps} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("", () => {
    const newComponent = AdminUserPage.WrappedComponent;
    const wrapper = shallow(<newComponent {...AdminUserPageProps} />);
    wrapper.setProps(AdminUserPageProps);
    expect(wrapper).toBeDefined();
    expect(wrapper).toHaveLength(1);
  });

});

describe("test the map state to props and dispatch for user profile", () => {
  it("matches the mapstostate", () => {
    expect(
      mapStateToProps({
        usersListReducer: { isFetching:false, users:[], isFetched:false },
        addBetaUserReducer: {isAdded:false, isAdding:false, isFailed:false, error:"" },
        addUserCreditsReducer: { Added:false, Adding:false, Failed:false},
        adminGetUserCreditsReducer: { userCredits:[], 
            creditsFetched:false,
            isFetchingCredits:false }, 
      })
    ).toEqual({ 
        isFetching:false,
        users:[],
        isFetched:false,
        isAdded:false,
        isAdding:false,
        isFailed:false,
        error:"",
        Added:false,
        Adding:false,
        Failed:false,
        userCredits:[],
        creditsFetched:false,
        isFetchingCredits:false,
     });
  });
});
