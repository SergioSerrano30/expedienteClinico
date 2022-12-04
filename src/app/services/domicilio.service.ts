import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domicilio } from '../models/domicilio';
import base from './api';
@Injectable({
  providedIn: 'root'
})
export class DomicilioService {
  url = base+'/domicilios/'
  constructor(private http: HttpClient) { }

  getDomicilios(): Observable<any>{
    return this.http.get(this.url);
  }

  guardarDomicilio(domicilio:Domicilio):Observable<any>{
    return this.http.post(this.url,domicilio);
  }
}
