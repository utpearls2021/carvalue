import { Controller, Get, Param, Post, Body, Patch, UseGuards, Query } from '@nestjs/common';
import { createReport } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serilize } from "../interceptor/serilize.interceptor";
import { AdminGuard } from "../guards/admin.guard";
import { GetEstimate } from './dtos/get-estimate.dto';
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService){}

  @Post()
  @UseGuards(AuthGuard)
  @Serilize(ReportDto)
  createReport(@Body() body: createReport, @CurrentUser() user: User) {
    return this.reportsService.create(body, user)
  }

  @Patch("/:id")
  @UseGuards(AdminGuard)
  approveReport(@Param() id: any) {
    return this.reportsService.approve(id);
  }

  @Get()
  getEstimate(@Query() query: GetEstimate) {
    return this.reportsService.createEstimate(query);
  }

}
