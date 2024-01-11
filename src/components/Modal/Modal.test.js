import React from "react";

import { render } from "@testing-library/react";

import Modal from ".";
import { bool } from "prop-types";

describe("Test the Model component", () => {
  const onClickAway = jest.fn();
  const showModal = false;
  const children = <div>Model</div>;
  it("checking for proper rendering", () => {
    const ModalComponent = render(
      <Modal
        onClickAway={onClickAway}
        children={children}
        showModal={showModal}
      />
    );
    expect(ModalComponent).toMatchSnapshot();
  });
});
