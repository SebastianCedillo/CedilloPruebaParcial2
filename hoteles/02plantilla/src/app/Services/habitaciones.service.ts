import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IHabitacion } from '../Interfaces/ihabitacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {
  apiurl = 'http://localhost/hoteles/hotel/controllers/habitaciones.controller.php?op='; 
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<IHabitacion> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IHabitacion>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<IHabitacion[]> {
    return this.lector.get<IHabitacion[]>(this.apiurl + 'todos');
  }

  uno(habitacion_id: number): Observable<IHabitacion> {
    const formData = new FormData();
    formData.append('habitacion_id', habitacion_id.toString());
    return this.lector.post<IHabitacion>(this.apiurl + 'uno', formData);
  }

  eliminar(habitacion_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('habitacion_id', habitacion_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(habitacion: IHabitacion): Observable<string> {
    const formData = new FormData();
    formData.append('numero', habitacion.numero);
    formData.append('tipo', habitacion.tipo);
    formData.append('precio', habitacion.precio.toString());
    formData.append('disponible', habitacion.disponible ? '1' : '0');
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(habitacion: IHabitacion): Observable<string> {
    const formData = new FormData();
    formData.append('habitacion_id', habitacion.habitacion_id.toString());
    formData.append('numero', habitacion.numero);
    formData.append('tipo', habitacion.tipo);
    formData.append('precio', habitacion.precio.toString());
    formData.append('disponible', habitacion.disponible ? '1' : '0');
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
