const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
    createdAt: String!
    latestMessage: Message
    imageUrl: String
  }

  type Message {
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
    reactions: [Reaction]
  }

  type Reaction {
    uuid: String!
    content: String!
    createdAt: String!
    message: Message!
    user: User!
  }

  type Query {
    getUsers: [User]!
    login(email: String!, password: String!): User!
    getMessages(from: String!): [Message]!
    getUser: User!
  }

  type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): User!
    sendMessage(to: String!, content: String!): Message!
    reactOnMessage(uuid: String!, content: String): Reaction!
  }

  type Subscription {
    newMessage: Message!
    newReaction: Reaction!
  }
`;
