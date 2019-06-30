import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import NoContent from "./Pin/NoContent";
import CreatePin from "./Pin/CreatePin";
import PinContent from "./Pin/PinContent";

import { Paper } from "@material-ui/core";

const Blog = ({ classes, draft, currentPin }) => {
  let BlogContent;

  if (!draft && !currentPin) {
    // nocontent
    BlogContent = NoContent;
  } else if (draft && !currentPin) {
    // create pin
    BlogContent = CreatePin;
  } else if (!draft && currentPin) {
    BlogContent = PinContent;
  }

  return (
    <Paper className={classes.root}>
      <BlogContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "scroll",
    display: "flex",
    justifyContent: "center"
  },
  rootMobile: {
    maxWidth: "100%",
    maxHeight: 300,
    overflowX: "hidden",
    overflowY: "scroll"
  }
};

const mapStateToProps = state => {
  return {
    draft: state.map.draft,
    currentPin: state.map.currentPin
  };
};

const wrapped = withStyles(styles)(Blog);

export default connect(mapStateToProps)(wrapped);
