import Faker from 'faker';
import { define } from 'typeorm-seeding'
import { Notification } from '../entity/Notification';

define(Notification, (faker: typeof Faker) => {
  const notification = new Notification()

	notification.title = faker.random.word();
	notification.description = faker.lorem.words();
	notification.read = true;

  return notification
})