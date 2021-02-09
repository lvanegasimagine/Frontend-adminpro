import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicos: Medico[] = [];
  public cargando: boolean = true;

  constructor(private medicoService: MedicoService) { }

  ngOnInit(): void {
  }

  cargarHospital() {
    this.cargando = true;
    this.medicoService.cargarMedicos().subscribe((medicos: Medico[]) => {
      this.cargando = false;
      this.medicos = medicos;
      console.log(medicos);
    });
  }

}
