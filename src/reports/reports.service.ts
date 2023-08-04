import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReport } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { User } from "../users/user.entity"
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
}
