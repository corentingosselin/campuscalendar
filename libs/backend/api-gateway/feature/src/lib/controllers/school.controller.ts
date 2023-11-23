import { SchoolService } from '@campuscalendar/backend/api-gateway/data-access';
import { JwtAuthGuard } from '@campuscalendar/backend/api-gateway/utils';
import { SetupSchoolDto } from '@campuscalendar/shared/api-interfaces';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('setup')
  setup(@Body() schoolConfigDto: SetupSchoolDto) {
    return this.schoolService.registerConfiguration(schoolConfigDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  school() {
    return this.schoolService.getSchool();
  }
}
