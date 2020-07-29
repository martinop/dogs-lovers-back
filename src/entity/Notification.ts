import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, BaseEntity} from "typeorm";
import { Length } from "class-validator";
import {User} from "./User";

@Entity()
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @Length(5, 50)
  title: string;

  @Column({ nullable: true })
  @Length(0, 100)
  description: string;

  @Column({ default: false })
  read: boolean;

  @Column({ default: new Date()})
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => User, user => user.notifications, {cascade: true, onDelete: 'CASCADE'})
  user: User;
}