import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public email: string;
  public remember: boolean;
  public auth2: any;
  
  public loginForm = this.fb.group({
    email: [this.email, [ Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]],
    remember: [this.remember]
  });


  constructor(private router: Router, private ngZone: NgZone, private fb: FormBuilder, private usuarioService: UsuarioService) {
    
  }

  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.renderButton();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.remember = true;
      console.log(this.remember);
    } else {
      this.remember = false;
    }
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.usuarioService.loginUsuario(this.loginForm.value, this.loginForm.value.remember).subscribe((resp) => {
        setTimeout(() => {
          Swal.fire('Exito', 'Usuario Logueado Exitosamente', 'success');
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
          });
        }, 1000);
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
    }
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(resp => this.router.navigateByUrl('/'));
      }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
