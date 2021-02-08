import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public desde: number = 0;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuarioService.cargarUsuario(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuario = total;
      this.usuarios = usuarios;
    });
  }

  cambiarPagina(valor: number) {

    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    }else if (this.desde >= this.totalUsuario) {
      this.desde -= valor;
    }

    this.cargarUsuario();
  }

}
