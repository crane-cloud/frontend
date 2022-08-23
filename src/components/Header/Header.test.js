import React from "react";

import { shallow } from "enzyme";

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

  beforeEach(() => {
    const Headerwrapper = Header.WrappedComponent;
    headerWrapper = shallow(<Headerwrapper {...HeaderProps} />);
  });

  it("matches the Header snapshot", () => {
    expect(headerWrapper).toMatchSnapshot();
  });

  it("checks the header dropdown arrow toggle functionality", () => {
    const OnHeader = headerWrapper.find(".OnHeader");
    OnHeader.simulate("click");
    expect(headerWrapper.find(".BelowHeader").length).toEqual(1);
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
