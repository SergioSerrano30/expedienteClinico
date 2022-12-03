import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';
import base from './api';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url = base+'/personas/'
  constructor(private http: HttpClient) { }

  getPersonas(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarPersona(persona:Persona):Observable<any>{
    return this.http.post(this.url,persona)
  }

  obtenerPersona(id: string): Observable<any>{
    return this.http.get(this.url+id);
  }

  editarPersona(id: string,persona:Persona): Observable<any>{
    return this.http.put(this.url+id,persona);
  }
}
