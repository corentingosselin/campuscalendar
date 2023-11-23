import { Holiday } from "./calendar-dates.model";

export class SetHolidays {
  static readonly type = '[Calendar / Holidays] set holidays';
  constructor(public payload: Holiday[]) {}
}

export class FetchHolidays {
  static readonly type = '[Calendar / Holidays] Fetch Holidays';
}