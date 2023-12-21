import React from "react";
import { render } from "@testing-library/react";

import ContactPage from "./index";

describe(" New password Component", () => {
  const ContactPageComponent = render(<ContactPage />);
  it("component should match the snapshot", () => {
    expect(ContactPageComponent).toMatchSnapshot();
  });
});
