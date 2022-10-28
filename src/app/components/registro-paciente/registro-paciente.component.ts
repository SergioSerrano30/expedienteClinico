import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css'],
})
export class RegistroPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _pacienteService: UsuarioService) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoP: ['', Validators.required],
      apellidoM: ['', Validators.required],
      fechaNac: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  agregarPaciente(){
    
  }
}
