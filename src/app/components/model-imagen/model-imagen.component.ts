import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: [
  ]
})
export class ModelImagenComponent implements OnInit {

  public ocultarModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.ocultarModal = true;
  }
}
