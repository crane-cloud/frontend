import React from "react";
import { render } from "@testing-library/react";

import ConnectionComponent from ".";

describe("Connection component test", () => {
  const handleClose = jest.fn();
  const ConnComponentFalse = render(
    <ConnectionComponent handleClose={handleClose} show={false} />
  );
  const ConnComponentTrue = render(
    <ConnectionComponent handleClose={handleClose} show={true} />
  );
  it("checks if the connection component matches the snapshot", () => {
    expect(ConnComponentFalse).toMatchSnapshot();
  });
});
