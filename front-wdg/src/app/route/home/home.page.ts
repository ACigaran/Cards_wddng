import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ RouterLink ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {

  texto = "Haz clic aquí para ver la invitación";
  letras: { letra: string, rotacion: number }[] = [];

  ngOnInit() {

    const grados = 360 / this.texto.length;

    this.letras = this.texto.split('').map((letra, i) => ({
        letra,
        rotacion: i * grados
    }));
  }

}