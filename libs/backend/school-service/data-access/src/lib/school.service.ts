import {
  ClassSchedulerDto,
  ClassSchedulerResponse,
  SchoolConfigurationDto,
  Subject,
} from '@campuscalendar/shared/api-interfaces';
import { CreateRequestContext, MikroORM, wrap } from '@mikro-orm/core';
import { HttpException, Injectable } from '@nestjs/common';
import { SchoolEntity } from './entities/school.entity';
import { ClassYearEntity } from './entities/class-year.entity';
import { SubjectEntity } from './entities/subject.entity';
import { CampusEntity } from './entities/campus.entity';
import { ClassSchedulerEntity } from './entities/class-scheduler.entity';
import { SubjectEventEntity } from './entities/subject-event.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SchoolService {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async getSchool() {
    const result = await this.orm.em.find(SchoolEntity, {});
    const school = wrap(result[0]).toObject();

    const campusesResult = await this.orm.em.find(CampusEntity, {
      school: school,
    });
    const classYearsResult = await this.orm.em.find(ClassYearEntity, {
      school: school,
    });
    const campuses = campusesResult.map((campus) => wrap(campus).toObject());

    let classYears = await Promise.all(
      classYearsResult.map(async (classYear) => {
        const classYearObject = wrap(classYear).toObject();

        const subjectsResult = await this.orm.em.find(SubjectEntity, {
          classYear: classYear.id,
        });
        classYearObject.subjects = subjectsResult.map((subject) =>
          wrap(subject).toObject()
        );

        return classYearObject;
      })
    );

    // Sort classYears by name
    classYears = classYears.sort((a, b) => a.name.localeCompare(b.name));

    school.classYears = classYears;
    school.campuses = campuses;

    return school;
  }

  @CreateRequestContext()
  async isSchoolConfigured() {
    const school = await this.orm.em.getRepository(SchoolEntity).findAll();
    return school.length === 1;
  }

  @CreateRequestContext()
  async registerSchool(schoolConfigDto: SchoolConfigurationDto) {
    try {
      const schoolEntity = new SchoolEntity();
      schoolEntity.name = schoolConfigDto.school.name;

      // Process and add class years
      for (const classYearDto of schoolConfigDto.school.classYears) {
        const classYearEntity = new ClassYearEntity();
        classYearEntity.name = classYearDto.name;
        classYearEntity.school = schoolEntity;

        // Process and add subjects to class year
        for (const subjectName of classYearDto.subjects) {
          const subjectEntity = new SubjectEntity();
          subjectEntity.name = subjectName;
          subjectEntity.classYear = classYearEntity;
          classYearEntity.subjects.push(subjectEntity);
        }

        schoolEntity.classYears.push(classYearEntity);
      }

      // Process and add campuses
      for (const campusName of schoolConfigDto.campus) {
        const campusEntity = new CampusEntity();
        campusEntity.name = campusName;
        campusEntity.school = schoolEntity;
        schoolEntity.campuses.push(campusEntity);
      }

      await this.orm.em.persist(schoolEntity).flush();
    } catch (error) {
      console.error('Error registering school:', error);
      return false;
    }

    return true;
  }

  @CreateRequestContext()
  getClassSchedulers() {
    return this.orm.em.find(ClassSchedulerEntity, {});
  }

  @CreateRequestContext()
  getClassScheduler(id: string) {
    return this.orm.em.findOneOrFail(ClassSchedulerEntity, { id: id });
  }

  @CreateRequestContext()
  async registerClassScheduler(classSchedulerDto: ClassSchedulerDto) {
    const classSchedulerEntity = new ClassSchedulerEntity();
    classSchedulerEntity.name = classSchedulerDto.name;
    classSchedulerEntity.startDate = new Date(
      classSchedulerDto.calendar.startDate
    );
    classSchedulerEntity.endDate = new Date(classSchedulerDto.calendar.endDate);
    classSchedulerEntity.availableDates =
      classSchedulerDto.calendar.availableDates.map((date) => new Date(date));
    classSchedulerEntity.campusId = classSchedulerDto.campusId;
    classSchedulerEntity.schoolId = classSchedulerDto.schoolId;

    let classSchedulerResponse: ClassSchedulerResponse | undefined = undefined;

    // Use a transaction to ensure all operations are successful
    await this.orm.em.transactional(async (em) => {
      for (const subjectEventDto of classSchedulerDto.calendar.subjectEvents) {
        const subjectEventEntity = new SubjectEventEntity();
        subjectEventEntity.date = new Date(subjectEventDto.date);
        subjectEventEntity.startTime = subjectEventDto.startTime;
        subjectEventEntity.endTime = subjectEventDto.endTime;
        subjectEventEntity.subjectId = subjectEventDto.subjectId;
        classSchedulerEntity.subjectEvents.add(subjectEventEntity);
      }
      em.persist(classSchedulerEntity);

      const campusEntity = await em.findOneOrFail(CampusEntity, {
        id: classSchedulerEntity.campusId,
      });
      const schoolEntity = await em.findOneOrFail(SchoolEntity, {
        id: classSchedulerEntity.schoolId,
      });

      const subjectsEvents = await Promise.all(
        classSchedulerEntity.subjectEvents
          .getItems()
          .map(async (subjectEvent) => {
            const subjectEntity = await em.findOneOrFail(SubjectEntity, {
              id: subjectEvent.subjectId,
            });
            return { ...subjectEvent, subject: subjectEntity };
          })
      );

      classSchedulerResponse = {
        id: classSchedulerEntity.id,
        created_at: classSchedulerEntity.created_at,
        updated_at: classSchedulerEntity.updated_at,
        name: classSchedulerEntity.name,
        campusName: campusEntity.name,
        schoolName: schoolEntity.name,
        calendar: {
          startDate: classSchedulerEntity.startDate,
          endDate: classSchedulerEntity.endDate,
          availableDates: classSchedulerEntity.availableDates,
          subjectEvents: subjectsEvents,
        },
      };
    });
    if(!classSchedulerResponse) throw new RpcException(new HttpException('Error registering class scheduler', 500));
    return classSchedulerResponse;

  }
}
