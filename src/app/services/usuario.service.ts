import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface  } from '../interfaces/register.interfaces';
import { environment } from 'src/environments/environment';
import { LoginInterface } from '../interfaces/login.interface';
import { map, tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
  
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
   }

  googleInit() {

    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '520554737051-ev466l7gh795ilsk1cb76tc72obbr9jf.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

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

  logout() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
  }
}
