import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medicos.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;

  constructor(private medicoService: MedicoService, private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarMedico();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(200)).subscribe(img => this.cargarMedico());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedico() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe(medicos => {
      this.cargando = false;
      this.medicos = medicos;
      console.log('medico: ', this.medicos);
    });
  }

  abrirModal(medico) {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.cargarMedico();
    }

    this.busquedaService.buscar('medicos', termino).subscribe((resultados: Medico[]) => {
      this.medicos = resultados;
    });
  }

  eliminarMedico(medico: Medico) {
    Swal.fire({
      title: 'Borrar Médico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.eliminarMedico(medico._id).subscribe(resp =>{
          this.cargarMedico();
          Swal.fire(
            'Eliminado',
            `El medico ${medico.nombre} fue eliminado exitosamente`,
            'success'
          );
        });
      }
    });
  }

}
