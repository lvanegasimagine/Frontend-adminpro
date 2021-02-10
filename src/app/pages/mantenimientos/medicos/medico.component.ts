import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private router: Router,
              private hospitalService: HospitalService, private medicoService: MedicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalID => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalID);
    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospital().subscribe((resp: Hospital[]) => {
      this.hospitales = resp;
      console.log('hospitales', resp);
    });
  }

  guardarMedico() {
    const { nombre } = this.medicoForm.value;

    this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
      Swal.fire('Guardado', `El medico ${nombre} fue guardado exitosamente`, 'success');
      this.router.navigateByUrl(`dashboard/medico/${resp.medico._id}`);
    });
    console.log(this.medicoForm.value);
  }
}
