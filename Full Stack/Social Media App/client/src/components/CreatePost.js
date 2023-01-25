import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST, FETCH_POSTS_QUERY } from "../utils/GraphqlQueries";

export function CreatePost() {
  const [body, setbody] = useState("");
  const [error, setError] = useState("");

  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      body: body,
    },
    update: (proxy, result) => {
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { posts: [result.data.createPost, ...data.posts] },
      });
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost();
    setbody("");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Say Hello..."
            type="text"
            value={body}
            onChange={(event) => setbody(event.target.value)}
            error={error ? true : false}
          />
          <Button type="submit" color="pink">
            Post
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error}</li>
          </ul>
        </div>
      )}
    </>
  );
}
