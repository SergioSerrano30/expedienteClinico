import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Domicilio } from 'src/app/models/domicilio';
import { DomicilioService } from 'src/app/services/domicilio.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css'],
})
export class RegistroPacienteComponent implements OnInit {
  pacienteForm: FormGroup;
  titulo = 'Registro Paciente';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _personaService: PersonaService,
    private aRouter:ActivatedRoute
  ) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      calle: ['', Validators.required],
      numero_EXT: ['', Validators.required],
      numero_INT: ['', Validators.required],
      colonia: ['', Validators.required],
      entrecalle1: ['', Validators.required],
      entrecalle2: ['', Validators.required],
      referencia: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
    });
    this.id=this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar()
  }

  guardarPaciente() {
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

    const DOMICILIO: Domicilio = {
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
    };

    const PERSONA: Persona = {
      nombre: nombre,
      apPaterno: apPaterno,
      apMaterno: apMaterno,
      fechaNac: fechaNac,
      sexo: sexo,
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
    };
    
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

    
    //ZAM: descomenté esto de abajo
    console.log(USUARIO);
    this.guardarPersona();
     this._usuarioService.guardarUsuario(USUARIO).subscribe(data =>{
       this.toastr.success('Se ha guardado el paciente con éxito!', 'Paciente registrado!');
       this.router.navigate(['/terapeuta-inicio']);
     })
  }

  guardarPersona() {
    let nombre = this.pacienteForm.get('usuario')?.value;
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
    const PERSONA: Persona = {
      nombre: nombre,
      apPaterno: apPaterno,
      apMaterno: apMaterno,
      fechaNac: fechaNac,
      sexo: sexo,
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
    };
    console.log(PERSONA);
    this.guardarDomicilio();
    // this._personaService.guardarPersona(PERSONA).subscribe(data =>{
    //   this.toastr.success('Se ha guardado la persona con éxito!', 'Persona registrado!');
    //   //this.router.navigate(['/terapeuta-inicio']);
    // })
  }
  
  guardarDomicilio() {
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
    const DOMICILIO: Domicilio = {
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
    };
    console.log(DOMICILIO);
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
