import { Entity, Property, OneToMany, Collection } from '@mikro-orm/core';
import { ClassYearEntity } from './class-year.entity';
import { CampusEntity } from './campus.entity';
import { BaseEntity, Campus, ClassYear, School, SchoolResponse } from '@campuscalendar/shared/api-interfaces';

@Entity()
export class SchoolEntity extends BaseEntity implements School {

  @Property()
  name!: string;

  @OneToMany(() => CampusEntity, campus => campus.school)
  private _campuses = new Collection<CampusEntity>(this);

  @OneToMany(() => ClassYearEntity, classYear => classYear.school)
  private _classYears = new Collection<ClassYearEntity>(this);

  // Adapter methods
  get campuses(): Campus[] {
    return this._campuses.toArray();
  }

  set campuses(campuses: CampusEntity[]) {
    this._campuses.set(campuses);
  }

  get classYears(): ClassYear[] {
    return this._classYears.toArray();
  }

  set classYears(classYears: ClassYearEntity[]) {
    this._classYears.set(classYears);
  }

  toResponse(): SchoolResponse {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      name: this.name,
      campuses: this._campuses.toArray(),
      classYears: this._classYears.toArray()
    };
  }

}