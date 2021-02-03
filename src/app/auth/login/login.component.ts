import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: ['test@asd.com', [ Validators.required, Validators.minLength(3)]],
    password: ['123456', [Validators.required]],
    remember: [false]
  });


  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService ) { }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.usuarioService.loginUsuario(this.loginForm.value).subscribe((resp) => {
        Swal.fire('Exito', 'Usuario Logueado Exitosamente', 'success');
        console.log(resp);
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }
}
