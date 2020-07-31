import { getRepository } from "typeorm";
import { Dog } from "../entity/Dog";
import { Vaccine } from "../entity/Vaccine";
import { Medicament } from "../entity/Medicament";
import { Disease } from "../entity/Disease";
import { Notification } from "../entity/Notification";
import { User } from "../entity/User";

type CreateInput = {
  age: number;
  name: string;
  diseases: Disease[];
  medicaments: Medicament[];
  vaccines: Vaccine[];
}

type UpdateInput = {
  id: number;
  owner: number;
  diseases: Disease[];
  medicaments: Medicament[];
  vaccines: Vaccine[];
}
class DogsController {
  static getAll = async () => {
    try {
      const dogs = await getRepository(Dog).find();
      return dogs;
    } catch(e) {
      throw new Error(JSON.stringify(e));
    }
  };

  static getById = async (parent: any, args: { id: number }) => {
    const { id } = args;
    try {
			const dog = await getRepository(Dog).findOne({ where: { id: +id }, relations: ['vaccines', 'medicaments', 'owner', 'diseases']});
      return dog;
    } catch(e) {
      throw new Error(JSON.stringify(e));
    }
	};
	static myDog = async (parent: any, args: any, context: { userData: { id: number } }) => {
    const { userData: { id } } = context;
    try {
			const dog = await getRepository(Dog).findOne({ where: { owner: +id }, relations: ['vaccines', 'medicaments', 'owner', 'diseases']});
      return dog;
    } catch(e) {
      throw new Error(JSON.stringify(e));
    }
  };

  static getProps =  async () => {
    try {
      const vaccines = await getRepository(Vaccine).find();
      const medicaments = await getRepository(Medicament).find();
      const diseases = await getRepository(Disease).find();
      return { vaccines, diseases, medicaments };
    } catch(e) {
      throw new Error(JSON.stringify(e));
    }
  }

  static create = async (parent: any, args: { input: CreateInput }, context: { userData: { id: number } }) => {
    const { name, age, diseases, medicaments, vaccines } = args.input;
    const { userData: { id }} = context;
    const dog = new Dog();
    const me = new User();
    me.id = id;
    dog.owner = me;
    dog.age = age;
    dog.name = name;
    dog.diseases = diseases;
    dog.medicaments = medicaments;
    dog.vaccines = vaccines;
    try {
      await dog.save();
      return { message: "Canino creado" }
    } catch(e) {
      throw new Error(JSON.stringify(e));
    }
  }
  static update = async (parent: any, args: { input: UpdateInput }) => {
    const { id, owner: ownerId, diseases, medicaments, vaccines } = args.input;
    try {
      await getRepository(Dog).save({ id, medicaments, diseases, vaccines });
      const owner = new User();
      owner.id = ownerId;

      const notification = new Notification();
      notification.user = owner;
      notification.title = "Algo ha cambiado en tu canino";
      notification.description = "Un Veteriano ha cambiado algo en tu canino, revisalo!";
      notification.save();
      return { message: "Canino actualizado" }
    } catch(e) {
      console.log(e);
      throw new Error(JSON.stringify(e));
    }
  }
};

export default DogsController;