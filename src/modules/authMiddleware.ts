
import { GraphQLModule } from '@graphql-modules/core';
import { gql } from 'apollo-server-express';
import TokenService from '../utils/TokenService';

export default new GraphQLModule({
  name: 'auth',
	typeDefs: gql`
    type Query {
      tokenData: TokenData
    }
    type TokenData {
      userId: Int
			email: String
			iat: Int
			exp: Int
    }
  `,
  resolvers: {
    Query: {
      tokenData: (root, args, { userData }) => userData,
    },
  },
  context: ({ req }) => {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(' ')[1] : undefined;
    const userData: any = TokenService.verifyToken(token)
    return { userData };
  },
})