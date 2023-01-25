import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { Card, Form } from "semantic-ui-react";
import { CREATE_COMMENT } from "../utils/GraphqlQueries";

export function CreateComment({ postId }) {
  const [body, setbody] = useState("");
  const [error, setError] = useState("");

  const commentRef = useRef();

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      postId,
      body,
    },

    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment();
    setbody("");
    commentRef.current.blur();
  };

  return (
    <Card fluid>
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <h4>Create a Comment</h4>
          <div className="ui action input fluid">
            <input
              placeholder="Comment..."
              type="text"
              value={body}
              onChange={(event) => setbody(event.target.value)}
              ref={commentRef}
            />
            <button className="ui button pink" type="submit" disabled={!body}>
              Comment
            </button>
          </div>
        </Form>
        {error && (
          <div className="ui error message" style={{ padding: ".4rem 1.2rem" }}>
            <ul className="list">
              <li>{error}</li>
            </ul>
          </div>
        )}
      </Card.Content>
    </Card>
  );
}
