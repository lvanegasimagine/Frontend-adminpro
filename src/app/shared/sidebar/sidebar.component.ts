import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // menuItems: any[];

  public imgUsuario: string = '';
  public usuario: Usuario;


  constructor( public sidebarService: SidebarService, private usuarioService: UsuarioService) {
    //TODO: se utiliza cuando tenemos el menu en sidebarservice
    // this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;

    // console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
