import {
  ClassSchedulerDto,
  ClassSchedulerInfoResponse,
  ClassSchedulerResponse,
  DuplicateClassSchedulerDto,
  SchoolConfigurationDto,
  SubjectEvent,
} from '@campuscalendar/shared/api-interfaces';
import { CreateRequestContext, MikroORM, wrap } from '@mikro-orm/core';
import { HttpException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CampusEntity } from './entities/campus.entity';
import { ClassSchedulerEntity } from './entities/class-scheduler.entity';
import { ClassYearEntity } from './entities/class-year.entity';
import { SchoolEntity } from './entities/school.entity';
import { SubjectEventEntity } from './entities/subject-event.entity';
import { SubjectEntity } from './entities/subject.entity';
import { SharedCalendarEntity } from './entities/shared-calendar.entity';

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
  async getClassSchedulers() {
    const classSchedulerEntities = await this.orm.em.find(
      ClassSchedulerEntity,
      {}
    );

    const classInfos = classSchedulerEntities.map((classSchedulerEntity) => {
      return {
        id: classSchedulerEntity.id,
        name: classSchedulerEntity.name,
        campusId: classSchedulerEntity.campusId,
        schoolId: classSchedulerEntity.schoolId,
        classYearId: classSchedulerEntity.classYearId,
      } as ClassSchedulerInfoResponse;
    });
    return classInfos;
  }

  @CreateRequestContext()
  async getClassScheduler(id: string) {
    const classSchedulerEntity = await this.orm.em.findOneOrFail(
      ClassSchedulerEntity,
      { id: id },
      { populate: ['subjectEvents'] }
    );
    const campusEntity = await this.orm.em.findOneOrFail(CampusEntity, {
      id: classSchedulerEntity.campusId,
    });

    const schoolEntity = await this.orm.em.findOneOrFail(SchoolEntity, {
      id: classSchedulerEntity.schoolId,
    });

    const classYearEntity = await this.orm.em.findOneOrFail(ClassYearEntity, {
      id: classSchedulerEntity.classYearId,
    });

    const subjectsEventsPromises = classSchedulerEntity.subjectEvents
      .getItems()
      .map(async (subjectEventEntity) => {
        const subjectEntity = await this.orm.em.findOneOrFail(SubjectEntity, {
          id: subjectEventEntity.subjectId,
        });

        return {
          id: subjectEventEntity.id,
          date: subjectEventEntity.date,
          startTime: subjectEventEntity.startTime,
          endTime: subjectEventEntity.endTime,
          subject: subjectEntity,
        };
      });

    const subjectsEvents: SubjectEvent[] = await Promise.all(
      subjectsEventsPromises
    );

    return {
      id: classSchedulerEntity.id,
      created_at: classSchedulerEntity.created_at,
      updated_at: classSchedulerEntity.updated_at,
      name: classSchedulerEntity.name,
      campusName: campusEntity.name,
      schoolName: schoolEntity.name,
      classYearName: classYearEntity.name,
      calendar: {
        startDate: classSchedulerEntity.startDate,
        endDate: classSchedulerEntity.endDate,
        availableDates: classSchedulerEntity.availableDates,
        subjectEvents: subjectsEvents,
      },
    } as ClassSchedulerResponse;
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
      classSchedulerDto.calendar.availableDates;

    classSchedulerEntity.campusId = classSchedulerDto.campusId;
    classSchedulerEntity.schoolId = classSchedulerDto.schoolId;
    classSchedulerEntity.classYearId = classSchedulerDto.classYearId;

    //check if campus id and class year id are valid
    const campusEntity = await this.orm.em.findOne(CampusEntity, {
      id: classSchedulerDto.campusId,
    });
    if (!campusEntity) {
      throw new RpcException(new HttpException('Campus not found', 404));
    }
    const classYearEntity = await this.orm.em.findOne(ClassYearEntity, {
      id: classSchedulerDto.classYearId,
    });
    if (!classYearEntity) {
      throw new RpcException(new HttpException('Class year not found', 404));
    }

    let classSchedulerResponse: ClassSchedulerInfoResponse | undefined =
      undefined;

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

      classSchedulerResponse = {
        id: classSchedulerEntity.id,
        created_at: classSchedulerEntity.created_at,
        updated_at: classSchedulerEntity.updated_at,
        name: classSchedulerEntity.name,
        campusName: campusEntity.name,
        classYearName: ClassYearEntity.name,
        campusId: classSchedulerEntity.campusId,
        schoolId: classSchedulerEntity.schoolId,
        classYearId: classSchedulerEntity.classYearId,
      };
    });
    if (!classSchedulerResponse)
      throw new RpcException(
        new HttpException('Error registering class scheduler', 500)
      );
    return classSchedulerResponse as ClassSchedulerInfoResponse;
  }

  @CreateRequestContext()
  async shareCalendar(id: string) {
    //check if shared calendar already exists
    const sharedCalendarEntity = await this.orm.em.findOne(
      SharedCalendarEntity,
      { classSchedulerId: id }
    );
    if (sharedCalendarEntity) {
      return {
        hash: sharedCalendarEntity.hash,
        enabled: sharedCalendarEntity.enabled,
      };
    }
    //create shared calendar
    const sharedCalendar = new SharedCalendarEntity();
    sharedCalendar.classSchedulerId = id;
    sharedCalendar.enabled = true;
    sharedCalendar.hash = this.generateHash();
    await this.orm.em.persist(sharedCalendar).flush();
    return {
      hash: sharedCalendar.hash,
      enabled: sharedCalendar.enabled,
    };
  }

  @CreateRequestContext()
  async getSharedCalendar(id: string) {
    const sharedCalendarEntity = await this.orm.em.findOne(
      SharedCalendarEntity,
      { classSchedulerId: id }
    );
    if (!sharedCalendarEntity) {
      throw new RpcException(
        new HttpException('Shared calendar not found', 404)
      );
    }
    return {
      hash: sharedCalendarEntity.hash,
      enabled: sharedCalendarEntity.enabled,
    };
  }

  @CreateRequestContext()
  async getSharedCalendarByHash(hash: string) {
    const sharedCalendarEntity = await this.orm.em.findOne(
      SharedCalendarEntity,
      { hash: hash }
    );
    if (!sharedCalendarEntity) {
      throw new RpcException(
        new HttpException('Shared calendar not found', 404)
      );
    }
    // get class scheduler
    return this.getClassScheduler(sharedCalendarEntity.classSchedulerId);
  }

  @CreateRequestContext()
  async toggleSharedCalendar(id: string) {
    const sharedCalendarEntity = await this.orm.em.findOne(
      SharedCalendarEntity,
      { classSchedulerId: id }
    );
    if (!sharedCalendarEntity) {
      //check if classscheduler exists
      const classSchedulerEntity = await this.orm.em.findOne(
        ClassSchedulerEntity,
        { id: id }
      );
      if (!classSchedulerEntity) {
        throw new RpcException(
          new HttpException('Class scheduler not found', 404)
        );
      }
      //create shared calendar
      const sharedCalendar = new SharedCalendarEntity();
      console.log('id', id);
      sharedCalendar.classSchedulerId = id;
      sharedCalendar.enabled = true;
      sharedCalendar.hash = this.generateHash();
      await this.orm.em.persist(sharedCalendar).flush();
      return {
        hash: sharedCalendar.hash,
        enabled: sharedCalendar.enabled,
      };
    }
    sharedCalendarEntity.enabled = !sharedCalendarEntity.enabled;
    await this.orm.em.persist(sharedCalendarEntity).flush();
    return {
      hash: sharedCalendarEntity.hash,
      enabled: sharedCalendarEntity.enabled,
    };
  }

  @CreateRequestContext()
  async generateNewHash(id: string) {
    const sharedCalendarEntity = await this.orm.em.findOne(
      SharedCalendarEntity,
      { classSchedulerId: id }
    );
    if (!sharedCalendarEntity) {
      throw new RpcException(
        new HttpException('Shared calendar not found', 404)
      );
    }
    sharedCalendarEntity.hash = this.generateHash();
    await this.orm.em.persist(sharedCalendarEntity).flush();
    return {
      hash: sharedCalendarEntity.hash,
      enabled: sharedCalendarEntity.enabled,
    };
  }

  async deleteClassScheduler(id: string) {
    const result = await this.orm.em.nativeDelete(ClassSchedulerEntity, {
      id: id,
    });
    return result === 1;
  }

  private generateHash() {
    // generate hash of random letters and numbers
    const hash = Math.random().toString(16).substring(2, 15);
    return hash;
  }

  async duplicateClassScheduler(duplicateDto: DuplicateClassSchedulerDto) {
    const classSchedulerEntity = await this.orm.em.findOneOrFail(
      ClassSchedulerEntity,
      { id: duplicateDto.classSchedulerId },
      { populate: ['subjectEvents'] }
    );
    //check if campus id and class year id are valid
    const campusEntity = await this.orm.em.findOne(CampusEntity, {
      id: duplicateDto.campusId,
    });
    if (!campusEntity) {
      throw new RpcException(new HttpException('Campus not found', 404));
    }
    const classYearEntity = await this.orm.em.findOne(ClassYearEntity, {
      id: duplicateDto.classYearId,
    });
    if (!classYearEntity) {
      throw new RpcException(new HttpException('Class year not found', 404));
    }

    const classSchedulerEntityDuplicate = new ClassSchedulerEntity();
    classSchedulerEntityDuplicate.name = duplicateDto.name;
    classSchedulerEntityDuplicate.startDate = classSchedulerEntity.startDate;
    classSchedulerEntityDuplicate.endDate = classSchedulerEntity.endDate;
    classSchedulerEntityDuplicate.availableDates =
      classSchedulerEntity.availableDates;

    classSchedulerEntityDuplicate.campusId = duplicateDto.campusId;
    classSchedulerEntityDuplicate.schoolId = duplicateDto.schoolId;
    classSchedulerEntityDuplicate.classYearId = duplicateDto.classYearId;
    classSchedulerEntityDuplicate.subjectEvents =
      classSchedulerEntity.subjectEvents;

    // Use a transaction to ensure all operations are successful
    await this.orm.em.transactional(async (em) => {
      em.persist(classSchedulerEntityDuplicate);
    });

    return {
      id: classSchedulerEntityDuplicate.id,
      created_at: classSchedulerEntityDuplicate.created_at,
      updated_at: classSchedulerEntityDuplicate.updated_at,
      name: classSchedulerEntityDuplicate.name,
      campusName: campusEntity.name,
      classYearName: ClassYearEntity.name,
      campusId: classSchedulerEntityDuplicate.campusId,
      schoolId: classSchedulerEntityDuplicate.schoolId,
      classYearId: classSchedulerEntityDuplicate.classYearId,
    } as ClassSchedulerInfoResponse;
  }
}
