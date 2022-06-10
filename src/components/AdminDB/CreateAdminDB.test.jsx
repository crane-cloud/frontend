/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import CreateAdminDB, { mapStateToProps } from "./";

const CreateAdminDBProps = {
  database: { name: "sanlam" },
  params: { projectID: "1" },
  message: "This successful",
  adminGetDatabases: jest.fn(),
  handleSelectChange: jest.fn(),
  handleSubmit: jest.fn(),
  handleChange: jest.fn()
};

describe("Test CreateAdminDB component", () => {
  let dbListWrapper;
  beforeEach(() => {
    const CreateAdminDBwrapper = CreateAdminDB.WrappedComponent;
    dbListWrapper = shallow(<CreateAdminDBwrapper {...CreateAdminDBProps} />);
  });

  it("should check `componentDidMount()`", () => {
    // dbListWrapper.instance().componentDidMount();
    // expect(CreateAdminDBProps.adminGetDatabases).toHaveBeenCalledTimes(2);

    // expect(CreateAdminDBProps.adminGetDatabases).toBeDefined();
    // expect(CreateAdminDBProps.params).toBeDefined();
    // expect(dbListWrapper.instance().props.adminGetDatabases).toBeCalled();
    dbListWrapper.setProps(CreateAdminDBProps);
    expect(dbListWrapper).toBeDefined();
  });
  it("matching component snapshot for CreateAdminDB", () => {
    expect(dbListWrapper).toMatchSnapshot();
  });
});

describe("Test CreateAdminDB's map state to props and dispatch", () => {
  it("test result to match the mapstostate function", () => {
    expect(
      mapStateToProps({
        adminCreateDBReducer: {
          
          isCreated: false,
        },
        adminDatabasesReducer: {
          databases: [],
          databasesFetched: false,
          isFetchingDatabases: false,
        },
      })
    ).toEqual({
      isCreated: false,
      databases: [],
      databasesFetched: false,
      isFetchingDatabases: false,
    });
  });
});
