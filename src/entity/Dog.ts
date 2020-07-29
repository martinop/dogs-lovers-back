import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
	JoinTable,
	ManyToMany,
	OneToOne,
} from "typeorm";
import { Length } from "class-validator";
import { Disease } from "./Disease";
import { Vaccine } from "./Vaccine";
import { Medicament } from "./Medicament";
import { User } from "./User";

@Entity()
export class Dog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 50)
  name: string;

	@Column({ default: 0 })
	age: number;
	
	@ManyToMany(type => Disease)
	@JoinTable()
	diseases: Disease[];

	@ManyToMany(type => Vaccine)
	@JoinTable()
	vaccines: Vaccine[];

	@ManyToMany(type => Medicament)
	@JoinTable()
	medicaments: Medicament[];

	@OneToOne(type => User, user => user.dog)
	owner: User;
}