require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

// Kết nối CSDL
const { connectMySQL } = require("./config/mysql");
const connectMongoDB = require("./config/mongo");

// Import schema & resolvers của GraphQL
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

// Import routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const startServer = async () => {
  try {
    console.log("🔍 Checking ENV Variables:", process.env.PORT);

    // Kết nối database
    await connectMySQL();
    await connectMongoDB();

    // Khởi tạo server Express
    const app = express();

    // ✅ Cấu hình CORS trực tiếp trong Express
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );

    // Middleware hỗ trợ JSON
    app.use(express.json());

    // Khởi tạo Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ req }), // ✅ Truyền request để dùng authentication
    });
    await server.start();

    // ✅ Tích hợp Apollo Server với Express, không cần cors: false
    server.applyMiddleware({ app, cors: false });

    // Health Check API
    app.get("/", (req, res) => {
      res.json({ message: "🚀 Server is running!" });
    });

    // Tích hợp API upload ảnh vào server
    app.use("/api", uploadRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/admin", adminRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
