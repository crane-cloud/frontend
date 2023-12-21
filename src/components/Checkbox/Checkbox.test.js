import React from "react";
import { render } from "@testing-library/react";

import Checkbox from ".";
import { ReactComponent as WhiteCheckmark } from "../../assets/images/white-check-mark.svg";
import { ReactComponent as BlackCheckmark } from "../../assets/images/black-check-mark.svg";

describe("Checkbox input test", () => {
  const onClick = jest.fn();
  const CheckboxComponentFalse = render(
    <Checkbox isChecked={false} isBlack={false} onClick={onClick} />
  );
  const CheckboxComponentTrue = render(
    <Checkbox isChecked={true} isBlack={true} onClick={onClick} />
  );
  it("checks if checkbox matches the snapshot", () => {
    expect(CheckboxComponentFalse).toMatchSnapshot();
  });
});
