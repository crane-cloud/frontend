import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import Header, { mapStateToProps } from ".";

const HeaderProps = {
  removeUser: jest.fn(),
  user: {
    accessToken: "test",
    data: {},
  },
  match: {
    path: "/",
  },
  userCredits: {
    credit_assignment_records: [
      {
        amount: 0,
      },
    ],
  },
};

describe("dispatch mock", function () {
  let useDispatchSpy;
  let useSelectorSpy;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb()());
    useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue(HeaderProps.userCredits);
    useDispatchSpy = jest.spyOn(redux, "useDispatch");
    mockDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should mock dispatch", function () {
    const Wrapper = Header.WrappedComponent
    const WrappedHeader =shallow(<Wrapper />);

    expect(WrappedHeader.exists()).toBe(true);
  });
});

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
