import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './model-imagen.component.html',
  styles: [
  ]
})
export class ModelImagenComponent implements OnInit {

  constructor(public modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
  }
}
