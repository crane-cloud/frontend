import React from "react";
import { shallow } from "enzyme";
import InformationBar from ".";

describe("Test the information bar component", () => {
  const searchAction = jest.fn();
  const btnAction = jest.fn();

  const defaultProps = {
    header: "test",
    status: undefined,
    showBtn: false,
    btnAction: btnAction,
    viewAppLink: undefined,
    showSearchBar: false,
    placeholder: undefined,
    searchAction: searchAction,
  };
  const appStatusProps = {
    ...defaultProps,
    status: "success",
  };
  const searchBarProps = {
    ...defaultProps,
    showSearchBar: true,
    placeholder: "test",
  };
  const addBtnProps = { ...defaultProps, showBtn: true };
  const addAppLinkProps = { ...defaultProps, viewAppLink: "test_url" };

  const InformationBarDefault = shallow(<InformationBar {...defaultProps} />);
  const InformationBarSearch = shallow(<InformationBar {...searchBarProps} />);
  const InformationBarAppLink = shallow(
    <InformationBar {...addAppLinkProps} />
  );
  const InformationBarStatus = shallow(<InformationBar {...appStatusProps} />);
  const InformationBarAddBtn = shallow(<InformationBar {...addBtnProps} />);

  it("checks if the information bar component matches the snapshot", () => {
    expect(InformationBarDefault).toMatchSnapshot();
  });

  it("checks if search in information bar is funtional", () => {
    const SearchInput = InformationBarSearch.find(
      ".DesktopView .SearchInput input"
    );
    SearchInput.simulate("change", {
      target: { name: "Searchword", value: "sample search" },
    });
    expect(searchAction).toBeCalled();
  });
});
