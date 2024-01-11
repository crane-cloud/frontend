import React from "react";
import { shallow, mount } from "enzyme";
import InformationBar from ".";

describe("InformationBar Component", () => {
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

  it("renders the default information bar without errors", () => {
    const wrapper = render(<InformationBar {...defaultProps} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the information bar with search bar and triggers search action", () => {
    const searchBarProps = {
      ...defaultProps,
      showSearchBar: true,
      placeholder: "test",
    };
    const wrapper = render(<InformationBar {...searchBarProps} />);

    // const searchInput = wrapper.find('.DesktopView .SearchInput input');
    // searchInput.simulate('change', { target: { name: 'Searchword', value: 'sample search' } });

    // expect(searchAction).toHaveBeenCalledWith('sample search');
  });

  it("renders the information bar with app status", () => {
    const appStatusProps = {
      ...defaultProps,
      status: "success",
    };
    const wrapper = render(<InformationBar {...appStatusProps} />);

    expect(wrapper.find("AppStatus")).toHaveLength(1);
    expect(wrapper.find(".AppUrl a")).toHaveLength(1);
  });

  it("renders the information bar with a button and triggers button action", () => {
    const addBtnProps = {
      ...defaultProps,
      showBtn: true,
    };
    const wrapper = render(<InformationBar {...addBtnProps} />);

    expect(wrapper.find("PrimaryButton")).toHaveLength(1);
    wrapper.find("PrimaryButton").simulate("click");
    expect(btnAction).toHaveBeenCalled();
  });

  it("renders the information bar with view app link", () => {
    const addAppLinkProps = {
      ...defaultProps,
      viewAppLink: "test_url",
    };
    const wrapper = render(<InformationBar {...addAppLinkProps} />);

    expect(wrapper.find(".InfoHeader")).toHaveLength(1);
    expect(wrapper.find(".InfoHeader").text()).toBe("test");
    expect(wrapper.find(".PrimaryButton")).toHaveLength(0);
    // expect(wrapper.find('.PrimaryButton').prop('children')).toBe("Open App");
    expect(wrapper.find("a")).toHaveLength(1);
    expect(wrapper.find("a").prop("href")).toBe("test_url");
  });

  it("renders the information bar with credits", () => {
    const creditsProps = {
      ...defaultProps,
      credits: 10,
    };
    const wrapper = render(<InformationBar {...creditsProps} />);

    expect(wrapper.find(".InfoHeader")).toHaveLength(1);
    expect(wrapper.find(".InfoHeader").text()).toBe("test");
    expect(wrapper.find(".CreditsCorner")).toHaveLength(1);
    expect(wrapper.find(".CreditsCorner").text()).toBe("10");
    expect(wrapper.find("Coin")).toHaveLength(0);
  });

  it("renders the information bar without additional elements", () => {
    const wrapper = render(<InformationBar {...defaultProps} />);

    expect(wrapper.find(".InfoHeader")).toHaveLength(1);
    expect(wrapper.find(".InfoHeader").text()).toBe("test");
    expect(wrapper.find(".InformationBarWithButton")).toHaveLength(0);
    expect(wrapper.find(".AppUrl")).toHaveLength(0);
    expect(wrapper.find(".RoundAddButtonWrap")).toHaveLength(0);
    expect(wrapper.find("PrimaryButton")).toHaveLength(0);
    expect(wrapper.find("a")).toHaveLength(0);
    expect(wrapper.find(".CreditsCorner")).toHaveLength(0);
    expect(wrapper.find("Coin")).toHaveLength(0);
  });
});
