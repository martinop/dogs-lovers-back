import Faker from 'faker';
import { define } from 'typeorm-seeding'
import { Dog } from '../entity/Dog';

define(Dog, (faker: typeof Faker) => {
  const dog = new Dog()
	dog.name = faker.lorem.word();
	dog.age = faker.random.number(15);
  return dog
})