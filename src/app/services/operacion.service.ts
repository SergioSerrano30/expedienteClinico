import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacion } from '../models/operacion';
import base from './api';
@Injectable({
  providedIn: 'root'
})

export class OperacionService {
  url = base+'/operaciones/'

  constructor(private http: HttpClient) { }

  getOperaciones(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarOperacion(operacion:Operacion):Observable<any>{
    return this.http.post(this.url,operacion);
  }

  obtenerOperacion(id: string): Observable<any>{
    return this.http.get(this.url+id);
  }

  editarOperacion(id: string,operacion:Operacion): Observable<any>{
    return this.http.put(this.url+id,operacion);
  }

  obtenerOperacionesPorTipo(type: string, nombre: string):Observable<any>{
    return this.http.get(this.url+type+"/"+nombre);
  }

}

