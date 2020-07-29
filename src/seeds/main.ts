import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { UserRole } from "../types/user";
import { Vaccine } from "../entity/Vaccine";
import { Medicament } from "../entity/Medicament";
import { Disease } from "../entity/Disease";
import { Notification } from "../entity/Notification";

export default class Main implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(Vaccine)().createMany(10);
		await factory(Medicament)().createMany(10);
		await factory(Disease)().createMany(10);

		const veterinarian = new User()
		veterinarian.password = "12345678";
		veterinarian.hashPassword();
		veterinarian.role = UserRole.VETERINARIAN;
		veterinarian.email = "veterinarian@test.io"
		await veterinarian.save();

		const user = new User();
		user.password = "12345678";
		user.hashPassword();
		user.email = "user@test.io";
		user.notifications = await factory(Notification)().createMany(10);

		await user.save();
  }
}