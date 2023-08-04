import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
@Entity()
export class Report {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prize: number;

  @Column()
  make: string;

  @Column()
  modal: string;

  @Column()
  year: number;

  @Column()
  long: string;

  @Column()
  lat: string;

  @Column()
  milage: number;

  @ManyToOne(() => User, (user: User) => user.reports)
  user: User;

  @Column({ default: false })
  approved: boolean
}