export default `
	input LoginInput {
		email: String!
		password: String!
	}

	input SignupInput {
		email: String!
		password: String!
		role: String!
	}

	type User {
		id: Int!
		email: String!
		role: String!
		createdAt: String!
		token: String!
	}

	type LoginResponse {
		message: String
		data: User
	}

	type SingupResponse {
		message: String!
		token: String!

	}
	type Mutation {
		login(input: LoginInput): LoginResponse!
		signUp(input: SignupInput): SingupResponse!
	}
	
	type Query {
    ping: String
  }

`
