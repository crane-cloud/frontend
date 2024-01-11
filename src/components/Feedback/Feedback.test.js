import React from "react";

import { render } from "@testing-library/react";

import Feedback from "./index";

describe("Feedback Component", () => {
  it("Renders a Feedback component", () => {
    const FeedbackComponent = render(
      <Feedback
        className="success"
        type="Succes SuccessOnWhite"
        message="Failed"
      />
    );
    expect(FeedbackComponent).toMatchSnapshot();
  });
});
