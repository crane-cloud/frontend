import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AdminDBList from './';
import { useSelector as useSelectorMock } from 'react-redux';


// Mock the useSelector hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));
describe('AdminDBList', () => {
  const mockStore = configureStore();
  const initialState = {}; // Define your initial state here if needed
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    useSelectorMock.mockReset();
  });

  test('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <AdminDBList />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });


});
