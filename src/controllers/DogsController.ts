import { getRepository } from "typeorm";
import { Dog } from "../entity/Dog";

class DogsController {
  static getAll = async () => {
    try {
      const dogs = await getRepository(Dog).find();
      return dogs;
    } catch(e) {
      throw new Error(e);
    }
  };

  static getById = async (parent: any, args: { id: number }) => {
    const { id } = args;
    try {
			const dog = await getRepository(Dog).findOne({ where: { id: +id }, relations: ['vaccines', 'medicaments', 'owner', 'diseases']});
      return dog;
    } catch(e) {
      throw new Error(e);
    }
	};
	static myDog = async (parent: any, args: any, context: { userData: { id: number } }) => {
		const { userData: { id } } = context;
    try {
			const dog = await getRepository(Dog).findOne({ where: { owner: +id }, relations: ['vaccines', 'medicaments', 'owner', 'diseases']});
      return dog;
    } catch(e) {
      throw new Error(e);
    }
  };
};

export default DogsController;