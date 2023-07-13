import React from 'react';
import { shallow } from 'enzyme';
import  CreateAdminDB  from './CreateAdminDB';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('CreateAdminDB', () => {
    const mockStore = configureStore();
  const initialState = {}; // Define your initial state here if needed
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders the component', () => {
    const wrapper = shallow( <Provider store={store}> <CreateAdminDB /></Provider>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  
});
