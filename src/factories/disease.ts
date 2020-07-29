import Faker from 'faker';
import { define } from 'typeorm-seeding'
import { Disease } from '../entity/Disease';

define(Disease, (faker: typeof Faker) => {
  const disease = new Disease()
	disease.name = faker.lorem.word();
  return disease
})