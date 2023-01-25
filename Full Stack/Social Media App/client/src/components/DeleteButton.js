import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import {
  DELETE_COMMENT,
  DELETE_POST,
  FETCH_POSTS_QUERY,
} from "../utils/GraphqlQueries";

function DeleteButton({ postId, cb, commentId }) {
  const [isOpen, setIsOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deleteHandler] = useMutation(mutation, {
    update(proxy) {
      setIsOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const updatedPosts = data.posts.filter((post) => post.id !== postId);
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { posts: updatedPosts },
        });
      }
      if (cb) cb();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <Button
        as="div"
        floated="right"
        color="red"
        onClick={() => setIsOpen(true)}
      >
        <Icon name="trash" style={{ margin: "0" }} />
      </Button>
      <Confirm
        size="mini"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={deleteHandler}
      />
    </>
  );
}

export default DeleteButton;
