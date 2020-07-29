import express from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLModule } from '@graphql-modules/core';
import authModule from './modules/auth';

export async function startServer() {
  const app = express();
  const { schema, context } = new GraphQLModule({
    name: 'app',
    imports: [
      authModule,
    ],
  });
  const server = new ApolloServer({
    schema,
    context,
  });
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}