import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, isAuth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return !isAuth ? <Redirect to="/login" /> : <Component {...props} />;
      }}
    />
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.user.isAuth
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
