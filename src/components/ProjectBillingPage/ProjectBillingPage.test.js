import React from "react";
import { useEffect } from 'react';


import { mount, shallow } from "enzyme";
import * as redux from "react-redux";
// import { useParams } from 'react-router-dom'
import ProjectBillingPage from "./";

// jest.mock('React', () => ({
//   ...jest.requireActual('React'),
//   useEffect: jest.fn(),
// }));

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
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

describe("TodoList", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce(cb => cb()());
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
    const wrapper = shallow(<ProjectBillingPage />);

    expect(wrapper.exists()).toBe(true);
  });
  it("should mock dispatch", function () {
    //arrange
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    const mockDispatchFn = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatchFn);
    //action
    // triggerYourFlow();

    //assert
    // expect(mockDispatchFn).toHaveBeenCalledWith(expectedAction);

    //teardown
    useDispatchSpy.mockClear();
  });
});
// describe("ProjectBillingPage", () => {
//   const props = {
//     previous: null,
//     next: "next",
//     paginate: jest.fn(),
//     count: 20,
//   };
//   let wrapper = mount(<ProjectBillingPage {...props} />);

//   it("this should render without a problem", () => {
//     expect(wrapper).toMatchSnapshot();
//   });


