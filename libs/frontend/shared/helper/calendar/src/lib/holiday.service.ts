import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Holiday } from './+state/calendar-dates.model';

const apiUrl = 'https://calendrier.api.gouv.fr/jours-feries/metropole.json';

@Injectable({ providedIn: 'root' })
export class HolidayService {
  private http = inject(HttpClient);

  fetchHolidays() {
    return this.http.get<any>(apiUrl).pipe(
      map((data) => {
        return Object.keys(data).map((key) => ({
          name: data[key] as string,
          date: key,
        }) as Holiday);
      })
    );
  }
}
