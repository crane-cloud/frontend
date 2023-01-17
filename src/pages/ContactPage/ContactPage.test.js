import React from "react";
import { shallow } from "enzyme";

import ContactPage from "./index";

describe(" New password Component", () => {
  const ContactPageComponent = shallow(<ContactPage />);

  it("component should match the snapshot", () => {
    expect(ContactPageComponent).toMatchSnapshot();
  });
  
});
