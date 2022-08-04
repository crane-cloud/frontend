import React from "react";
import { shallow } from "enzyme";
import UserProfile, { mapStateToProps } from "./";

const UserProfileProps = {
  data: { id:"vnb" },
  user: { name:"jack" },
  updateProfile: jest.fn(),
  clearUpdateProfileState: jest.fn(),
  getUserDetail: jest.fn(),
};

describe("Testing the  user Profile Page component", () => {
  const WrapperUserProfile = UserProfile.WrappedComponent;
  const UserProfileComponent = shallow(<WrapperUserProfile {...UserProfileProps} />);
  it("should match the snapshot for UserProfile after adding props", () => {
    UserProfileComponent.setProps(UserProfileProps);
    expect(UserProfileComponent).toBeDefined();
  }); 
  it("matchs the UserProfile component snapshot", () => {
    expect(UserProfileComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch user's profle" , () => {
  it("matches the Appmetricspage maps to state", () => {
    expect(
      mapStateToProps({
        user:{
          data:[]
        },
        userDetailReducer: { isFetching:false , user:{}, isFetched:false,message:" " },
        updateProfileReducer: { profileUpdating: false, errorMessage: "", profileUpdated: false, profileUpdateFailed: false },
      })
    ).toEqual({
        isFetching:false , user:{}, isFetched:false,message:" ",
        data:[],
        profileUpdating: false, errorMessage: "", profileUpdated: false, profileUpdateFailed: false
    });
  });
});
