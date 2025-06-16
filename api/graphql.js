// api/graphql.js

import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { MovieAPI } from '../server/src/datasources/movie-api.js';
import { typeDefs } from '../server/src/schema.js';
import { resolvers } from '../server/src/resolvers.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(
    server,
    {
        context: () => ({
            dataSources: { movieAPI: new MovieAPI() }
        })
    }
);

// Export Vercel-compatible handler with CORS support
export const config = { api: { bodyParser: false } };

export default async function wrappedHandler(req, res) {
    // CORS setup
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Preflight handling
    if (req.method === "OPTIONS") return res.status(200).end();

    // Delegate to Apollo handler
    return handler(req, res);
}
