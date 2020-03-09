import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
import { saveState } from './helpers/localStorage';
import Routes from './router';

// update localstorage whenever state changes
store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
