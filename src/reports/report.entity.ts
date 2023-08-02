import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prize: number;
}