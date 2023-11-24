import { AdminAccountResponse } from "@campuscalendar/shared/api-interfaces";

export class SetAccountInformations {
  static readonly type = '[Account] set infos';
  constructor(public payload: AdminAccountResponse) {}
}

export class RemoveAccountInformations {
  static readonly type = '[Account] remove infos';
}