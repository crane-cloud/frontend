import React from "react";
import { shallow } from "enzyme";
import Header from "./index";



const HeaderProps = {
  match: {
    path: "/",
  },
};

describe("Header component test", () => {
  let headerWrapper;

  beforeEach(() => {

    headerWrapper = shallow(
        <Header {...HeaderProps} />
    );
  });

  it("matches the Header snapshot", () => {
    expect(headerWrapper).toMatchSnapshot();
  });

  it("renders the header without dropdown content when user is not logged in or on the login page", () => {
    headerWrapper.setProps({
      match: {
        path: "/login",
      },
    });
  
    expect(headerWrapper.find(".UserNames").exists()).toEqual(false);
    expect(headerWrapper.find(".BelowHeader").exists()).toEqual(false);
  });

  it("renders the dropdown content when the dropdown is invisible", () => {
    expect(headerWrapper.find(".BelowHeader").exists()).toEqual(false);
    expect(headerWrapper.find(".UserInformation").exists()).toEqual(false);
    expect(headerWrapper.find(".DropDownContent").exists()).toEqual(false);
  });

});
