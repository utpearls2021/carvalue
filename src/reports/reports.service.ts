import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReport } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from "../users/user.entity"
import { GetEstimate } from './dtos/get-estimate.dto';
@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDto: createReport, userData: User) {
    const report = this.repo.create(reportDto);
    report.user = userData;
    return this.repo.save(report);
  }

  async approve(id: any) {
    const report = await this.repo.findOneBy(id);
    report.approved = true;
    return await this.repo.save(report);
  }

  async createEstimate({ make, modal, lat, long, year, milage }: GetEstimate) {
    return this.repo.createQueryBuilder()
    .select("AVG(prize)", "prize")
    .where("make = :make ", { make })
    .andWhere("modal = :modal", { modal })
    .andWhere("lat - :lat BETWEEN -5 AND 5", { lat })
    .andWhere("long - :long BETWEEN -5 AND 5", { long })
    .andWhere("year - :year BETWEEN -3 AND 3", { year })
    .orderBy("ABS(milage - :milage)")
    .setParameters({ milage })
    .getRawOne();
  }
}
