import React from "react";
import { shallow } from "enzyme";
import UserAccounts from "./";
import * as redux from "react-redux";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    clusterID: "12",
  }),
}));

describe("UserList component", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((cb) => cb()());
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue({ 
      users: { pagination: { pages: 1 }, pods: [] }, 
      isRetrieving: false, 
      isFetched: false 
    });
    // Mock useDispatch hook
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders without crashing", () => {
    const wrapper = shallow(<UserAccounts />);

    expect(wrapper.exists()).toBe(true);
  });
  it("should mock dispatch", function () {
    //arrange
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useDispatchSpy.mockClear();
  });
});
