
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import authMiddleware from '../authMiddleware';

export default new GraphQLModule({
  name: 'auth',
  imports: [
    authMiddleware,
  ],
	typeDefs,
  resolvers,
})