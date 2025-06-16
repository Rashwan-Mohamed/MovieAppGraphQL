import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { MovieAPI } from '../server/src/datasources/movie-api.js';
import { typeDefs } from '../server/src/schema.js';
import { resolvers } from '../server/src/resolvers.js';

// Setup Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = async (req, res) => {
    // ✅ Handle CORS headers for all requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // ✅ Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Delegate to Apollo handler
    return startServerAndCreateNextHandler(server, {
        context: async () => ({
            dataSources: {
                movieAPI: new MovieAPI(),
            },
        }),
    })(req, res);
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
