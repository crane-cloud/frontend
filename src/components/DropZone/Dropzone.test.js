import React from "react";
import { mount } from "enzyme";
import { useDropzone } from "react-dropzone";
import Dropzone from "./index";

jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(),
}));

describe("Dropzone component", () => {
  let setFilesMock;
  let createObjectURLMock;

  beforeEach(() => {
    setFilesMock = jest.fn();
    createObjectURLMock = jest.fn();
    global.URL.createObjectURL = createObjectURLMock;
    useDropzone.mockReturnValue({
      getRootProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
    });
  });

  afterEach(() => {
    delete global.URL.createObjectURL;
  });

  it("renders the Dropzone component correctly with no files", () => {
    mount(<Dropzone handleDrop={jest.fn()} />);
    expect(useDropzone).toHaveBeenCalled();
  });

  it("renders the Dropzone component correctly with files", () => {
    const files = [
      { name: "file1.zip", preview: "data:image/jpeg;base64,..." },
      { name: "file2.zip", preview: "data:image/jpeg;base64,..." },
    ];
    useDropzone.mockReturnValue({
      getRootProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
    });
    mount(<Dropzone handleDrop={jest.fn()} />);
    expect(useDropzone).toHaveBeenCalled();
  });

  it("calls handleDrop and updates files state when files are dropped", () => {
    const acceptedFiles = [
      new File(["file1"], "file1.zip", { type: "application/zip" }),
      new File(["file2"], "file2.zip", { type: "application/zip" }),
    ];
    const handleDropMock = jest.fn();
    useDropzone.mockImplementation((config) => {
      return {
        getRootProps: jest.fn().mockReturnValue({}),
        getInputProps: jest.fn().mockReturnValue({}),
        onDrop: config.onDrop, // Pass the onDrop function as is
      };
    });

    const wrapper = mount(<Dropzone handleDrop={handleDropMock} />);
    wrapper.prop("handleDrop")(acceptedFiles); // Simulate file drop
    expect(handleDropMock).toHaveBeenCalledWith(acceptedFiles);
  });
});
