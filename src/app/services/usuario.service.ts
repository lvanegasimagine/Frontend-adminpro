import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface  } from '../interfaces/register.interfaces';
import { environment } from 'src/environments/environment';
import { LoginInterface } from '../interfaces/login.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
  
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterInterface) {
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  loginUsuario(formData: LoginInterface) {
    return this.http.post(`${base_url}/login`, formData);
  }
}
