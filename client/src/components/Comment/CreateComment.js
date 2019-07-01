import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";

import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
import { useClient } from "../../graphql/gqlClient";
import { createCommentCreator } from "../../actions/map";

const CreateComment = ({ classes, currentPin, createCommentCreator }) => {
  const client = useClient();
  const [comment, setComment] = useState("");

  const handleSubmitComment = async () => {
    const variables = { pinId: currentPin._id, text: comment };

    const { createComment } = await client.request(
      CREATE_COMMENT_MUTATION,
      variables
    );
    createCommentCreator(createComment);
    setComment("");
  };

  return (
    <>
      <form className={classes.form}>
        <IconButton
          onClick={() => setComment("")}
          className={classes.clearButton}
        >
          <ClearIcon />
        </IconButton>
        <InputBase
          multiline={true}
          className={classes.input}
          placeholder="Add Comment"
          onChange={e => setComment(e.target.value)}
          value={comment}
        />
        <IconButton
          onClick={handleSubmitComment}
          disabled={!comment.trim()}
          className={classes.sendButton}
        >
          <SendIcon />
        </IconButton>
      </form>
      <Divider />
    </>
  );
};

const styles = theme => ({
  form: {
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  clearButton: {
    padding: 0,
    color: "red"
  },
  sendButton: {
    padding: 0,
    color: theme.palette.secondary.dark
  }
});

const mapStateToProps = state => {
  return {
    currentPin: state.map.currentPin
  };
};

const wrapped = withStyles(styles)(CreateComment);

export default connect(
  mapStateToProps,
  { createCommentCreator }
)(wrapped);
