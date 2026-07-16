import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Invitados } from '../../services/invitados';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage implements OnInit {
  private invitadosService = inject(Invitados);
  private cd = inject(ChangeDetectorRef);

  invitados: any[] = [];

  editando = false;
idEditando: number | null = null;

  filtro = '';
  busqueda = '';

  nuevo = {
  nombre: '',
  ciudad: '',
  cant_personas: 1,
  detalle: ''
};

editar(
  invitado: any
) {

  this.nuevo = {
    nombre: invitado.nombre,
    ciudad: invitado.ciudad,
    cant_personas: invitado.cant_personas,
    detalle: invitado.detalle
  };

  this.idEditando =
    invitado.id_invitado;

  this.editando = true;
}

guardar() {

  if(this.editando){

    this.invitadosService
      .update(
        this.idEditando!,
        this.nuevo
      )
      .subscribe(() => {
        this.cargar();
      });

    return;
  }

  this.crear();
}

crear() {
  this.invitadosService
    .create(this.nuevo)
    .subscribe({
      next: () => {

        this.nuevo = {
          nombre: '',
          ciudad: '',
          cant_personas: 1,
          detalle: ''
        };

        this.cargar();
      }
    });
}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.invitadosService
      .getAll()
      .subscribe({
        next: data => {
          this.invitados = [...data];
          this.cd.detectChanges();
        },
        error: err => {
          console.error(err);
        }
      });
  }

  eliminar(
    id: number
  ) {
    if(
      !confirm(
        'Desea eliminar el invitado?'
      )
    ){
      return;
    }

    this.invitadosService
      .delete(id)
      .subscribe(() => {
        this.cargar();
      });
  }
  get total() {
  return this.invitados.length;
}

get confirmados() {
  return this.invitados.filter(
    x => x.estado === 'confirmado'
  ).length;
}

get pendientes() {
  return this.invitados.filter(
    x => x.estado === 'pendiente'
  ).length;
}

get rechazados() {
  return this.invitados.filter(
    x => x.estado === 'rechazado'
  ).length;
}

copiar(codigo: string) {

  const url =
    `http://localhost:4200/invitacion/${codigo}`;

  navigator.clipboard.writeText(
    url
  );

  alert(
    'Link copiado'
  );
}

}
