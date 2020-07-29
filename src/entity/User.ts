import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Length } from "class-validator";
import { UserRole } from "../types/user";
import { Notification } from "./Notification";
import { Dog } from "./Dog";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(8, 100)
  password: string;

  @CreateDateColumn({ type: "timestamp", default: new Date() })
  createdAt: Date;

  @Column()
  @Length(5, 30)
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(type => Notification, notification => notification.user)
  notifications?: Notification[];

  @OneToOne(type => Dog, dog => dog.owner)
  dog: Dog;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}