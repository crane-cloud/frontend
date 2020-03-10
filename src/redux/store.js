import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState } from '../helpers/localStorage';

const persistedState = loadState();

export default createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);
