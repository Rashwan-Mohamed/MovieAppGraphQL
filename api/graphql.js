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

const handler = startServerAndCreateNextHandler(server, {
    context: async (req, res) => {
        // 🧠 Set CORS headers
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if (req.method === "OPTIONS") {
            res.status(200).end(); // 👈 handles preflight
            return;
        }

        return {
            dataSources: {
                movieAPI: new MovieAPI(),
            },
        };
    },
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;