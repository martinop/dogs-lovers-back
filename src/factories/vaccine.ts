import Faker from 'faker';
import { define } from 'typeorm-seeding'
import { Vaccine } from '../entity/Vaccine';

define(Vaccine, (faker: typeof Faker) => {
  const vaccine = new Vaccine()
	vaccine.name = faker.lorem.word();
  return vaccine
})