
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { isAuthenticated } from '../../utils/authenticated-guard';
import authMiddleware from '../authMiddleware';

export default new GraphQLModule({
  name: 'notifications',
	typeDefs,
	resolvers,
	imports: [authMiddleware],
	resolversComposition: {
    'Query.notifications': isAuthenticated
  }
})