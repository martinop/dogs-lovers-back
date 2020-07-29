import Faker from 'faker';
import { define } from 'typeorm-seeding'
import { User } from '../entity/User';

define(User, (faker: typeof Faker) => {
  const user = new User()
	user.email = faker.internet.email();
	user.password = "12345678";
	user.hashPassword();
  return user;
})