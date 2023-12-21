import React from "react";

import { render } from "@testing-library/react";

import * as redux from "react-redux";
import FlutterWaveHook from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    projectID: "12",
  }),
}));

describe("'FlutterWaveHook Component'", () => {
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  beforeEach(() => {
    jest.spyOn(React, "useEffect").mockImplementationOnce((cb) => cb()());
    // Mock useDispatch hook
    const useDispatchSpy = jest.spyOn(redux, "useDispatch");
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    useDispatchSpy.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("Renders a FlutterWaveHook component", () => {
    const FlutterWaveHookComponent = render(
      <FlutterWaveHook amount="9000" name="CC" message="cc@gmail.com" />
    );
    expect(FlutterWaveHookComponent).toMatchSnapshot();
  });
});
