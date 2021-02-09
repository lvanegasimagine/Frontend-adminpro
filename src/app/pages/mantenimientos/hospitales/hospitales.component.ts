import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs: Subscription;
  public hospitalesTemp: Hospital[] = [];


  constructor(public hospitalService: HospitalService, private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {
    this.cargarHospital();
    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(delay(200)).subscribe(img => this.cargarHospital());
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return this.cargarHospital();
      // return this.hospitales = this.hospitalesTemp;
    }

    this.busquedaService.buscar('hospitales', termino).subscribe(resultados => {
      this.hospitales = resultados;
    });
  }

  cargarHospital() {
    this.cargando = true;
    this.hospitalService.cargarHospital().subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
      console.log(hospitales);
    });
  }

  async crearHospital() {
    const {value = ''} = await Swal.fire<string>({
      input: 'text',
      inputLabel: 'Ingrese nombre del nuevo Hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospital(value).subscribe((resp:any) => {
        this.hospitales.push(resp.hospital);
        Swal.fire(`${value} creado exitosamente`);
      });
    } else {
      return;
    }

  }

  actualizarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe(resp => {
      Swal.fire('Actualizado', `${hospital.nombre}`, 'success');
    });
  }

  eliminarHospital(hospital: Hospital) {
    Swal.fire({
      title: 'Borrar Hospital?',
      text: `Esta a punto de borrar a ${hospital.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospitalService.eliminarHospital(hospital._id).subscribe(resp =>{
          Swal.fire(
            'Eliminado',
            `El ${hospital.nombre} fue eliminado exitosamente`,
            'success'
          );
          this.cargarHospital();
        });
      }
    });
  }

  abrirModal(hospital) {
      this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
