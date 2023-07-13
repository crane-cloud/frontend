import { Provider } from 'react-redux';
import { render } from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import AdminProjectOverviewPage from './';

// Create a mock store
const mockStore = configureStore([]);
const initialState = {
  user: {
    data: {
      name: 'John Doe', // Provide a valid name or username here
    },
  },
};
const store = mockStore(initialState);

describe('AdminProjectOverviewPage', () => {
  it('should render without errors', () => {
    const wrapper = render(
      <Provider store={store}>
        <MemoryRouter>
          <AdminProjectOverviewPage />
        </MemoryRouter>
      </Provider>
    );

    //expect(wrapper).toMatchSnapshot();
  });
});
