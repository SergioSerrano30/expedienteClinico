import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import base from './api';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  url = base+'/pacientes/';
  urlActivos = base+'/pacientes/activos';
  constructor(private http: HttpClient) { }

  getPacientes():Observable<any>{
    return this.http.get(this.url);
  }




  // guardarPaciente(paciente: Paciente):Observable<any>{
  //   return this.http.post(this.url,paciente);
  // }


  // obtenerPaciente(id: string): Observable<any>{
  //   return this.http.get(this.url+id);
  // }

  // editarPaciente(id: string,paciente:Paciente): Observable<any>{
  //   return this.http.put(this.url+id,paciente);
  // }


  getPacientesActivos():Observable<any>{
    return this.http.get(this.urlActivos);
  }

  // eliminarPaciente(id: string): Observable<any> {
  //   return this.http.delete(this.url+id);
  // }
  // guardarPaciente(paciente: Paciente):Observable<any>{
  //   return this.http.post(this.url,paciente);
  // }

  // obtenerPaciente(id: string): Observable<any>{
  //   return this.http.get(this.url+id);
  // }
  // editarPaciente(id: string, paciente: Paciente):Observable<any>{
  //   return this.http.put(this.url+id,paciente);
  // }

}
