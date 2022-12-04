import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import base from './api';
@Injectable({
  providedIn: 'root'
})
export class TerapeutaService {
  url = base+'/terapeutas/';
  urlActivos = base+'/terapeutas/activos';
  
  constructor(private http: HttpClient) { }
  getTerapeutas():Observable<any>{
    return this.http.get(this.url);
  }
  getTerapeutasActivos():Observable<any>{
    return this.http.get(this.urlActivos);
  }
}
