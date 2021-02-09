import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { map, tap, catchError } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarHospital() {
    const url = `${base_url}/hospitales`;
    return this.http.get(url, this.headers).pipe(map((resp: {ok: boolean, hospitales: Hospital[]}) => resp.hospitales));
  }
}