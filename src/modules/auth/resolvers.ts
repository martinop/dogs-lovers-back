import AuthController from '../../controllers/AuthController';

export default { 
	Query: {
		ping: () => 'Pong!',
	},
	Mutation: {
		login: AuthController.login,
		signUp: AuthController.signUp,
	},
}