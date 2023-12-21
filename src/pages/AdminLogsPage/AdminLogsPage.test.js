import React from "react";
import { render } from "@testing-library/react";

import AdminLogsPage from "./";

describe("AdminLogsPage", () => {
  it("renders without crashing", () => {
    shallow(<AdminLogsPage />);
  });

  it("matches the snapshot", () => {
    const wrapper = render(<AdminLogsPage />);
  });
});
