import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    posts: getposts {
      id
      body
      userName
      createdAt
      comments {
        body
        createdAt
        userName
      }
      commentCount
      likes {
        userName
      }
      likeCount
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      userInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation userLogin($userName: String!, $password: String!) {
    userLogin(userName: $userName, password: $password) {
      id
      email
      userName
      token
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      userName
      createdAt
      body
      likes {
        id
        userName
        createdAt
      }
      likeCount
      comments {
        id
        body
        userName
        createdAt
      }
      commentCount
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        userName
      }
      likeCount
    }
  }
`;

export const FETCH_SINGLE_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      userName
      likeCount
      likes {
        userName
      }
      comments {
        id
        userName
        createdAt
        body
      }
      commentCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        userName
        createdAt
      }
      commentCount
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        userName
        body
        createdAt
      }
      commentCount
    }
  }
`;
