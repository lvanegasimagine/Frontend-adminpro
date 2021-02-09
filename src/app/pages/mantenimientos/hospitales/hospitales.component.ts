import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  constructor(public hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.hospitalService.cargarHospital().subscribe(hospitales => {
      console.log(hospitales);
    });
  }

}
