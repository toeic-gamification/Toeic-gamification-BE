const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sequelize = require("./config/db");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

// Khởi tạo Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    return { user: getUser(token) };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, async () => {
    console.log(`🚀 Server chạy tại http://localhost:4000${server.graphqlPath}`);
    await sequelize.sync();
    console.log("✅ Database đã đồng bộ!");
  });
}

startServer();
