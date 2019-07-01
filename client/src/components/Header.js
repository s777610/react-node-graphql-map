import React from "react";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import { unstable_useMediaQuery as useMediaQuery } from "@material-ui/core/useMediaQuery";

import Signout from "./Auth/Signout";

const Header = ({ currentUser }) => {
  const mobileSize = useMediaQuery("(max-width: 650px)");

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar>
          <div className="header__item">
            <MapIcon className="logoIcon" />
            <Typography
              className={mobileSize ? "mobile" : ""}
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              GeoPins
            </Typography>
          </div>
          {currentUser && (
            <div className="header__item">
              <img
                className="picture"
                src={currentUser.picture}
                alt={currentUser.name}
              />
              <Typography
                className={mobileSize ? "mobile" : ""}
                variant="h5"
                color="inherit"
                noWrap
              >
                {currentUser.name}
              </Typography>
            </div>
          )}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.user.currentUser
  };
};

export default connect(mapStateToProps)(Header);
