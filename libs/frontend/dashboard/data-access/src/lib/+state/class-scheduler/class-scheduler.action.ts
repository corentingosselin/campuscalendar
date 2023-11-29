import { ClassSchedulerInfo } from "@campuscalendar/shared/api-interfaces";


export class FetchClassScheduler {
  static readonly type = '[ClassScheduler] fetch class';
}

export class AddClassScheduler {
  static readonly type = '[ClassScheduler] add class';
  constructor(public payload: ClassSchedulerInfo) {}
}

export class RemoveClassScheduler {
  static readonly type = '[ClassScheduler] remove class';
  constructor(public id: string) {} 
}