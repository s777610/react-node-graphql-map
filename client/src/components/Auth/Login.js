import React from "react";
import { GraphQLClient } from "graphql-request"; // great library!! no Apollo
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import { loginUser, isLoggedIn } from "../../actions/user";
import { ME_QUERY } from "../../graphql/queries";

import Typography from "@material-ui/core/Typography";

const Login = ({ classes, loginUser, isLoggedIn }) => {
  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: idToken }
      });
      const data = await client.request(ME_QUERY);
      loginUser(data.me);
      isLoggedIn(googleUser.isSignedIn());
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = err => {
    console.error(`Error logging in ${err}`);
  };

  return (
    <div className="googleAuth">
      <Typography
        component="h1"
        variant="h3"
        style={{ color: "rgb(66,133,244)" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="834378068896-fopp7ogqc6s00q2hr9lv5dvmmte5phok.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        theme="dark"
      />
    </div>
  );
};

export default connect(
  null,
  { loginUser, isLoggedIn }
)(Login);
