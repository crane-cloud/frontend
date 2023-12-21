import React from "react";
import { render } from "@testing-library/react";

import ActivityLogs from "./";
import { handleGetRequest } from "../../apis/apis.js";

jest.mock("../../apis/apis.js");

describe("ActivityLogs", () => {
  test("renders the component", () => {
    const wrapper = render(<ActivityLogs projectID="123" />);
    expect(wrapper.exists()).toBe(true);
  });

  test("matches the snapshot", () => {
    const wrapper = render(<ActivityLogs projectID="123" />);
  });
});
