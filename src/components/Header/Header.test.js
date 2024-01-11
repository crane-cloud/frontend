import React from "react";
import { render } from "@testing-library/react";

import Header, { mapStateToProps } from "./index";

const HeaderProps = {
  removeUser: jest.fn(),
  user: {
    accessToken: "test",
    data: {},
  },
  match: {
    path: "/",
  },
};

describe("Header component test", () => {
  let headerWrapper;
  let Headerwrapper;

  beforeEach(() => {
    Headerwrapper = Header.WrappedComponent;
    headerWrapper = render(<Headerwrapper {...HeaderProps} />);
  });

  it("matches the Header snapshot", () => {
    expect(headerWrapper).toMatchSnapshot();
  });

  // it("checks the header dropdown arrow toggle functionality", () => {
  //   const OnHeader = headerWrapper.find(".OnHeader");
  //   OnHeader.simulate("click");
  //   expect(headerWrapper.find(".BelowHeader").length).toEqual(1);
  // });

  it("renders the header without dropdown content when user is not logged in or on the login page", () => {
    headerWrapper.setProps({
      token: null,
      pageUrl: "/login",
      credits: 0,
      user: {
        data: {},
      },
      match: {
        path: "/login",
      },
    });

    expect(headerWrapper.find(".Credits").exists()).toEqual(false);
    expect(headerWrapper.find(".UserNames").exists()).toEqual(false);
    expect(headerWrapper.find(".BelowHeader").exists()).toEqual(false);
  });

  it("renders the dropdown content when the dropdown is invisible", () => {
    expect(headerWrapper.find(".BelowHeader").exists()).toEqual(false);
    expect(headerWrapper.find(".UserInformation").exists()).toEqual(false);
    expect(headerWrapper.find(".DropDownContent").exists()).toEqual(false);
  });

  it("maps the state to props correctly", () => {
    const mockState = {
      user: {
        accessToken: "testToken",
        data: {
          name: "John Doe",
          email: "johndoe@example.com",
        },
      },
    };
    const mappedProps = mapStateToProps(mockState);
    expect(mappedProps.user).toEqual(mockState.user);
  });
});

describe("Test the header map state to props", () => {
  it("checks the map state to props function", () => {
    expect(
      mapStateToProps({
        user: {},
      })
    ).toEqual({
      user: {},
    });
  });
});
