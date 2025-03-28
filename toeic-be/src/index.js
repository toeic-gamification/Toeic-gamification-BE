require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

// Kết nối CSDL
const { connectMySQL } = require("./config/mysql");
const connectMongoDB = require("./config/mongo");

// Import schema & resolvers của GraphQL
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

// Kết nối cloudinary API upload ảnh
const uploadRoutes = require("./routes/uploadRoutes");

const startServer = async () => {
  try {
    console.log("🔍 Checking ENV Variables:", process.env.PORT);

    // Kết nối database
    await connectMySQL();
    await connectMongoDB();

    // Khởi tạo server Express
    const app = express();

    // Middleware hỗ trợ JSON
    app.use(express.json());

    // Cấu hình CORS
    app.use(
      cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173", // Chỉ cho phép frontend truy cập
        credentials: true,
      })
    );

    // Health Check API
    app.get("/", (req, res) => {
      res.json({ message: "🚀 Server is running!" });
    });

    // Tích hợp API upload ảnh vào server
    app.use("/api", uploadRoutes);

    // Khởi tạo Apollo Server
    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
