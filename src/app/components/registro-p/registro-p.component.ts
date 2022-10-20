import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
@Component({
  selector: 'app-registro-p',
  templateUrl: './registro-p.component.html',
  styleUrls: ['./registro-p.component.css']
})
export class RegistroPComponent implements OnInit {
  pacienteForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router, 
    private toastr: ToastrService,
    private _pacienteService: PacienteService) { 
    this.pacienteForm = this.fb.group({
      nombre: ['',Validators.required],
      apellidoP: ['',Validators.required],
      apellidoM: ['',Validators.required],
      seguro: ['',Validators.required],
      correo: ['',Validators.required],
      nacimiento: ['',Validators.required],
      curp: ['',Validators.required],
      password: ['',Validators.required]
    })
  }
  ngOnInit(): void {
  }
  agregarPaciente(){
    let date: Date = new Date();
    
    const PACIENTE: Paciente = {
      nombre: this.pacienteForm.get('nombre')?.value,
      apellidoP:  this.pacienteForm.get('apellidoP')?.value,
      apellidoM:  this.pacienteForm.get('apellidoM')?.value,
      seguro:  this.pacienteForm.get('seguro')?.value,
      correo:  this.pacienteForm.get('correo')?.value,
      nacimiento:  this.pacienteForm.get('nacimiento')?.value,
      curp:  this.pacienteForm.get('curp')?.value,
      password:  this.pacienteForm.get('password')?.value,
  
      fecha:  date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
    }
    console.log(PACIENTE);
    this._pacienteService.guardarPaciente(PACIENTE).subscribe(data =>{
      this.toastr.success('Registrado correctamente', 'Éxito al registrar');
      this.router.navigate(['/login']);
    }, error => {
      this.toastr.error(error,'Error')
      this.pacienteForm.reset
    })
  }


}
