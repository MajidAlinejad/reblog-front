import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import "moment/locale/fa";
import fa_IR from "antd/lib/locale-provider/fa_IR";
// import moment from "moment";
import rootReducer from "./Redux/Reducer/index";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo";
import { ConfigProvider } from "antd";

// moment.locale("fa");

const store = createStore(rootReducer, applyMiddleware(thunk));
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConfigProvider direction="rtl" locale={fa_IR}>
        <App />
      </ConfigProvider>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
