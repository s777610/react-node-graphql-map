import React from "react";
import { GraphQLClient } from "graphql-request"; // great library!! no Apollo
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user";

// import Typography from "@material-ui/core/Typography";

const ME_QUERY = `
{
  me {
    _id
    name
    email
    picture
  }
}
`;

const Login = ({ classes, loginUser }) => {
  const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token;
    const client = new GraphQLClient("http://localhost:4000/graphql", {
      headers: { authorization: idToken }
    });
    const data = await client.request(ME_QUERY);
    loginUser(data.me);
  };

  return (
    <GoogleLogin
      clientId="834378068896-fopp7ogqc6s00q2hr9lv5dvmmte5phok.apps.googleusercontent.com"
      onSuccess={onSuccess}
      isSignedIn={true}
    />
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  }
};

const wrappedComponent = withStyles(styles)(Login);

export default connect(
  null,
  { loginUser }
)(wrappedComponent);
