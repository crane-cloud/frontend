/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import CreateDatabase, { mapStateToProps } from "./";

const createDBProps = {
  appMemoryMetrics: [{ slug: "slug" }],
};

describe("Test the CreateDatabase component", () => {
  it("wraps the component then creates a snapshot", () => {
    const wrapper = CreateDatabase.WrappedComponent;
    const mycomponent = render(<wrapper {...createDBProps} />);
    expect(mycomponent).toMatchSnapshot();
  });
  it("should match the snapshot of the created component", () => {
    const newComponent = CreateDatabase.WrappedComponent;
    const wrapper = render(<newComponent {...createDBProps} />);
    wrapper.setProps(createDBProps);
    expect(wrapper).toBeDefined();
  });
});

// describe("test the mapstatetoprops and dispatch", () => {
//   it("matches the CreateDatabase mapstostate", () => {
//     expect(
//       mapStateToProps({
//         createDatabaseReducer: {
//           isCreating: false,
//           isCreated: false,
//           clearDatabaseCreateState: false,
//           message: "",
//         },
//       })
//     ).toEqual({
//       isCreating: false,
//       isCreated: false,
//       clearDatabaseCreateState: false,
//       message: "",
//     });
//   });
// });
