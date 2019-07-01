import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reducers from "./reducer/index";

import App from "./components/pages/App";
import Splash from "./components/pages/Splash";
import ProtectedRoute from "./ProtectedRoute";

import "mapbox-gl/dist/mapbox-gl.css";

import "./index.css";

// Apollo Client is for Subscription
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true
  }
});

const client = new ApolloClient({
  link: wsLink,
  cache: new InMemoryCache()
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const Root = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/" component={App} />
            <Route path="/login" component={Splash} />
          </Switch>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
