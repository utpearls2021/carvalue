import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "src/reports/report.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report: Report) => report.user)
  reports: Report[];

  @Column({ default: true})
  admin: boolean;

  @AfterInsert()
  logAfterInsert() {
    console.log("Insert user with id " + this.id);
  }

  @AfterUpdate()
  logAfterUpdate() {
    console.log("Update user with id " + this.id);
  }

  @AfterRemove()
  logAfterRemove() {
    console.log("Remove user with id " + this.id);
  }
}