import React from "react";
import { render } from "@testing-library/react";

// import toJson from 'enzyme-to-json';
import App from "./index";

describe("App Component", () => {
  it("should match the snapshot", () => {
    const component = render(<App />);
    expect(component).toMatchSnapshot();
  });
});
