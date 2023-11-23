import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class SchoolService {
  private http = inject(HttpClient);

  fetchHolidays() {
    return this.http.get<any>(apiUrl).pipe(
      map((data) => {
        return Object.keys(data).map((key) => ({
          name: data[key] as string,
          date: key,
        }) as School);
      })
    );
  }
}
