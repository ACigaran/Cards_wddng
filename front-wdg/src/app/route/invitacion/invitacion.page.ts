import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvitacionService } from '../../services/invitacion-service';

@Component({
  selector: 'app-invitacion',
  standalone: true,
  imports: [],
  templateUrl: './invitacion.page.html',
  styleUrl: './invitacion.page.css',
})
export class InvitacionPage implements OnInit{
  private route = inject(ActivatedRoute);
  private invitacionService = inject(InvitacionService);
  private cd = inject(ChangeDetectorRef);

  invitado: any;

  mostrarDetalle = false;

  ngOnInit(): void {

    const codigo =
      this.route.snapshot.paramMap.get(
        'codigo'
      );
    
    if(!codigo) return;

    this.invitacionService
      .getByCode(codigo)
      .subscribe({
        next: (data) => {
          this.invitado = data;
          this.cd.detectChanges();
        }
      });
  }

  abrirInvitacion() {
    this.mostrarDetalle = true;
  }

  confirmar() {
    this.invitacionService.confirm(
        this.invitado.codigo,
        {
            estado: 'confirmado',
            cant_personas: this.invitado.cant_personas,
            detalle: ''
        }
    ).subscribe((data: any) => {
        this.invitado = {
          ...this.invitado,
          estado: 'confirmado'
        };
        this.cd.detectChanges();
    });
  }

  rechazar() {
    this.invitacionService.confirm(
        this.invitado.codigo,
        {
            estado: 'rechazado',
            cant_personas: this.invitado.cant_personas,
            detalle: ''
        }
    ).subscribe((data: any) => {
        this.invitado = {
          ...this.invitado,
          estado: 'rechazado'
        };
        this.cd.detectChanges();
    });
  }

}
