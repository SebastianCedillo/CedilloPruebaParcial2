import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { HabitacionesService } from 'src/app/Services/habitaciones.service';
import { IHabitacion } from 'src/app/Interfaces/ihabitacion';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevahabitacion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevahabitacion.component.html',
  styleUrls: ['./nuevahabitacion.component.scss']
})
export class NuevaHabitacionComponent implements OnInit {
  frm_Habitacion = new FormGroup({
    numero: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    disponible: new FormControl('', Validators.required)
  });
  idHabitacion = 0;
  titulo = 'Nueva Habitación';

  constructor(
    private habitacionesServicio: HabitacionesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idHabitacion = parseInt(this.ruta.snapshot.paramMap.get('idHabitacion'));
    if (this.idHabitacion > 0) {
      this.habitacionesServicio.uno(this.idHabitacion).subscribe((unaHabitacion) => {
        this.frm_Habitacion.controls['numero'].setValue(unaHabitacion.numero);
        this.frm_Habitacion.controls['tipo'].setValue(unaHabitacion.tipo);
        this.frm_Habitacion.controls['precio'].setValue(unaHabitacion.precio);
        this.frm_Habitacion.controls['disponible'].setValue(unaHabitacion.disponible);

        this.titulo = 'Editar Habitación';
      });
    }
  }

  grabar() {
    let habitacion: IHabitacion = {
      idHabitacion: this.idHabitacion,
      numero: this.frm_Habitacion.controls['numero'].value,
      tipo: this.frm_Habitacion.controls['tipo'].value,
      precio: this.frm_Habitacion.controls['precio'].value,
      disponible: this.frm_Habitacion.controls['disponible'].value
    };

    Swal.fire({
      title: 'Habitaciones',
      text: 'Desea guardar la habitación ' + this.frm_Habitacion.controls['numero'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idHabitacion > 0) {
          this.habitacionesServicio.actualizar(habitacion).subscribe((res: any) => {
            Swal.fire({
              title: 'Habitaciones',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/habitaciones']);
          });
        } else {
          this.habitacionesServicio.insertar(habitacion).subscribe((res: any) => {
            Swal.fire({
              title: 'Habitaciones',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/habitaciones']);
          });
        }
      }
    });
  }
}
