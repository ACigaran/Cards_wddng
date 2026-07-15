import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private http = inject(HttpClient);
  private api = 'http://localhost:6200/auth'

  login(username: string, password: string) {
    return this.http.post<{token: string}>(
      this.api,
      {
        username,
        password
      }
    ).pipe(
      tap((res) => {
        localStorage.setItem(
          'token', 
          res.token
        );
      })
    );
  }

  logout(){
    localStorage.removeItem(
      'token'
    );
  }

  getToken() {
    return localStorage.getItem(
      'token'
    );
  }

  isLogged() {
    return !!this.getToken();
  }
}
