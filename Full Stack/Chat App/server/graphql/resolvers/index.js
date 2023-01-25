const messages = require("./messages");
const users = require("./users");

const { User, Message } = require("../../models");

module.exports = {
  Message: {
    createdAt: (parant) => parant.createdAt.toISOString(),
  },
  User: {
    createdAt: (parant) => parant.createdAt.toISOString(),
  },
  Reaction: {
    createdAt: (parant) => parant.createdAt.toISOString(),
    message: async (parant) => await Message.findByPk(parant.messageId),
    user: async (parant) => await User.findByPk(parant.userId),
  },
  Query: {
    ...users.Query,
    ...messages.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...messages.Mutation,
  },
  Subscription: {
    ...messages.Subscription,
  },
};
