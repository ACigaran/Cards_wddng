import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class InvitacionService {

    private http = inject(HttpClient);

    private api =
        'http://localhost:6200/invitacion';

    getByCode(codigo: string) {
        return this.http.get(
            `${this.api}/${codigo}`
        );
    }

    confirm(
        codigo: string,
        body: any
    ) {
        return this.http.patch(
            `${this.api}/${codigo}`,
            body
        );
    }
}