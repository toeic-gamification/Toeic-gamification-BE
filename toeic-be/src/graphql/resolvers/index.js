const userResolver = require("./userResolver");
const gameResolver = require("./gameResolver");

const resolvers = {
  Query: {
    ...userResolver.Query,
    ...gameResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...gameResolver.Mutation,
  },
};

module.exports = resolvers;
