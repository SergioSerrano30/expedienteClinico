import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  url = 'http://localhost:4000/api/usuarios/'
  //url = 'api/usuarios/'
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarUsuario(usuario:Usuario):Observable<any>{
    return this.http.post(this.url,usuario);
  }


  obtenerUsuario(id: string): Observable<any>{
    return this.http.get(this.url+id);
  }


  editarUsuario(id: string,usuario:Usuario): Observable<any>{
    return this.http.put(this.url+id,usuario);
  }

  obtenerUsuarioPorNombre(type: string, nombre: string):Observable<any>{
    return this.http.get(this.url+type+"/"+nombre);
  }
  


}
