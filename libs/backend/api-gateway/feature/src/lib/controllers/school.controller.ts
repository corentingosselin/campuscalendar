import { SchoolService } from '@campuscalendar/backend/api-gateway/data-access';
import { JwtAuthGuard, SchoolExistGuard } from '@campuscalendar/backend/api-gateway/utils';
import { ClassSchedulerDto, SetupSchoolDto } from '@campuscalendar/shared/api-interfaces';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}


  @UseGuards(SchoolExistGuard)
  @Post('setup')
  setup(@Body() schoolConfigDto: SetupSchoolDto) {
    return this.schoolService.registerConfiguration(schoolConfigDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  school() {
    return this.schoolService.getSchool();
  }

  @UseGuards(JwtAuthGuard)
  @Post('class-scheduler')
  createClassScheduler(@Body() classScheduler: ClassSchedulerDto) {
    return this.schoolService.createClassScheduler(classScheduler);
  }

  @UseGuards(JwtAuthGuard)
  @Get('class-scheduler/:id')
  getClassScheduler(id: string) {
    return this.schoolService.getClassScheduler(id);
  }

  @Get('exists')
  isSchoolConfigured() {
    return this.schoolService.isSchoolConfigured();
  }

  @UseGuards(JwtAuthGuard)
  @Get('class-scheduler')
  getClassSchedulers() {
    return this.schoolService.getClassSchedulers();
  }

}
