import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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