import React from "react";
import { Card } from "semantic-ui-react";
import DeleteButton from "./DeleteButton";
import moment from "moment";

export default function CommentCard({ comment, user, postId }) {
  const { userName, body, createdAt, id } = comment;

  return (
    <Card fluid>
      <Card.Content>
        {user && user.userName === userName && (
          <DeleteButton postId={postId} commentId={id} />
        )}
        <Card.Header>{userName}</Card.Header>

        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
    </Card>
  );
}
