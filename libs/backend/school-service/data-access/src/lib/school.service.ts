import {
  SchoolConfigurationDto,
} from '@campuscalendar/shared/api-interfaces';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { SchoolEntity } from './entities/school.entity';
import { ClassYearEntity } from './entities/class-year.entity';
import { SubjectEntity } from './entities/subject.entity';
import { CampusEntity } from './entities/campus.entity';

@Injectable()
export class SchoolService {
  constructor(private readonly orm: MikroORM) {}

  @CreateRequestContext()
  async getSchool() {
    const result = await this.orm.em.getRepository(SchoolEntity).findAll();
    const school = result[0];

    const campuses = await this.orm.em.find(CampusEntity, { school: school });
    school.campuses = campuses;

    const classYears = await this.orm.em.find(ClassYearEntity, {
      school: school,
    });
    school.classYears = classYears;
    return school.toResponse();
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
}
