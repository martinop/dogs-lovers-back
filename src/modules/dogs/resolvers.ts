import DogsController from '../../controllers/DogsController';

export default {
  Query: {
    dogs: DogsController.getAll,
		dog: DogsController.getById,
    myDog: DogsController.myDog,
    props: DogsController.getProps,
  },
  Mutation: {
    create: DogsController.create,
    update: DogsController.update,
  }
}