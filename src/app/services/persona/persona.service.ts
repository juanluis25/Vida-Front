import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../../models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiUrl = 'http://localhost:8080/api/v1/personasnuevas';

  constructor(private http: HttpClient) {}

  findAll():Observable<Persona[]> {
    return this.http.get<any>(`${this.apiUrl}/findAll`);
  }

  filtrarPersonas(nombre:String, apellidopaterno:String, apellidomaterno: String, telefono:String):Observable<Persona[]> {
    return this.http.get<any>(`${this.apiUrl}/filtrar-persona`);
  }

  findAllByFecha():Observable<Persona[]> {
    return this.http.get<any>(`${this.apiUrl}/fecha`);
  }

  get(id:number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(persona:Persona):Observable<any> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  findByIdAndFechaHoy(id: number, persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/oracion-de-fe/${id}`, persona);
  }

  update(id: number, persona: Persona): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, persona);
  }
  
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
