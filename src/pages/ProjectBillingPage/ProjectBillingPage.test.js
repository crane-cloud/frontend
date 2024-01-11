import React from "react";
import { render } from "@testing-library/react";

import * as redux from "react-redux";
import ProjectBillingPage from "./";

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
    id: 2,
  }),
}));

describe("Billing page", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((cb) => cb()());
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue({ credit_assignment_records: [], id: 2 });

    // Mock useDispatch hook
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // Mock dispatch function returned from useDispatch
    const mockDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render", () => {
    const Wrapper = render(<ProjectBillingPage />);

    // expect(Wrapper.exists()).toBe(true);
    expect(Wrapper).toMatchSnapshot();
  });
  it("should mock dispatch", function () {
    //arrange
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    useDispatchSpy.mockClear();
  });
});
