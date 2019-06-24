import React from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { signoutUser } from "../../actions/user";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";

const Signout = ({ signoutUser }) => {
  const onSignout = () => {
    signoutUser();
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={() => (
        <span className="logout" onClick={onSignout}>
          <Typography
            variant="body1"
            color="inherit"
            className="logout__button"
          >
            Signout
          </Typography>
          <ExitToAppIcon className="logout__button-icon" />
        </span>
      )}
    />
  );
};

export default connect(
  null,
  { signoutUser }
)(Signout);
