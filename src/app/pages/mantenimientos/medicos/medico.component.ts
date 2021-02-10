import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../../services/medico.service';
import { Medico } from '../../../models/medicos.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from 'src/app/services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private hospitalService: HospitalService, private medicoService: MedicoService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.cargarMedico(id));
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });
    this.cargarHospitales();
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalID => {
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalID);
    });
  }

  cargarMedico(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.medicoService.cargarMedicosById(id).pipe(delay(200)).subscribe(medico => {
      if (!medico) {
        return this.router.navigateByUrl(`dashboard/medicos`);
      }
      //TODO: desestructurar las propiedades que necesitamos
      const { nombre, hospital: { _id } } = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({nombre, hospital: _id})
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

    if (this.medicoSeleccionado) {
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      this.medicoService.actualizarMedico(data).subscribe(resp => {
        Swal.fire('Actualizado', `El medico ${nombre} fue actualizado exitosamente`, 'success');

      });
    } else {

      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
        Swal.fire('Guardado', `El medico ${nombre} fue guardado exitosamente`, 'success');
        this.router.navigateByUrl(`dashboard/medico/${resp.medico._id}`);
      });
      console.log(this.medicoForm.value);
    }
  }
}
