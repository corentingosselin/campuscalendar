import { Entity, Property, ManyToOne, Collection, OneToMany } from '@mikro-orm/core';
import { SchoolEntity } from './school.entity';
import { SubjectEntity } from './subject.entity';
import { BaseEntity, ClassYear, Subject } from '@campuscalendar/shared/api-interfaces';

@Entity()
export class ClassYearEntity extends BaseEntity implements ClassYear {

  @Property()
  name!: string;

  @ManyToOne(() => SchoolEntity)
  school!: SchoolEntity;

  @OneToMany(() => SubjectEntity, subject => subject.classYear)
  private _subjects = new Collection<SubjectEntity>(this);

  // Adapter methods
  get subjects(): Subject[] {
    return this._subjects.toArray();
  }

  set subjects(subjects: SubjectEntity[]) {
    this._subjects.set(subjects);
  }

}