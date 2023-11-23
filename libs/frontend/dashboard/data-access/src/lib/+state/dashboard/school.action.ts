import { School } from "@campuscalendar/shared/api-interfaces";

export class SetSchoolInformations {
  static readonly type = '[School] set infos';
  constructor(public payload: School) {}
}

export class FetchSchoolInformations {
  static readonly type = '[School] Fetch infos';
}