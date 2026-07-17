import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/auth`

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
