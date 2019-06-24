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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <ProtectedRoute exact path="/" component={App} />
          <Route path="/login" component={Splash} />
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
