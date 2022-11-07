import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Usuario } from 'src/app/models/usuario';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { Domicilio } from 'src/app/models/domicilio';
import { Operacion } from 'src/app/models/operacion';
import { DomicilioService } from 'src/app/services/domicilio.service';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './paciente_registro.component.html',
  styleUrls: ['./paciente_registro.component.css'],
})
export class RegistroPacienteComponent implements OnInit {
  pacienteForm: FormGroup;

  titulo = 'Registrar Paciente';
  id: string;
  idUM: string;
  usuario: Usuario | null;
  nombre: string;
  
  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  year = this.today.getFullYear()-18;
  year2=this.year-100;
  fechaHoy:String;
  fechaMin:String;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _personaService: PersonaService,
    private _domicilioService: DomicilioService,
    private _operacionesService: OperacionService,
    private aRouter: ActivatedRoute,
  )   {
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
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.usuario = null;
    this.nombre = '';

    //Bloquear Fecha---------
    if(this.day<9 && this.month<9){
      this.fechaHoy= this.year+'-0'+this.month+'-0'+this.day;
      this.fechaMin=this.year2+'-0'+this.month+'-0'+this.day;
    }else if(this.day<9 && this.month>9){
      this.fechaHoy= this.year+'-'+this.month+'-0'+this.day;
      this.fechaMin=this.year2+'-'+this.month+'-0'+this.day;
    }else if (this.day>9 && this.month<9){
      this.fechaHoy= this.year+'-0'+this.month+'-'+this.day;
      this.fechaMin=this.year2+'-0'+this.month+'-'+this.day;
    }else{
      this.fechaHoy= this.year+'-'+this.month+'-'+this.day;
      this.fechaMin=this.year2+'-'+this.month+'-'+this.day;
    }
   //-----------bloquar fecha fin-----------------------
  }

  ngOnInit(): void {
 
    this.obtenerUsuario();
    if (this.idUM.length > 5) {
      this.esEditar();
    }
    }
  

  passFormatoCorrecto(password: string) {
    //6 a 45 caracteres
    //Una mayuscula al menos
    //Una minuscula al menos
    //Un numero al menos
    var regularExpression =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,45}$/;
    if (password.match(regularExpression)) {
      return true;
    } else {
      return false;
    }
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        //console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
      });
    }
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
    let calle = this.pacienteForm.get('calle')?.value;
    let numero_EXT = this.pacienteForm.get('numero_EXT')?.value;
    let numero_INT = this.pacienteForm.get('numero_INT')?.value;
    let colonia = this.pacienteForm.get('colonia')?.value;
    let entrecalle1 = this.pacienteForm.get('entrecalle1')?.value;
    let entrecalle2 = this.pacienteForm.get('entrecalle2')?.value;
    let referencia = this.pacienteForm.get('referencia')?.value;
    let pais = this.pacienteForm.get('pais')?.value;
    let estado = this.pacienteForm.get('estado')?.value;
    let municipio = this.pacienteForm.get('municipio')?.value;

    let tipoOperacion = 'Registrar Paciente';
    let fechaRegistro = '02-04-2012';
    let hora = '12:12;'
    let usuario_idUsuario = this.idUM;
   
    


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

    const OPERACION: Operacion = {
      fechaRegistro: fechaRegistro,
      hora: hora,
      tipoOperacion: tipoOperacion,
      usuario_idUsuario: usuario_idUsuario,
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

    if (this.passFormatoCorrecto(password)) {
      //Calcular edad
      var fecha_nacimiento=fechaNac;
      var hoy = new Date();
      var cumpleanos = new Date(fecha_nacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      if(edad>=18){
        if (this.idUM.length > 5) {
          //editamos
          this._usuarioService.editarUsuario(this.idUM, USUARIO).subscribe(
            (data) => {
              this.toastr.info(
                'Paciente modificado con éxito!',
                'Paciente Actualizada!'
              );
              this.router.navigate(['/paciente_lista/' + this.id]);
            },
            (error) => {
              console.log(error);
              this.pacienteForm.reset();
            }
          );
        } else {
          //guardamos paciente
          this.guardarPersona(PERSONA, DOMICILIO);
          this._usuarioService.guardarUsuario(USUARIO).subscribe((data) => {
            this.toastr.success(
              'Se ha guardado el paciente con éxito!',
              'Paciente registrado!'
            );
          });
          //guardamos operacion
          this.guardarPersonaOperacion(OPERACION);
        }
        this.router.navigate(['/paciente_lista/' + this.id]);
      }else{ //else esMayorDeEdad
        this.toastr.warning(
          'Debe ser Mayor de edad',
            'Mayoria de edad no cumplida!',{
              timeOut: 8000,
              progressBar:true
            });
      }
    
    }else{
      this.toastr.warning(
      '*6 a 45 caracteres   '+
      '*Al menos una mayuscula   '+
      '*Al menos una minuscula   '+
      '*Al menos un número   ',
        'Formato incorrecto en contraseña!',{
          timeOut: 8000,
          progressBar:true
        });
      
    }

    //console.log(USUARIO);
  }

  guardarPersona(per: Persona, dom: Domicilio) {
    //console.log(per);
    this.guardarDomicilio(dom);
    this._personaService.guardarPersona(per).subscribe((data) => {
      this.toastr.success(
        'Se ha guardado la persona con éxito!',
        'Persona registrado!'
      );
      //this.router.navigate(['/terapeuta-inicio']);
    });
  }

  guardarPersonaOperacion(op:Operacion) {
    this._operacionesService.guardarOperacion(op).subscribe((data) => {
      this.toastr.success(
        'Se ha guardado la Operacion con Exito!','Operacion Registrada!'
      );
     // this.router.navigate(['/paciente_lista/' + this.id]);
    });
  }

  guardarDomicilio(dom: Domicilio) {
    //console.log(dom);
    this._domicilioService.guardarDomicilio(dom).subscribe((data) => {
      this.toastr.success(
        'Se ha guardado el domicilio con éxito!',
        'Domicilio registrado!'
      );
      //this.router.navigate(['/terapeuta-inicio']);
    });
  }

  esEditar() { 
    if (this.idUM !== null) { //Recupera la informacion y la manda al formulario
      this.titulo = 'Editar Paciente';
      this._usuarioService.obtenerUsuario(this.idUM).subscribe((data) => {
        this.pacienteForm.setValue({
          nombre: data.usuario_persona.nombre,
          apPaterno: data.usuario_persona.apMaterno,
          apMaterno: data.usuario_persona.apPaterno,
          fechaNac: data.usuario_persona.fechaNac,
          sexo: data.usuario_persona.sexo,
          usuario: data.usuario,
          password: data.password,
          calle: data.usuario_persona.persona_domicilio.calle,
          numero_EXT: data.usuario_persona.persona_domicilio.numero_EXT,
          numero_INT: data.usuario_persona.persona_domicilio.numero_INT,
          colonia: data.usuario_persona.persona_domicilio.colonia,
          entrecalle1: data.usuario_persona.persona_domicilio.entrecalle1,
          entrecalle2: data.usuario_persona.persona_domicilio.entrecalle2,
          referencia: data.usuario_persona.persona_domicilio.referencia,
          municipio: data.usuario_persona.persona_domicilio.municipio,
          estado: data.usuario_persona.persona_domicilio.estado,
          pais: data.usuario_persona.persona_domicilio.pais,
        });
      });
    }
  }

  irInicio() {
    let rol = this.usuario?.usuario_rol.desRol;
    switch (rol) {
      case 'Paciente':
        this.router.navigate(['/paciente_inicio/' + this.id]);
        break;
      case 'Administrador':
        this.router.navigate(['/admin_inicio/' + this.id]);
        break;
      case 'Terapeuta':
        this.router.navigate(['/terapeuta_inicio/' + this.id]);
        break;

      default:
        break;
    }
  }


}//Class RegistroPacienteComponent


