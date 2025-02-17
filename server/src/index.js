import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { MovieAPI } from "./datasources/movie-api.js";

// impo resolvers = require("./resolvers");
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          movieAPI: new MovieAPI({ cache }),
        },
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
startApolloServer();
