import { Entity } from './entity.interface';
import { ClassYear } from './school.interface';

export interface CampusConfig extends Entity {
  name: string;
  classYears: ClassYear[];
}

export interface Class extends Entity {
  name: string;
}

export interface SchoolConfig extends Entity {
  name: string;
  campus: CampusConfig[];
}
