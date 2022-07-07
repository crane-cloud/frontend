import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import JobsListPage from "./";

// jest.mock("react", () => {
//   const originReact = jest.requireActual("react");
//   return {
//     ...originReact,
//     useRef: jest.fn(),
//   };
// });
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    clusterID: "12",
  }),
  // useLocation: () => ({
  //   pathname: "localhost:3000/clusters/12/deployments",
  // }),
}));

describe("Jobs page", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((cb) => cb()());
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, "useSelector");
    spyOnUseSelector.mockReturnValue([{ id: 1, cluster: "nginx" }]);

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
    const wrapper = shallow(<JobsListPage />);

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
