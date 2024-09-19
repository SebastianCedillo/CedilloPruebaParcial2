import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HuespedesService } from 'src/app/Services/huespedes.service';
import { IHuesped } from 'src/app/Interfaces/ihuesped';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevohuesped',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevohuesped.component.html',
  styleUrls: ['./nuevohuesped.component.scss']
})
export class NuevoHuespedComponent implements OnInit {
  frm_Huesped = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  idHuesped = 0;
  titulo = 'Nuevo Huésped';

  constructor(
    private huespedesServicio: HuespedesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idHuesped = parseInt(this.ruta.snapshot.paramMap.get('idHuesped') || '0');
    if (this.idHuesped > 0) {
      this.huespedesServicio.uno(this.idHuesped).subscribe((unHuesped) => {
        this.frm_Huesped.controls['nombre'].setValue(unHuesped.nombre);
        this.frm_Huesped.controls['apellido'].setValue(unHuesped.apellido);
        this.frm_Huesped.controls['telefono'].setValue(unHuesped.telefono);
        this.frm_Huesped.controls['email'].setValue(unHuesped.email);

        this.titulo = 'Editar Huésped';
      });
    }
  }

  grabar() {
    let huesped: IHuesped = {
      huesped_id: this.idHuesped,
      nombre: this.frm_Huesped.controls['nombre'].value,
      apellido: this.frm_Huesped.controls['apellido'].value,
      telefono: this.frm_Huesped.controls['telefono'].value,
      email: this.frm_Huesped.controls['email'].value
    };

    Swal.fire({
      title: 'Huéspedes',
      text: 'Desea guardar el huésped ' + this.frm_Huesped.controls['nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idHuesped > 0) {
          this.huespedesServicio.actualizar(huesped).subscribe((res: any) => {
            Swal.fire({
              title: 'Huéspedes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/huespedes']);
          });
        } else {
          this.huespedesServicio.insertar(huesped).subscribe((res: any) => {
            Swal.fire({
              title: 'Huéspedes',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/huespedes']);
          });
        }
      }
    });
  }
}
