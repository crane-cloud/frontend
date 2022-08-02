/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import AdminDBList, { mapStateToProps } from "./";

const AdminDBListProps = {
  database: { name: "sanlam" },
  params: { projectID: "1" },
  message: "This successful",
  adminGetDatabases: jest.fn(),
  showCreateComponent: jest.fn(),
  callbackCreateComponent: jest.fn(),
};

describe("Test AdminDBList component", () => {
  let dbListWrapper;
  beforeEach(() => {
    const AdminDBListwrapper = AdminDBList.WrappedComponent;
    dbListWrapper = shallow(<AdminDBListwrapper {...AdminDBListProps} />);
  });

  it("should check `componentDidMount()`", () => {
    dbListWrapper.instance().componentDidMount();
    expect(AdminDBListProps.adminGetDatabases).toHaveBeenCalledTimes(2); 
    
    expect(AdminDBListProps.adminGetDatabases).toBeDefined();
    expect(AdminDBListProps.params).toBeDefined();
    expect(dbListWrapper.instance().props.adminGetDatabases).toBeCalled();
  });
  it("matching component snapshot for AdminDBList", () => {
    expect(dbListWrapper).toMatchSnapshot();
  });
});

describe("Test AdminDBList's map state to props and dispatch", () => {
  it("test result to match the mapstostate function", () => {
    expect(
      mapStateToProps({
        adminDatabasesReducer: { isFetchingDatabases: false, databases: [], databasesFetched: false },
        adminCreateDBReducer: { isCreated: false}
      })
    ).toEqual({
      isFetchingDatabases: false,
      databases: [],
      databasesFetched: false,
      isCreated: false,
    });
  });
});
