import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { Router } from "react-router-dom";
import { Spin } from "antd";
import { createBrowserHistory } from "history";
import App from "./App";
import "antd/dist/antd.min.css";
import "./stylesheets/main.scss";
import axiosInstance from "./config/axios-instance";
import { connectTheUser, getAuthedUser } from "./actions/auth-actions/actions";
import store  from "./stores/store-dev";
export const history = createBrowserHistory();
window.io = require("socket.io-client");
require("./config/socket-io");

const token = localStorage.getItem("token_copsycho");

if (token) {
  // if token exists in local storage!
  store.dispatch(connectTheUser(token));
}

store.subscribe(() => {
  const reduxSubs = store.getState();
  // We subscribe to to store!
  // if token goes from undefined or null  to a string then we add this to the
  // axios instance! so every request is gonna have an Authorization Bearer <TOKEN>
  if (reduxSubs.authReducer.token) {
    // this gonna happens only when a login request is succeeded
    // lets add token the the headers
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${reduxSubs.authReducer.token}`;
    axiosInstance.defaults.headers[
      "Authorization"
    ] = `Bearer ${reduxSubs.authReducer.token}`;
    // we are doing this to avoid reloading the entire page ( its about SPA! )
    window.Echo.options.auth.headers = {
      Authorization: `Bearer ${reduxSubs.authReducer.token}`
    };
  }
});

const WrappedApp = props => {
  useEffect(() => {
    props.store.dispatch(getAuthedUser());
  }, [props.store]);
  return (
    <>
      {props.isLoadingUser ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh"
          }}
        >
          <Spin size={"large"} />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};
const mapStateToProps = reduxStore => {
  return {
    user: reduxStore.authReducer.user,
    isLoadingUser: reduxStore.authReducer.isLoadingUser
  };
};
const ConnectedWrappedApp = connect(mapStateToProps)(WrappedApp);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedWrappedApp store={store}>
      <Router history={history}>
        <App />
      </Router>
    </ConnectedWrappedApp>
  </Provider>,
  document.getElementById("root")
);
