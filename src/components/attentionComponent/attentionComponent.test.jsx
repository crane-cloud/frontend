import React from "react";
import { render } from "@testing-library/react";

import AttentionComponent from "./index";

test("renders AttentionComponent correctly", () => {
  const AttentionComponentWrapper = render(<AttentionComponent />);
  expect(
    AttentionComponentWrapper.find(".attentionNotice").hasClass(
      "attentionNotice"
    )
  ).toBe(true);
});
