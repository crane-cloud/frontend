import React from "react";
import { render } from "@testing-library/react";

import DeletWarning from ".";

describe("Test the delete warning component", () => {
  const AlignedDeletWarningComponent = render(
    <DeletWarning textAlignment="center" />
  );
  const UnalignedDeletWarningComponent = render(
    <DeletWarning textAlignment={false} />
  );

  it("checks if the delete warning component matches the snapshot", () => {
    expect(AlignedDeletWarningComponent).toMatchSnapshot();
  });
});
