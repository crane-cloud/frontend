import React from "react";

import { shallow } from "enzyme";

import NewHeader, { mapStateToProps } from "./";

const NewHeaderProps = {
  removeUser: jest.fn(),
  user: {
    accessToken: "test",
    data: {},
  },
  match: {
    path: "/",
  },
};

describe("NewHeader component test", () => {
  let newheaderWrapper;

  beforeEach(() => {
    const NewHeaderwrapper = NewHeader.WrappedComponent;
    newheaderWrapper = shallow(<NewHeaderwrapper {...NewHeaderProps} />);
  });

  it("matches the NewHeader snapshot", () => {
    expect(newheaderWrapper).toMatchSnapshot();
  });

  it("checks the header dropdown arrow toggle functionality", () => {
    // Initial arrow is the down arrow
    const DownArrowWrapper = newheaderWrapper.find(".Headerarrow").childAt(0);
    DownArrowWrapper.simulate("click");
    // Arrow changes to up arrow after click
    expect(newheaderWrapper.find(".Headerarrow").childAt(0)).not.toEqual(
      DownArrowWrapper
    );
  });

  it("checks the header dropdown menu hidden toggle functionality", () => {
    // simulate click - menu only appears when arrow has been clicked
    newheaderWrapper.find(".Headerarrow").childAt(0).simulate("click");
    // Has two divs with .HeaderDropdown, the nested one is the required 
    const HeaderDropdown = newheaderWrapper.find(".HeaderDropdown").at(1);
    HeaderDropdown.simulate("click");
    expect(HeaderDropdown.prop("onClick")).toBeDefined();
  });
});

describe("Test the new header map state to props", () => {
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
