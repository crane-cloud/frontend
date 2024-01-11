import React from "react";
import { render } from "@testing-library/react";

import * as redux from "react-redux";
import AdminProjectsPage from "./";

jest.mock("react", () => {
  const originReact = jest.requireActual("react");
  return {
    ...originReact,
    useRef: jest.fn(),
  };
});
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    projectId: "12",
  }),
}));

describe("Admin projects", () => {
  let spyOnUseSelector;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((cb) => cb()());
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue([{ id: 1, app: "nginx" }]);

    // Mock useDispatch hook
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render", () => {
    const wrapper = render(<AdminProjectsPage />);

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
