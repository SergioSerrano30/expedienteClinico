import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';

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
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {}
  agregarPaciente(){
    let act = "S";
    let idRol_PK = 3
    let desRol = "Paciente"
    let usuario = this.pacienteForm.get('usuario')?.value
    let password = this.pacienteForm.get('password')?.value
    let nombre = this.pacienteForm.get('usuario')?.value
    let apPaterno = this.pacienteForm.get('usuario')?.value
    let apMaterno = this.pacienteForm.get('usuario')?.value
    let fechaNac = this.pacienteForm.get('usuario')?.value
    let sexo = this.pacienteForm.get('usuario')?.value
    const USUARIO: Usuario = {
      usuario: usuario,
      password: password,
      activo: act,
      usuario_rol:[{idRol_PK,desRol}],
      usuario_persona:[{nombre,apPaterno,apMaterno,fechaNac,sexo}]
    }
    console.log(USUARIO);
    this._pacienteService.guardarUsuario(USUARIO).subscribe(data =>{
      this.toastr.success('Se ha guardado el paciente con éxito!', 'Paciente registrado!');
      this.router.navigate(['/terapeuta-inicio']);
    })
  }
}
