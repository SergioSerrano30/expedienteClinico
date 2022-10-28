import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domicilio } from '../models/domicilio';

@Injectable({
  providedIn: 'root'
})
export class DomicilioService {
  url = 'http://localhost:4000/api/domicilios/'
  constructor(private http: HttpClient) { }

  getDomicilios(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarDomicilio(domicilio:Domicilio):Observable<any>{
    return this.http.post(this.url,domicilio)
  }
}
