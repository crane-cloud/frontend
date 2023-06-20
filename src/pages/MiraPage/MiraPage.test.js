import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import MiraPage from "./index";
import PrimaryButton from "../../components/PrimaryButton";
import Spinner from "../../components/Spinner";

jest.mock("axios"); // Mock axios module

describe("MiraPage component", () => {
  const projectID = "mockProjectID";

  beforeEach(() => {
    axios.post.mockResolvedValue(); // Mock the axios post method
  });

  it("should render the MiraPage component", () => {
    const wrapper = shallow(<MiraPage projectID={projectID} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should trigger deployment on button click", () => {
    const wrapper = shallow(<MiraPage projectID={projectID} />);
    const button = wrapper.find(PrimaryButton);

    // Simulate button click
    button.simulate("click");

    // Check if axios.post is called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/containerize"),
      expect.any(FormData)
    );
  });

  it("should display spinner while loading", () => {
    const wrapper = shallow(<MiraPage projectID={projectID} />);
    wrapper.find(PrimaryButton).simulate("click");
    wrapper.update();

    // Check if the Spinner component is rendered
    expect(wrapper.find(Spinner).exists()).toBe(true);
  });
  it("should match the snapshot", () => {
    const wrapper = shallow(<MiraPage projectID={projectID} />);
    expect(wrapper).toMatchSnapshot();
  });
});
