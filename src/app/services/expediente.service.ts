import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expediente } from '../models/expediente';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  url = 'https://servidorexpedienteclinico.herokuapp.com/api/expedientes/';

  constructor(private http: HttpClient) { }

  getExpedientes():Observable<any>{
    return this.http.get(this.url);
  }

  eliminarExpediente(id: string): Observable<any> {
    return this.http.delete(this.url+id);
  }
  guardarExpediente(expediente: Expediente):Observable<any>{
    return this.http.post(this.url,expediente);
  }

  obtenerExpediente(id: string): Observable<any>{
    return this.http.get(this.url+id);
  }
  editarExpediente(id: string, expediente: Expediente):Observable<any>{
    return this.http.put(this.url+id,expediente);
  }

}
