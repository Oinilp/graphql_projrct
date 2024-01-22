import {startApolloServer} from './src/app.js';
import { typeDefs } from './src/graphql/typeDefs.js';
import { resolvers } from './src/graphql/resolvers.js';
import { connectDB } from './src/db.js';



connectDB();

startApolloServer(typeDefs, resolvers); 
