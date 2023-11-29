import { ClassScheduler } from "@campuscalendar/shared/api-interfaces";

export class AddClassScheduler {
  static readonly type = '[ClassScheduler] add class';
  constructor(public payload: ClassScheduler) {}
}

export class RemoveClassScheduler {
  static readonly type = '[ClassScheduler] remove class';
  constructor(public id: string) {} 
}