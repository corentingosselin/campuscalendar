import { Injectable } from '@angular/core';
import { UserSessionResponse } from '@campuscalendar/shared/api-interfaces';
//import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  saveUserSession(session: UserSessionResponse) {
    localStorage.setItem('userSession', JSON.stringify(session));
  }

  getUserSession() {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  }

  isUserLoggedIn() {
   /* const session = this.getUserSession();
    if (session && session.token) {
      const decodedToken = jwt_decode.jwtDecode<JwtUserSession>(session.token);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      return decodedToken.exp > currentTime;
    }
    return false;*/
    return false
  }

}
