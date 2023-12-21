import React from "react";
import { render } from "@testing-library/react";

import Privacy from "./privacy";
import Terms from "./terms";

describe("Test the privacy document", () => {
  it("checks if the privacy document matches the snapshot", () => {
    const PrivacyDoc = render(<Privacy />);
    expect(PrivacyDoc).toMatchSnapshot();
  });
});

describe("Test the terms document", () => {
  it("checks if the terms document matches the snapshot", () => {
    const TermsDoc = render(<Terms />);
    expect(TermsDoc).toMatchSnapshot();
  });
});
