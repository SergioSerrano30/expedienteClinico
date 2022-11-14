import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url = 'http://localhost:4000/api/consultas/'

  constructor(private http: HttpClient) { }

  getConsultas(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarConsulta(operacion:Consulta):Observable<any>{
    return this.http.post(this.url,operacion);
  }

  obtenerConsulta(type: string,id: string): Observable<any>{
    return this.http.get(this.url+type+"/"+id);
  }

  editarConsulta(id: string,consulta:Consulta): Observable<any>{
    return this.http.put(this.url+id,consulta);
  }

  eliminarConsulta(id: string): Observable<any>{
    return this.http.delete(this.url+id);
  }
}