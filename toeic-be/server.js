const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const sequelize = require("./src/config/db");
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("Thiếu JWT_SECRET trong tệp môi trường (.env)");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// Middleware xác thực JWT
const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("Lỗi xác thực JWT:", err.message);
    return null;
  }
};

// Khởi tạo Apollo Server
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization?.replace("Bearer ", "");
      return { user: getUser(token) };
    },
  });

  try {
    await server.start();
    server.applyMiddleware({ app });

    await sequelize.authenticate();
    console.log("Kết nối Database thành công!");

    await sequelize.sync();
    console.log("Database đã đồng bộ!");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server chạy tại http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.error("Lỗi khởi động server:", err.message);
    process.exit(1);
  }
}

startServer();
