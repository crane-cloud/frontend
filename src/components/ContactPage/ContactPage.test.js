import React from "react";
import { shallow } from "enzyme";

import ContactPage, { mapStateToProps } from "./index";

const Props = {
  user: {
    data: {
      name: "John Doe",
      id: "123",
    },
  },
};

describe(" New password Component", () => {
  const Wrapper = ContactPage.WrappedComponent;
  const ContactPageComponent = shallow(<Wrapper {...Props} />);
  // const ContactPageComponent = shallow(<ContactPage/>);
  ContactPageComponent.setProps(Props);

  it("component should match the snapshot", () => {
    expect(ContactPageComponent).toMatchSnapshot();
  });
  
});

describe("Testing the exported mapstate to props for contact", () => {
  it("matches the contact mapstostate", () => {
    expect(
      mapStateToProps({
        user: {
          user: {},
        }
      })
    ).toEqual({
      user: {
        user: {},
      },
    });
  });
});