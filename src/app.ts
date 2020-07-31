import express from "express";
import { ApolloServer } from "apollo-server-express";
import { GraphQLModule } from '@graphql-modules/core';
import authModule from './modules/auth';
import dogsModule from './modules/dogs';
import notificationsModule from './modules/notifications';

export async function startServer() {
  const app = express();
  const { schema, context } = new GraphQLModule({
    name: 'app',
    imports: [
      authModule,
      dogsModule,
      notificationsModule,
    ],
  });
  const server = new ApolloServer({
    schema,
    context,
  });
  server.applyMiddleware({ app, path: "/graphql" });

  return app;
}