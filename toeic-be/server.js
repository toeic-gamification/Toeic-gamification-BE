const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sequelize = require("./src/config/db");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const getUser = (token) => {
  if (!token) return null;
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET in environment variables");
    }
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Lỗi xác thực JWT:", err.message);
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
  try {
    await server.start();
    server.applyMiddleware({ app });

    await sequelize.sync().then(() => {
      console.log("Database đã đồng bộ!");
    });

    app.listen(4000, () => {
      console.log(
        `🚀 Server chạy tại http://localhost:4000${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error("Lỗi khởi động server:", err.message);
    process.exit(1);
  }
}

startServer();
