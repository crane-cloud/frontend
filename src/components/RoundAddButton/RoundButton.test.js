import React from "react";

import { render } from "@testing-library/react";

import ShallowRenderer from "react-test-renderer/shallow";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import RoundAddButton from "./index";

// in your test:
// const renderer = new ShallowRenderer();
// renderer.render(<MyComponent />);
// renderer.render(<RoundAddButton className="RoundAddButton" />)
// const result = renderer.getRenderOutput();

// expect(result.type).toBe('button');
// expect(result.props.children).toEqual([
//   <ButtonPlus />
// ]);

describe("Button Component", () => {
  it("Renders a button component", () => {
    const buttonEvent = jest.fn();
    const ButtonComponent = render(
      <RoundAddButton className="RoundAddButton" onClick={buttonEvent} />
    );

    expect(
      ButtonComponent.find(".RoundAddButton").hasClass("RoundAddButton")
    ).toBe(true);

    ButtonComponent.find(".RoundAddButton").simulate("click");
    expect(buttonEvent).toHaveBeenCalled();

    expect(ButtonComponent).toMatchSnapshot();
    expect(ButtonComponent.contains(<ButtonPlus />)).toEqual(true);
  });
});
