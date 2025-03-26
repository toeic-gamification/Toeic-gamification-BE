const Role = require("../models/role");
const TestHistory = require("../models/testHistory");

const resolvers = {
  Query: {
    roles: async () => await Role.findAll(),
    testHistories: async () => await TestHistory.find(),
  },
  Mutation: {
    createRole: async (_, { name, description }) => {
      return await Role.create({ name, description });
    },
  },
};

module.exports = resolvers;
