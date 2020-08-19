import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import rootReducer from "./Redux/Reducer/index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo";

// var cors = require("cors");
// app.use(cors());

// const store = applyMiddleware(thunk)(createStore);
const store = createStore(rootReducer, applyMiddleware(thunk));
// const {store} = applyMiddleware(thunk)(createStore);
// const { store } = createStore(reducers);
// console.log(store);
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
