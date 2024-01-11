import React from "react";
import { render } from "@testing-library/react";

import MiraPge from "./index";
import Dropzone from "../DropZone";
import Select from "../Select";
import BlackInputText from "../BlackInputText";
import PrimaryButton from "../PrimaryButton";
import Tooltip from "../Tooltip";
// import { retrieveFrameworkChoices } from "../../helpers/frameworkChoices";
// import { retrieveRegistryChoices } from "../../helpers/registryChoices";

jest.mock("../../helpers/frameworkChoices", () => ({
  retrieveFrameworkChoices: jest
    .fn()
    .mockReturnValue(["Framework1", "Framework2"]),
}));

jest.mock("../../helpers/registryChoices", () => ({
  retrieveRegistryChoices: jest
    .fn()
    .mockReturnValue(["Registry1", "Registry2"]),
}));

describe("MiraPge component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<MiraPge />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {});

  it("displays framework select component", () => {
    const frameworkSelect = wrapper.find(Select).at(0);
    expect(frameworkSelect.prop("placeholder")).toEqual("Choose a framework");
    //expect(frameworkSelect.prop("options")).toEqual(["Framework1", "Framework2"]);
  });

  it("displays registry select component", () => {
    const registrySelect = wrapper.find(Select).at(1);
    expect(registrySelect.prop("placeholder")).toEqual("Select a registry");
    //expect(registrySelect.prop("options")).toEqual(["Registry1", "Registry2"]);
  });

  it("displays black input text components with tooltips", () => {
    const inputTextComponents = wrapper.find(BlackInputText);
    expect(inputTextComponents).toHaveLength(2);

    const imageNameInput = inputTextComponents.at(0);
    expect(imageNameInput.prop("required")).toBe(true);
    expect(imageNameInput.prop("placeholder")).toEqual("Image Name");

    const versionInput = inputTextComponents.at(1);
    expect(versionInput.prop("placeholder")).toEqual("Version");

    const tooltips = wrapper.find(Tooltip);
    expect(tooltips).toHaveLength(3);
    expect(tooltips.at(0).prop("message")).toEqual(
      "This is the image repository for your image"
    );
    expect(tooltips.at(1).prop("message")).toEqual(
      "This is preferably a tag for your image"
    );
  });

  it("displays dropzone component", () => {
    const dropzone = wrapper.find(Dropzone);
    expect(dropzone).toHaveLength(1);
  });

  it("displays primary button component", () => {
    const primaryButton = wrapper.find(PrimaryButton);
    expect(primaryButton.prop("label")).toEqual("Deploy");
    expect(primaryButton.prop("className")).toEqual("AuthBtn FullWidth");
  });
});
