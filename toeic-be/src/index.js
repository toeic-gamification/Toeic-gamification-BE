const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");
const sequelize = require("../config/mysql");
const connectMongoDB = require("../config/mongodb");
const typeDefs = require("../graphql/schema");
const resolvers = require("../graphql/resolvers");

dotenv.config();

// Kết nối CSDL
connectMongoDB();
sequelize.sync().then(() => console.log("✅ MySQL connected successfully"));

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Apollo Server ready at ${url}`);
});
