import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;

  constructor(public hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.cargarHospital();
  }

  cargarHospital() {
    this.cargando = true;
    this.hospitalService.cargarHospital().subscribe(hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
    });
  }

}
