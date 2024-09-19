import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IHuesped } from '../Interfaces/huespedes';
import { HuespedesService } from '../Services/huespedes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-huespedes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './huespedes.component.html',
  styleUrls: ['./huespedes.component.scss']
})
export class HuespedesComponent implements OnInit {
  listahuespedes: IHuesped[] = [];

  constructor(private huespedesServicio: HuespedesService) {}

  ngOnInit() {
    this.cargatabla();
  }

  cargatabla() {
    this.huespedesServicio.todos().subscribe((data) => {
      console.log(data);
      this.listahuespedes = data;
    });
  }

  eliminar(huesped_id: number) {
    Swal.fire({
      title: 'Huéspedes',
      text: '¿Está seguro de que desea eliminar el huésped?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Huésped'
    }).then((result) => {
      if (result.isConfirmed) {
        this.huespedesServicio.eliminar(huesped_id).subscribe(() => {
          Swal.fire('Huéspedes', 'El huésped ha sido eliminado.', 'success');
          this.cargatabla();
        });
      }
    });
  }
}
