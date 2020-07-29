import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { UserRole } from "../types/user";

export default class Main implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {

		const veterinarian = new User()
		veterinarian.password = "12345678";
		veterinarian.hashPassword();
		veterinarian.role = UserRole.VETERINARIAN;
		veterinarian.email = "veterinarian@test.io"
		await veterinarian.save();

		const user = new User();
		user.password = "12345678";
		user.hashPassword();
		user.email = "user@test.io"
		await user.save();
  }
}