import { IsArray, IsDate, IsDefined, IsString } from 'class-validator';

export class CalendarClassSchedulerDto {
  @IsDate()
  startDate!: Date;
  @IsDate()
  endDate!: Date;
  @IsArray()
  availableDates!: Date[];
  @IsDefined()
  subjectEvents!: SubjectEventDto[];
}

export class ClassSchedulerDto {
  @IsString()
  name!: string;
  @IsString()
  campusId!: string;
  @IsString()
  schoolId!: string;
  @IsDefined()
  calendar!: CalendarClassSchedulerDto;
}

export class SubjectEventDto {
  @IsString()
  subjectId!: string;
  @IsDate()
  date!: Date;
  @IsString()
  startTime!: string;
  @IsString()
  endTime!: string;
}
