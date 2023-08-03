import { TypeOrmModule } from '@nestjs/typeorm';
import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    // setting up env file using @nestjs/config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (config: ConfigService) =>{
        console.log("DB ::", config.get<string>("DB_NAME"));
        console.log("ENV ::", process.env.NODE_ENV);
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
          entities: [Report, User],
          synchronize: true
        }
      }
    }),
    // TypeOrmModule.forRoot({
    //   type: "sqlite",
    //   database: "db.sqlite",
    //   entities: [Report, User],
    //   synchronize: true
    // }),
    UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
