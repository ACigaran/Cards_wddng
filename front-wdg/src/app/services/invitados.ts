import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class Invitados {
  private http = inject(HttpClient);
  private api = `${environment.apiUrl}/invitados`

  getAll() {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(
      this.api,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  delete(id: number) {
    const token = localStorage.getItem('token');

    return this.http.delete(
      `${this.api}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  create(body: any) {
    const token = localStorage.getItem('token');

    return this.http.post(
      this.api,
      body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  update(
    id: number,
    body: any
  ) {
    const token = localStorage.getItem('token');
    
    return this.http.put(
      `${this.api}/${id}`,
      body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}
