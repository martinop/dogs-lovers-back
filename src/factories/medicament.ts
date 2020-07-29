import Faker from 'faker';
import { define } from 'typeorm-seeding'
import { Medicament } from '../entity/Medicament';

define(Medicament, (faker: typeof Faker) => {
  const medicament = new Medicament()
	medicament.name = faker.lorem.word();
  return medicament
})