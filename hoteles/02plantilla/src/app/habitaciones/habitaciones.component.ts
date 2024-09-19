import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IHabitacion } from '../Interfaces/habitaciones';
import { HabitacionesService } from '../Services/habitaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss']
})
export class HabitacionesComponent implements OnInit {
  listahabitaciones: IHabitacion[] = [];

  constructor(private habitacionesServicio: HabitacionesService) {}

  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.habitacionesServicio.todos().subscribe((data) => {
      console.log(data);
      this.listahabitaciones = data;
    });
  }

  eliminar(habitacion_id: number) {
    Swal.fire({
      title: 'Habitaciones',
      text: '¿Está seguro de que desea eliminar la habitación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Habitación'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitacionesServicio.eliminar(habitacion_id).subscribe(() => {
          Swal.fire('Habitaciones', 'La habitación ha sido eliminada.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
