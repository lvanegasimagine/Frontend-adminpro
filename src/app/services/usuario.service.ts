import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface  } from '../interfaces/register.interfaces';
import { environment } from 'src/environments/environment';
import { LoginInterface } from '../interfaces/login.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
  
export class UsuarioService {

  constructor(private http: HttpClient) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(tap((resp: any) => {
      localStorage.setItem('token', resp.token);
    }),
      map(resp => true),
      catchError(error => of(false)));
  }

  crearUsuario(formData: RegisterInterface) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(tap ((resp: any) => localStorage.setItem('token', resp.token)));
  }

  loginUsuario(formData: LoginInterface, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', formData.email);
    } else {
      localStorage.removeItem('email');
    }
    return this.http.post(`${base_url}/login`, formData).pipe(tap((resp: any) => {
       localStorage.setItem('token', resp.token);
    }));
  }

  loginGoogle(token) {

    return this.http.post(`${base_url}/login/google`, {token}).pipe(map((resp: any) => {
       localStorage.setItem('token', resp.token);
    }));
  }
}
