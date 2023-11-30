import { SchoolService } from '@campuscalendar/backend/api-gateway/data-access';
import { JwtAuthGuard, SchoolExistGuard } from '@campuscalendar/backend/api-gateway/utils';
import { ClassSchedulerDto, SetupSchoolDto } from '@campuscalendar/shared/api-interfaces';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

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
  getClassScheduler(@Param('id') id: string) {
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

  @UseGuards(JwtAuthGuard)
  @Post('share/:id')
  shareCalendar(@Param('id') id: string) {
    return this.schoolService.shareCalendar(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('share/:id')
  getSharedCalendar(@Param('id') id: string) {
    return this.schoolService.getSharedCalendar(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('share/:id/toggle')
  toggleSharedCalendar(@Param('id') id: string) {
    console.log('toggleSharedCalendar', id);
    return this.schoolService.toggleSharedCalendar(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('share/:id/new-hash')
  generateSharedCalendarNewHash(@Param('id') id: string) {
    return this.schoolService.generateSharedCalendarNewHash(id);
  }


  @Get('calendar/:hash')
  getSharedCalendarByHash(@Param('hash') hash: string) {
    return this.schoolService.getSharedCalendarByHash(hash);
  }

}
