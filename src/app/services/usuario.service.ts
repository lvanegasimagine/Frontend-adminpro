import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface  } from '../interfaces/register.interfaces';
import { environment } from 'src/environments/environment';
import { LoginInterface } from '../interfaces/login.interface';
import { map, tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
  
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterInterface) {
    return this.http.post(`${base_url}/usuarios`, formData);
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
