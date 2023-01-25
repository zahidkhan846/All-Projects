import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { LIKE_POST } from "../utils/GraphqlQueries";

function LikeButton({ post: { likes, likeCount, id }, user }) {
  const [liked, setLiked] = useState(false);

  const history = useHistory();

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (user && likes.find((like) => like.userName === user.userName)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  let likeButton = user ? (
    liked ? (
      <Button color="pink">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic color="pink">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button basic color="pink" to="/login" as={Link}>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Popup
      content={liked ? "Unlike" : "Like"}
      inverted
      trigger={
        <Button as="div" labelPosition="right" onClick={user && likePost}>
          {likeButton}
          <Label basic color="pink" pointing="left">
            {likeCount}
          </Label>
        </Button>
      }
    />
  );
}

export default LikeButton;
