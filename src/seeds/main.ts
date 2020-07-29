import { Seeder, Factory } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { UserRole } from "../types/user";
import { Vaccine } from "../entity/Vaccine";
import { Medicament } from "../entity/Medicament";
import { Disease } from "../entity/Disease";
import { Notification } from "../entity/Notification";
import { Dog } from "../entity/Dog";

export default class Main implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
		const vaccines = await factory(Vaccine)().createMany(10);
		const medicaments = await factory(Medicament)().createMany(10);
		const diseases = await factory(Disease)().createMany(10);

		await factory(User)()
		.map(async (user: User) => {
			const dog = await factory(Dog)().create();
			const shuffledVaccines = vaccines.sort(() => 0.5 - Math.random());
			const shuffledMedicaments = medicaments.sort(() => 0.5 - Math.random());
			const shuffledDiseases = diseases.sort(() => 0.5 - Math.random());
			const randomLength = Math.floor(Math.random() * 6);

			dog.vaccines = shuffledVaccines.slice(0, randomLength);
			dog.medicaments = shuffledMedicaments.slice(0, randomLength);
			dog.diseases = shuffledDiseases.slice(0, randomLength);
			await dog.save();

			user.dog = dog;
			
			await user.save();
			return user;
		})
		.createMany(5)
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

		const dog = await factory(Dog)().create();
		dog.vaccines = vaccines.slice(0, 4);
		dog.medicaments = medicaments.slice(0, 4);
		dog.diseases = diseases.slice(0, 4);
		await dog.save();

		user.dog = dog;
		await user.save();
  }
}