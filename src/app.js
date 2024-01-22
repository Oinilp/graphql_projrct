// importar librerias
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs"
import { ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import http from 'http';


const {PORT} = process.env;

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  app.use(
    graphqlUploadExpress(),
    express.static("public")
  )

  const httpServer = http.createServer(app);  

  const server = new ApolloServer({

    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    plugins: [
      // Install a landing page plugin based on NODE_ENV
      ApolloServerPluginLandingPageProductionDefault({
        embed: true
      })
     ],
  });

  await server.start();

  //Middlewares
  const gqlPath = "/gql"
  app.use(gqlPath, cors(), express.json(), expressMiddleware(server))
  

  app.get('/', (req, res) => {
    res.send('Bienvenido a mi GraphQl API');
  });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  
  console.log(`http://localhost:${PORT}/gql`);
}
