const { gql } = require("apollo-server");

const typeDefs = gql`
  type Role {
    id: ID!
    name: String!
    description: String
  }

  type TestHistory {
    id: ID!
    userId: String!
    score: Int!
    date: String!
  }

  type Query {
    roles: [Role]
    testHistories: [TestHistory]
  }

  type Mutation {
    createRole(name: String!, description: String): Role
  }
`;

module.exports = typeDefs;
