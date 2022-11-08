import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historia } from '../models/historia';


@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  url = 'http://localhost:4000/api/historias/'

  constructor(private http: HttpClient) { }

  getHistorias(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarHistoria(operacion:Historia):Observable<any>{
    return this.http.post(this.url,operacion);
  }

  obtenerHistoria(id: string): Observable<any>{
    //alert("obtener historia services: "+this.url+id);
    return this.http.get(this.url+id);
  }

  editarHistoria(id: string,historia:Historia): Observable<any>{
    return this.http.put(this.url+id,historia);
  }
}
