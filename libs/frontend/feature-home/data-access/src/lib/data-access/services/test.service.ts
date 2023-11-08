import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class TestService {
  
    test(): void {
      console.log('test');
    }
}