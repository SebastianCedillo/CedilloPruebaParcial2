import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservasService } from 'src/app/Services/reservas.service';  // Update to reservation service
import { IReserva } from 'src/app/Interfaces/reservas';  // Update to reservation interface
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevareserva',  // Updated selector
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevareserva.component.html',  // Update the template path if needed
  styleUrls: ['./nuevareserva.component.scss']  // Update the style path if needed
})
export class NuevaReservaComponent implements OnInit {
  frm_Reserva = new FormGroup({
    huesped_id: new FormControl('', Validators.required),
    habitacion_id: new FormControl('', Validators.required),
    fecha_reserva: new FormControl('', Validators.required),
    fecha_entrada: new FormControl('', Validators.required),
    fecha_salida: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });
  idReserva = 0;
  titulo = 'Nueva Reserva';

  constructor(
    private reservasServicio: ReservasService,  // Update to reservation service
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idReserva = parseInt(this.ruta.snapshot.paramMap.get('idReserva') || '0');  // Update paramMap key
    if (this.idReserva > 0) {
      this.reservasServicio.uno(this.idReserva).subscribe((unaReserva) => {
        this.frm_Reserva.controls['huesped_id'].setValue(unaReserva.huesped_id);
        this.frm_Reserva.controls['habitacion_id'].setValue(unaReserva.habitacion_id);
        this.frm_Reserva.controls['fecha_reserva'].setValue(unaReserva.fecha_reserva);
        this.frm_Reserva.controls['fecha_entrada'].setValue(unaReserva.fecha_entrada);
        this.frm_Reserva.controls['fecha_salida'].setValue(unaReserva.fecha_salida);
        this.frm_Reserva.controls['estado'].setValue(unaReserva.estado);

        this.titulo = 'Editar Reserva';  // Update title for editing
      });
    }
  }

  grabar() {
    let reserva: IReserva = {
      reserva_id: this.idReserva,
      huesped_id: this.frm_Reserva.controls['huesped_id'].value,
      habitacion_id: this.frm_Reserva.controls['habitacion_id'].value,
      fecha_reserva: this.frm_Reserva.controls['fecha_reserva'].value,
      fecha_entrada: this.frm_Reserva.controls['fecha_entrada'].value,
      fecha_salida: this.frm_Reserva.controls['fecha_salida'].value,
      estado: this.frm_Reserva.controls['estado'].value
    };

    Swal.fire({
      title: 'Reservas',
      text: 'Desea guardar la reserva para el huésped con ID ' + this.frm_Reserva.controls['huesped_id'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idReserva > 0) {
          this.reservasServicio.actualizar(reserva).subscribe((res: any) => {
            Swal.fire({
              title: 'Reservas',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/reservas']);  // Update navigation path
          });
        } else {
          this.reservasServicio.insertar(reserva).subscribe((res: any) => {
            Swal.fire({
              title: 'Reservas',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegacion.navigate(['/reservas']);  // Update navigation path
          });
        }
      }
    });
  }
}
