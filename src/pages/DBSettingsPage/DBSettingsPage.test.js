/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import DBSettingsPage from "./";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const SettingsPageProps = {
  match: { params: { projectID: "1" } },
  location: { pathname: "path" },
  data: { beta: [] },
};

describe("Testing the Project Settings Page component", () => {
  const mockStore = configureStore();
  const initialState = {
    userProjectsReducer: {
      projects: [],
    },
    
  }; 
  let store; 

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should match the snapshot for DBSettingsPage after adding props", () => {
    const DBSettingsPageComponent = shallow(
      <Provider store={store}>
        <DBSettingsPage {...SettingsPageProps} />
      </Provider>
    );
    expect(DBSettingsPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapStateToProps for DBSettingsPage", () => {
  it("matches the DBSettingsPage mapStateToProps", () => {
    const mapStateToProps = (state) => ({
      projects: state.userProjectsReducer.projects,
    });

    const initialState = {
      userProjectsReducer: {
        projects: [],
      },
    };
    const store = configureStore()(initialState);
    const props = mapStateToProps(store.getState());

    expect(props).toEqual({
      projects: [],
    });
  });
});
