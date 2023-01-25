import React from "react";
import moment from "moment";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/AuthReducer";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

export function PostCard({ post }) {
  const {
    id,
    userName,
    likes,
    likeCount,
    commentCount,
    createdAt,
    body,
  } = post;

  const { user } = useAuth();

  return (
    <Card fluid>
      <Card.Content>
        <Popup
          inverted
          content={userName}
          trigger={
            <Image
              floated="right"
              size="mini"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          }
        />

        <Card.Header as={Link} to={`/posts/${id}`}>
          {userName}
        </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} post={{ likes, likeCount, id }} />
          <Popup
            inverted
            content="Comment on Post"
            trigger={
              <Button as={Link} labelPosition="right" to={`/posts/${id}`}>
                <Button basic color="teal">
                  <Icon name="comments" />
                </Button>
                <Label basic color="teal" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            }
          />

          {user && user.userName === userName && <DeleteButton postId={id} />}
        </div>
      </Card.Content>
    </Card>
  );
}
