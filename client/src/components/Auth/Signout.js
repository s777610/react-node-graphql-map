import React from "react";
import { GoogleLogout } from "react-google-login";
import { connect } from "react-redux";
import { signoutUser } from "../../actions/user";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

const Signout = ({ signoutUser }) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");

  const onSignout = () => {
    signoutUser();
  };

  return (
    <GoogleLogout
      onLogoutSuccess={onSignout}
      render={() => (
        <span
          className="logout"
          onClick={onSignout}
          style={{ display: mobileSize ? "none" : "block" }}
        >
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
