import DogsController from '../../controllers/DogsController';

export default {
  Query: {
    dogs: DogsController.getAll,
		dog: DogsController.getById,
		myDog: DogsController.myDog,
  },
}