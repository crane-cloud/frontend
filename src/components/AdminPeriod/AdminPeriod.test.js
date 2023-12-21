import React from "react";
import { render } from "@testing-library/react";

import AdminPeriod from "./";

describe("Test the admin period component", () => {
  const onChange = jest.fn();
  const AdminPeriodComponent = render(<AdminPeriod onChange={onChange} />);
  it("checks if the admin period component matches the snapshot", () => {
    expect(AdminPeriodComponent).toMatchSnapshot();
  });
});
