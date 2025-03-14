const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    xp: Int!
    level: Int!
    coins: Int!
    avatar: String!
    clan: Clan
    token: String
  }

  type Clan {
    id: ID!
    name: String!
    description: String
    members: [User]
  }

  type Vocabulary {
    id: ID!
    word: String!
    meaning: String!
    example: String
    level: Int!
    user: User!
  }

  type Question {
    id: ID!
    question: String!
    options: [String!]!
    answer: String!
    level: Int!
  }

  type Test {
    id: ID!
    title: String!
    questions: [Question!]!
    xpReward: Int!
  }

  type Reward {
    id: ID!
    name: String!
    description: String!
    cost: Int!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    vocabularies: [Vocabulary]
    vocabulary(id: ID!): Vocabulary
    questions(level: Int!): [Question]
    tests: [Test]
    clans: [Clan]
    rewards: [Reward]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addVocabulary(word: String!, meaning: String!, example: String, level: Int!): Vocabulary
    joinClan(userId: ID!, clanId: ID!): User
    completeTest(userId: ID!, testId: ID!): User
    purchaseReward(userId: ID!, rewardId: ID!): User
  }
`;

module.exports = typeDefs;
