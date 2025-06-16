import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { MovieAPI } from '../server/src/datasources/movie-api.js';
import { typeDefs } from '../server/src/schema.js';
import { resolvers } from '../server/src/resolvers.js';

// Create Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Start Apollo + create Next handler once
const handler = startServerAndCreateNextHandler(server, {
    context: async () => ({
        dataSources: {
            movieAPI: new MovieAPI(),
        },
    }),
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// Final wrapped handler for CORS + preflight
export default async function wrappedHandler(req, res) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Preflight
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    return handler(req, res);
}
