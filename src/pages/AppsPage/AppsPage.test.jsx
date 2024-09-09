import React from "react";
import { shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom"; 
import AppsPage from "./";

describe("testing the Apps page component", () => {
  it("this matches Apps page component snapshot", () => {
    const mycomponent = shallow(
      <MemoryRouter initialEntries={["/your-path"]}> 
        <AppsPage />
      </MemoryRouter>
    );
    expect(mycomponent).toMatchSnapshot();
  });

  it("should match wrapped component snapshot", () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={["/your-path"]}> 
        <AppsPage />
      </MemoryRouter>
    );
    expect(wrapper).toBeDefined();
  });
});
