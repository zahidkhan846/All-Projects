import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query allUsers {
    getUsers {
      id
      username
      email
      createdAt
      imageUrl
      latestMessage {
        uuid
        content
        from
        to
        createdAt
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      content
      from
      to
      createdAt
      reactions {
        uuid
        content
      }
    }
  }
`;

export const GET_USER = gql`
  query singleUser {
    getUser {
      username
      email
      createdAt
      imageUrl
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($to: String!, $content: String!) {
    sendMessage(to: $to, content: $content) {
      uuid
      content
      from
      to
      createdAt
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      username
      email
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export const NEW_REACTION = gql`
  subscription newReaction {
    newReaction {
      uuid

      content
      message {
        uuid
        from
        to
      }
    }
  }
`;

export const REACT_ON_MESSAGE = gql`
  mutation reactOnMessage($uuid: String!, $content: String!) {
    reactOnMessage(uuid: $uuid, content: $content) {
      content
    }
  }
`;
