import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IReserva } from '../Interfaces/ireserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  apiurl = 'http://localhost/hoteles/hotel/controllers/reservas.controller.php?op='; 
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<IReserva> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IReserva>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<IReserva[]> {
    return this.lector.get<IReserva[]>(this.apiurl + 'todos');
  }

  uno(reserva_id: number): Observable<IReserva> {
    const formData = new FormData();
    formData.append('reserva_id', reserva_id.toString());
    return this.lector.post<IReserva>(this.apiurl + 'uno', formData);
  }

  eliminar(reserva_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('reserva_id', reserva_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(reserva: IReserva): Observable<string> {
    const formData = new FormData();
    formData.append('huesped_id', reserva.huesped_id.toString());
    formData.append('habitacion_id', reserva.habitacion_id.toString());
    formData.append('fecha_reserva', reserva.fecha_reserva);
    formData.append('fecha_entrada', reserva.fecha_entrada);
    formData.append('fecha_salida', reserva.fecha_salida);
    formData.append('estado', reserva.estado);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(reserva: IReserva): Observable<string> {
    const formData = new FormData();
    formData.append('reserva_id', reserva.reserva_id.toString());
    formData.append('huesped_id', reserva.huesped_id.toString());
    formData.append('habitacion_id', reserva.habitacion_id.toString());
    formData.append('fecha_reserva', reserva.fecha_reserva);
    formData.append('fecha_entrada', reserva.fecha_entrada);
    formData.append('fecha_salida', reserva.fecha_salida);
    formData.append('estado', reserva.estado);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
