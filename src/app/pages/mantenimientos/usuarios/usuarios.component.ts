import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuario: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public cargando: boolean = true;

  constructor(private usuarioService: UsuarioService, private busquedaService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.cargando = true;
    this.usuarioService.cargarUsuario(this.desde).subscribe(({ total, usuarios }) => {
      this.totalUsuario = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
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

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino).subscribe(resultados => {
      this.usuarios = resultados;
    });
  }

}
