import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { saveState } from "./helpers/localStorage";
import Routes from "./router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// update localstorage whenever state changes
store.subscribe(() => {
  saveState(store.getState());
});
const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  </Provider>,
  document.getElementById("root")
);
