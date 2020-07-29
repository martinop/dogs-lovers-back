
import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { isVeterinarian, isAuthenticated } from '../../utils/authenticated-guard';
import authMiddleware from '../authMiddleware';

export default new GraphQLModule({
  name: 'dogs',
	typeDefs,
	resolvers,
	imports: [authMiddleware],
	resolversComposition: {
    'Query.dogs': isVeterinarian,
		'Query.dog': isVeterinarian,
		'Query.myDog': isAuthenticated,
		'Mutation.create': isAuthenticated,
  }
})