const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Định nghĩa User
  type User {
    id: String! # Sử dụng UUID cho MySQL và ObjectId cho MongoDB
    name: String!
    email: String!
    role: Role!
    avatar: String
    createdAt: String! # Kiểu String cho thời gian
    updatedAt: String! # Kiểu String cho thời gian
    token: String
  }

  # Định nghĩa Role
  type Role {
    id: String! # UUID cho MySQL, ObjectId cho MongoDB
    name: String!
    users: [User] # Liên kết người dùng với vai trò
  }

  # Định nghĩa Progress (tiến trình học)
  type Progress {
    userId: String! # Tương thích với UUID (MySQL) và ObjectId (MongoDB)
    completedLessons: Int!
    score: Int!
    lastUpdated: String! # Thời gian cập nhật
  }

  # Định nghĩa Game Progress (tiến trình game)
  type GameProgress {
    userId: String! # Tương thích với UUID (MySQL) và ObjectId (MongoDB)
    game: String!
    level: Int!
    exp: Int!
    coins: Int!
    lastUpdated: String! # Thời gian cập nhật
  }

  # Định nghĩa Vocabulary (từ vựng trong mini-game)
  type Vocabulary {
    id: String! # UUID cho MySQL, ObjectId cho MongoDB
    word: String!
    meaning: String!
    example: String
    userProgress: Progress
  }

  # Định nghĩa Kết quả xác thực (Login)
  type AuthPayload {
    status: Boolean!
    msg: String
    token: String
    user: User
  }

  # Định nghĩa Kết quả Message Response
  type MessageResponse {
    status: Boolean!
    msg: String
  }

  # Input type cho đăng ký người dùng
  input RegisterInput {
    name: String!
    email: String!
    password: String!
    roleId: String!
  }

  type Query {
    getUsers: [User]
    profile: User
    getUserProgress(userId: String!): Progress
    getUserGameProgress(userId: String!): GameProgress
    getVocabularies: [Vocabulary]
    getUserRole(userId: String!): Role
  }

  # Mutations (Các yêu cầu thay đổi dữ liệu)
  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      roleId: String!
    ): User
    register(input: RegisterInput!): MessageResponse
    login(email: String!, password: String!): AuthPayload
    updateUserProgress(
      userId: String!
      completedLessons: Int!
      score: Int!
    ): Progress
    updateGameProgress(
      userId: String!
      game: String!
      level: Int!
      exp: Int!
      coins: Int!
    ): GameProgress
  }
`;

module.exports = typeDefs;
