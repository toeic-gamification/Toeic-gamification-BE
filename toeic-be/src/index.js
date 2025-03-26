require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Kết nối CSDL
const { connectMySQL } = require("./config/mysql");
const connectMongoDB = require("./config/mongo");

// Import schema & resolvers của GraphQL
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
  try {
    console.log("🔍 Checking ENV Variables:", process.env.PORT);

    // Kết nối database
    await connectMySQL();
    await connectMongoDB();

    // Khởi tạo server Express
    const app = express();
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
