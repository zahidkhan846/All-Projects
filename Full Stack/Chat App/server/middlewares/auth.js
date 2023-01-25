const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");
const env = require("../config/env");

const pubsub = new PubSub();

module.exports = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split("Bearer ")[1];
  }
  if (token) {
    jwt.verify(token, env.secret_key, (err, data) => {
      context.user = data;
    });
  }

  context.pubsub = pubsub;
  return context;
};
