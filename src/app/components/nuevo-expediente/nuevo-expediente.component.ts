import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Expediente } from 'src/app/models/expediente';

@Component({
  selector: 'app-nuevo-expediente',
  templateUrl: './nuevo-expediente.component.html',
  styleUrls: ['./nuevo-expediente.component.css']
})
export class NuevoExpedienteComponent implements OnInit {
  expedienteForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { 
    this.expedienteForm = this.fb.group({
      curp: ['',Validators.required],
      peso: ['',Validators.required],
      altura: ['',Validators.required],
      presion: ['',Validators.required],
      padecimiento: ['',Validators.required],
      medicacion: ['',Validators.required]
    })
  }

  ngOnInit(): void {
  }
  
  agregarExpediente(){
    let date: Date = new Date();
    
    const EXPEDIENTE: Expediente = {
      curp: this.expedienteForm.get('curp')?.value,
      peso:  this.expedienteForm.get('peso')?.value,
      altura:  this.expedienteForm.get('altura')?.value,
      presion:  this.expedienteForm.get('presion')?.value,
      padecimiento:  this.expedienteForm.get('padecimiento')?.value,
      medicacion:  this.expedienteForm.get('medicacion')?.value,
      
      doctor:  'TEST DOCTOR',
      fecha:  date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
    }
    console.log(EXPEDIENTE);
    this.toastr.success('Expediente agregar correctamente', 'Expediente agregado');
    this.router.navigate(['/doctor-inicio'])
  }

}
