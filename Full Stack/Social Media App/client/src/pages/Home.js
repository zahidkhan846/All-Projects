import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid, TransitionGroup } from "semantic-ui-react";
import { PostCard } from "../components/PostCard";
import { CreatePost } from "../components/CreatePost";
import { useAuth } from "../store/AuthReducer";
import { FETCH_POSTS_QUERY } from "../utils/GraphqlQueries";

function Home() {
  const { user } = useAuth();

  const { data: { posts } = {}, loading } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns="2" className="posts">
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && (
        <Grid.Row>
          <Grid.Column>
            <CreatePost />
          </Grid.Column>
        </Grid.Row>
      )}
      <Grid.Row>
        {loading ? (
          <h2>Posts are loading...</h2>
        ) : (
          <TransitionGroup>
            {posts &&
              posts.map((post) => {
                return (
                  <Grid.Column style={{ marginBottom: "1.2rem" }} key={post.id}>
                    <PostCard post={post} />
                  </Grid.Column>
                );
              })}
          </TransitionGroup>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
