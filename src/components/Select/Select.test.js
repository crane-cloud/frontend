import React from "react";
import { render } from "@testing-library/react";

import Select from "./index";

describe("Select Component", () => {
  it("Renders a Select component", () => {
    const selectEvent = jest.fn();
    const options = [
      { id: 1, name: "Option 1" },
      { id: 2, name: "Option 2" },
    ];
    const placeholder = "Select an option";

    const wrapper = render(
      <Select
        onChange={selectEvent}
        options={options}
        required
        placeholder={placeholder}
      />
    );

    // Check if the component renders without errors
    expect(wrapper.exists()).toBe(true);

    // Check the initial state
    // const [showOptions, setShowOptions] = wrapper.find('useState').first().args;
    // const [selected, setValue] = wrapper.find('useState').at(1).args;
    // expect(showOptions).toBe(false);
    // expect(selected).toBe(`${placeholder}`);

    // Check the rendered elements
    expect(wrapper.find(".SelectWrapper")).toHaveLength(1);
    expect(wrapper.find(".SelectElementMain")).toHaveLength(1);
    expect(wrapper.find(".SelectElementValue")).toHaveLength(1);
    expect(wrapper.find(".SelectArrow")).toHaveLength(1);
    expect(wrapper.find(".SelectOptionsWrapper")).toHaveLength(0);

    // Simulate click on SelectElementMain to open the options
    wrapper.find(".SelectElementMain").simulate("click");

    // Check the updated state after clicking on SelectElementMain
    // expect(setShowOptions).toHaveBeenCalledWith(true);
    expect(wrapper.find(".SelectOptionsWrapper")).toHaveLength(1);
    expect(wrapper.find(".SelectOption")).toHaveLength(2); // Assuming two options are passed

    // Simulate click on an option
    wrapper.find(".SelectOption").at(0).simulate("click");

    // Check the selected value and the function call
    //expect(setValue).toHaveBeenCalledWith(options[0].name);
    expect(selectEvent).toHaveBeenCalledWith(options[0]);
  });
});
