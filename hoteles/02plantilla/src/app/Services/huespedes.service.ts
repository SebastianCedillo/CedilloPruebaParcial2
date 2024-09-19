import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IHuesped } from '../Interfaces/ihuesped';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HuespedesService {
  apiurl = 'http://localhost/hoteles/hotel/controllers/huespedes.controller.php?op='; 
  constructor(private lector: HttpClient) {}

  buscar(texto: string): Observable<IHuesped> {
    const formData = new FormData();
    formData.append('texto', texto);
    return this.lector.post<IHuesped>(this.apiurl + 'uno', formData);
  }

  todos(): Observable<IHuesped[]> {
    return this.lector.get<IHuesped[]>(this.apiurl + 'todos');
  }

  uno(huesped_id: number): Observable<IHuesped> {
    const formData = new FormData();
    formData.append('huesped_id', huesped_id.toString());
    return this.lector.post<IHuesped>(this.apiurl + 'uno', formData);
  }

  eliminar(huesped_id: number): Observable<number> {
    const formData = new FormData();
    formData.append('huesped_id', huesped_id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(huesped: IHuesped): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', huesped.nombre);
    formData.append('apellido', huesped.apellido);
    formData.append('email', huesped.email);
    formData.append('telefono', huesped.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(huesped: IHuesped): Observable<string> {
    const formData = new FormData();
    formData.append('huesped_id', huesped.huesped_id.toString());
    formData.append('nombre', huesped.nombre);
    formData.append('apellido', huesped.apellido);
    formData.append('email', huesped.email);
    formData.append('telefono', huesped.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
