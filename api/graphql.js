import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { config } from 'dotenv';
import { MovieAPI } from '../server/src/datasources/movie-api.js';
import {typeDefs} from '../server/src/schema.js';
import {resolvers} from '../server/src/resolvers.js';
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

export default startServerAndCreateNextHandler(server, {
    context: async () => ({
        dataSources: {
            movieAPI: new MovieAPI(),
        },
    }),
});