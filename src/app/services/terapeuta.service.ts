import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class TerapeutaService {
  url = 'http://localhost:4000/api/terapeutas/';
  urlActivos = 'http://localhost:4000/api/terapeutas/activos';
  
  constructor(private http: HttpClient) { }
  getTerapeutas():Observable<any>{
    return this.http.get(this.url);
  }
  getTerapeutasActivos():Observable<any>{
    return this.http.get(this.urlActivos);
  }
}
