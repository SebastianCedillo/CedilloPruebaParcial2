import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IReserva } from '../Interfaces/reservas';  // Update the import path and interface
import { ReservasService } from '../Services/reservas.service';  // Update to the reservation service
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',  // Changed selector to reflect reservations
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './reservas.component.html',  // Update the template path if needed
  styleUrls: ['./reservas.component.scss']  // Update the style path if needed
})
export class ReservasComponent implements OnInit {
  listaReservas: IReserva[] = [];  // Updated variable name

  constructor(private reservasServicio: ReservasService) {}  // Update to reservation service

  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.reservasServicio.todos().subscribe((data) => {
      console.log(data);
      this.listaReservas = data;  // Update variable assignment
    });
  }

  eliminar(reserva_id: number) {  // Updated parameter name
    Swal.fire({
      title: 'Reservas',
      text: '¿Está seguro de que desea eliminar la reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Reserva'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservasServicio.eliminar(reserva_id).subscribe(() => {
          Swal.fire('Reservas', 'La reserva ha sido eliminada.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
