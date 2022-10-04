import React from "react";
import { shallow } from "enzyme";
import Dropzone from "./index";

describe("Testing the MiraPage component", () => {
  const dropzoneWrapper = shallow(<Dropzone />);

  it("should match snapshot", () => {
    const onDrop = jest.fn();
    const handleDrop = jest.fn();

    expect(dropzoneWrapper).toMatchSnapshot();
    expect(onDrop).toBeDefined();
    expect(handleDrop).toBeDefined();
  });
});
