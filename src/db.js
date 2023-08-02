import { TypeOrmModule } from "@nestjs/typeorm";

export const dbConnection = TypeOrmModule.forRoot({
  type: "sqlite",
  database: "db.sqlite",
  entities: [],
  synchronize: true
});