const { ApolloServer } = require("apollo-server");
const { sequelize } = require("./models");

// The GraphQL schema
const typeDefs = require("./graphql/typeDefs");
// The GraphQL resolvers
const resolvers = require("./graphql/resolvers");
const auth = require("./middlewares/auth");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => auth(ctx),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Db Connected`);
    })
    .catch((err) => {
      console.log(err);
    });
});
