import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { config } from 'dotenv';
import { MovieAPI } from '../src/datasources/movie-api.js';
import {typeDefs} from '../src/schema.js';
import {resolvers} from '../src/resolvers.js';
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