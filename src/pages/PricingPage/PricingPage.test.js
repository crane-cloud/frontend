import React from "react";
import { render } from "@testing-library/react";

import PricingPage, { mapStateToProps } from "./index";

const Props = {
  user: {
    data: {
      name: "John Doe",
      id: "123",
    },
  },
};

describe(" New password Component", () => {
  const Wrapper = PricingPage.WrappedComponent;
  const PricingPageComponent = render(<Wrapper {...Props} />);
  // const PricingPageComponent = render(<PricingPage/>);
  PricingPageComponent.setProps(Props);

  it("component should match the snapshot", () => {
    expect(PricingPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props for pricing", () => {
  it("matches the pricing mapstostate", () => {
    expect(
      mapStateToProps({
        user: {
          user: {},
        },
      })
    ).toEqual({
      user: {
        user: {},
      },
    });
  });
});
