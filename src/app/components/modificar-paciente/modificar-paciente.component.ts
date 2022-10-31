import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Domicilio } from 'src/app/models/domicilio';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css'],
})
export class ModificarPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  titulo = 'Modificar Paciente';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _usuarioService: UsuarioService,
              private aRouter: ActivatedRoute) { 
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],  
     })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
  }

  guardarPaciente() {
    console.log("guardarPaciente");
    let act = 'S';
    let idRol_PK = 3;
    let desRol = 'Paciente';
    let usuario = this.pacienteForm.get('usuario')?.value;
    let password = this.pacienteForm.get('password')?.value;
    let nombre = this.pacienteForm.get('nombre')?.value;
    let apPaterno = this.pacienteForm.get('apPaterno')?.value;
    let apMaterno = this.pacienteForm.get('apMaterno')?.value;
    let fechaNac = this.pacienteForm.get('fechaNac')?.value;
    let sexo = this.pacienteForm.get('sexo')?.value;
    let calle = 'calle'; //this.pacienteForm.get('usuario')?.value
    let numero_EXT = 'numero_EXT'; //this.pacienteForm.get('apPaterno')?.value
    let numero_INT = 'numero_INT'; //this.pacienteForm.get('apMaterno')?.value
    let colonia = 'colonia'; //this.pacienteForm.get('fechaNac')?.value
    let entrecalle1 = 'entrecalle1'; //this.pacienteForm.get('sexo')?.value
    let entrecalle2 = 'entrecalle2'; //this.pacienteForm.get('sexo')?.value
    let referencia = 'referencia'; //this.pacienteForm.get('sexo')?.value
    let pais = 'pais'; //this.pacienteForm.get('sexo')?.value
    let estado = 'estado'; //this.pacienteForm.get('sexo')?.value
    let municipio = 'municipio'; //this.pacienteForm.get('sexo')?.value


    const USUARIO: Usuario = {
      usuario: usuario,
      password: password,
      activo: act,
      usuario_rol: { idRol_PK, desRol },
      usuario_persona: {
        nombre,
        apPaterno,
        apMaterno,
        fechaNac,
        sexo,
        persona_domicilio: {
          calle: calle,
          numero_EXT: numero_EXT,
          numero_INT: numero_INT,
          colonia: colonia,
          entrecalle1: entrecalle1,
          entrecalle2: entrecalle2,
          referencia: referencia,
          pais: pais,
          estado: estado,
          municipio: municipio,
        },
      },
    };

    console.log(USUARIO);
    this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
      this.toastr.success('El Usuario fue registrado con exito!', 'Usuario Registrado!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.pacienteForm.reset();
    })

  
  }

 //ZAM
 esEditar(){
  if(this.id!==null){
    this.titulo = 'Editar Paciente';
    console.log("Bandera 1");
    this._usuarioService.obtenerUsuario(this.id).subscribe(data=>{
      this.pacienteForm.setValue({
        usuario: data.usuario,
        password: data.password
      })
      console.log("Bandera 2");
    })
    console.log("Bandera 3");
  }
}

}
