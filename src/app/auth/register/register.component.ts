import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent{

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Luis', [ Validators.required, Validators.minLength(3)]],
    email: ['test@asd.com', [Validators.required, Validators.email]],
    password: ['1234567', [Validators.required, Validators.minLength(3)]],
    password2: ['1234567', [Validators.required, Validators.minLength(3)]],
    terminos: [true, [Validators.required, Validators.minLength(3)]],
  }, {
    validators: this.passwordIguales('password', 'password2')
  } );

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) { }

  public crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    } else {
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe((resp) => {
        console.log(resp);
        Swal.fire('Exito', 'Usuario Creado Exitosamente', 'success');
      }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    }
    else {
      return false;
    }
  }

  passwordIguales(pass1Name: string, pass2Name:string) {
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }
      else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }


}
