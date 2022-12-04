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
  rol = ''
  error = '-'
  mostrarDatosTutor=0;
  password2="";

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();
  year = this.today.getFullYear();
  year2 = this.year - 100;

  hora = this.today.getHours();
  minuto = this.today.getMinutes();

  fechaHoy: String;
  fechaMin: String;

  fechaHoyCorrecta: String;
  horaHoyCorrecta: String;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _personaService: PersonaService,
    private _domicilioService: DomicilioService,
    private _operacionesService: OperacionService,
    private aRouter: ActivatedRoute
  ) {
    this.pacienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],

      nombreTutor: ['', Validators.required],
      apPaternoTutor: ['', Validators.required],
      apMaternoTutor: ['', Validators.required],
      fechaNacTutor: ['', Validators.required],
      sexoTutor: ['', Validators.required],
      telefonoTutor: ['', Validators.required],
      parentesco: ['', Validators.required],

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
    if (this.day < 9 && this.month < 9) {
      this.fechaHoy = this.year + '-0' + this.month + '-0' + this.day;
      this.fechaHoyCorrecta = this.año + '-0' + this.month + '-0' + this.day;
      this.fechaMin = this.year2 + '-0' + this.month + '-0' + this.day;
    } else if (this.day < 9 && this.month > 9) {
      this.fechaHoy = this.year + '-' + this.month + '-0' + this.day;
      this.fechaHoyCorrecta = this.año + '-' + this.month + '-0' + this.day;
      this.fechaMin = this.year2 + '-' + this.month + '-0' + this.day;
    } else if (this.day > 9 && this.month < 9) {
      this.fechaHoy = this.year + '-0' + this.month + '-' + this.day;
      this.fechaHoyCorrecta = this.año + '-0' + this.month + '-' + this.day;
      this.fechaMin = this.year2 + '-0' + this.month + '-' + this.day;
    } else {
      this.fechaHoy = this.year + '-' + this.month + '-' + this.day;
      this.fechaHoyCorrecta = this.año + '-' + this.month + '-' + this.day;
      this.fechaMin = this.year2 + '-' + this.month + '-' + this.day;
    }

    if(this.hora<9 && this.minuto<9){
      this.horaHoyCorrecta= "0"+this.hora+":0"+this.minuto;
    }else if(this.hora<9 && this.minuto>9){
      this.horaHoyCorrecta= "0"+this.hora+":"+this.minuto;
    }else if(this.hora>9 && this.minuto<9){
      this.horaHoyCorrecta= this.hora+":0"+this.minuto;
    }else{
      this.horaHoyCorrecta= this.hora+":"+this.minuto;
    }

    //-----------bloquar fecha fin-----------------------
  }

  ngOnInit(): void {
    this.pacienteForm.disabled;
    this.obtenerUsuario();
    if (this.idUM.length > 5) {
      this.error = ""
      this.esEditar();
      
    }
  }

  passFormatoCorrecto(password: string) {
    //6 a 45 caracteres
    //Una mayuscula al menos
    //Una minuscula al menos
    //Un numero al menos
    var regularExpression =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9#$%&/()=.-_]{6,45}$/;
    if (password.match(regularExpression)) {
      return true;
    } else {
      return false;
    }
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
        if(this.rol == 'Paciente'){
          this.router.navigate(['/error']);
        }
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }

  guardarPaciente() {
    let act = 'S';
    let idRol_PK = 3;
    let desRol = 'Paciente';
    let usuario = this.pacienteForm.get('usuario')?.value;
    let password = ""+this.pacienteForm.get('password')?.value;
    let password2 =""+ this.pacienteForm.get('password2')?.value;
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

    let nombreTutor = "";
    let apPaternoTutor =  "";
    let apMaternoTutor =  "";
    let fechaNacTutor =  "";
    let sexoTutor =  "";
    let telefonoTutor =  "";
    let parentesco =  "";

  
    //Comprobar que las contraseñas coinciden
    // if(password==password2){}else{this.toastr.warning(
    //   'Contraseñas no Coinciden',
    //   'Deben Coincidir las contraseñas'
    // ); return}

    //Comprobar Disponibilidad Usuario
    this._usuarioService.getUsuarios().subscribe((data) => {
      console.log("comprobarUsuarioLibre:",data)

      //buscar uno con el nombre
      var bandera=0;
      for(let i = 0;i<data.length;i++){
        if(data[i].usuario ==this.pacienteForm.get('usuario')?.value && this.titulo=="Registrar Paciente"){
          bandera=1;
          this.toastr.warning(
            'Nombre de Usuario Ya Existe',
            'Escoja otro Nombre de Usuario!',
            {
              timeOut: 8000,
              progressBar: true,
            }
          );
        }
      }

      if(bandera==0){
        let tipoOperacion = 'Registrar Paciente';
        if(this.idUM.length>5){
          tipoOperacion = "Editar Paciente";
        }
        let fechaRegistro = this.fechaHoyCorrecta+"";
        let hora = this.horaHoyCorrecta+"";
        let usuarios_idUsuario = this.id;
       
        if (this.passFormatoCorrecto(password)) {
          //Calcular edad 
          var fecha_nacimiento = fechaNac;
          var hoy = new Date();
          var cumpleanos = new Date(fecha_nacimiento);
          var edad = hoy.getFullYear() - cumpleanos.getFullYear();
          alert(edad);
          if (edad >= 18) {
            nombreTutor = "";
            apPaternoTutor =  "";
            apMaternoTutor =  "";
            fechaNacTutor =  "";
            sexoTutor =  "";
            telefonoTutor =  "";
            parentesco =  "";
          } else {
            fechaNacTutor = this.pacienteForm.get('fechaNacTutor')?.value;
       
            var hoy = new Date();
            var cumpleanos = new Date(fechaNacTutor);
            var edadTutor = hoy.getFullYear() - cumpleanos.getFullYear();
            //else esMenorDeEdad
            nombreTutor = this.pacienteForm.get('nombreTutor')?.value;
            apPaternoTutor = this.pacienteForm.get('apPaternoTutor')?.value;
            apMaternoTutor = this.pacienteForm.get('apMaternoTutor')?.value;
            sexoTutor = this.pacienteForm.get('sexoTutor')?.value;
            telefonoTutor = this.pacienteForm.get('telefonoTutor')?.value;
            parentesco = this.pacienteForm.get('parentesco')?.value;


            if(edadTutor<18){ this.toastr.warning(
              'Requisitos Tutor Invalidos',
              'El Tutor debe ser mayor de Edad!'
              ); return}
           
            if(telefonoTutor.match("^[0-9]+$")==null || telefonoTutor.length!=10){  this.toastr.warning(
              'Telefono No Valido',
              'Debe Tener solo numeros!'
            ); return}

            if(nombreTutor=="" || apPaternoTutor=="" || telefonoTutor==""){this.toastr.warning(
              'Datos Incompletos',
              'Debe poner los campos obligatorios del Tutor'
            ); return

            }
          }

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
            usuarios_idUsuario: usuarios_idUsuario,
          };
         
          const PERSONA: Persona = {
            nombre: nombre,
            apPaterno: apPaterno,
            apMaterno: apMaterno,
            fechaNac: fechaNac,
            sexo: sexo,
            nombreTutor: nombreTutor,
            apPaternoTutor: apPaternoTutor,
            apMaternoTutor: apMaternoTutor,
            fechaNacTutor: fechaNacTutor,
            sexoTutor: sexoTutor,
            telefonoTutor: telefonoTutor,
            parentesco: parentesco,
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
              nombreTutor,
              apPaternoTutor,
              apMaternoTutor,
              fechaNacTutor,
              sexoTutor,
              telefonoTutor,
              parentesco,
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
      
          //guardamos operacion
          this.guardarPersonaOperacion(OPERACION);
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
              this.router.navigate(['/paciente_lista/' + this.id]);
            });
            
          }
          // this.router.navigate(['/paciente_lista/' + this.id]);


        } else {
          this.toastr.warning(
            '*6 a 45 caracteres   ' +
              '*Al menos una mayuscula   ' +
              '*Al menos una minuscula   ' +
              '*Al menos un número   ',
            'Formato incorrecto en contraseña!',
            {
              timeOut: 8000,
              progressBar: true,
            }
          );
        }

      }
    })

   

    //console.log(USUARIO);
  }

  guardarPersona(per: Persona, dom: Domicilio) {
    //console.log(per);
    this.guardarDomicilio(dom);
    this._personaService.guardarPersona(per).subscribe((data) => {
    });
   
  }

  guardarPersonaOperacion(op: Operacion) {
    this._operacionesService.guardarOperacion(op).subscribe((data) => {
      // this.router.navigate(['/paciente_lista/' + this.id]);
    });
  }

  guardarDomicilio(dom: Domicilio) {
    //console.log(dom);
    this._domicilioService.guardarDomicilio(dom).subscribe((data) => {
      //this.router.navigate(['/terapeuta-inicio']);
    });
  }

  esEditar() { 
    if (this.idUM !== null) { //Recupera la informacion y la manda al formulario
      this.titulo = 'Editar Paciente';
    

      this._usuarioService.obtenerUsuario(this.idUM).subscribe((data) => {

        if(data.usuario_persona.sexoTutor == "Femenino" || data.usuario_persona.sexoTutor == "Masculino" ){
          this.mostrarDatosTutor=1
        }else{
          this.mostrarDatosTutor=0
        }
       
        this.pacienteForm.setValue({
          nombre: data.usuario_persona.nombre,
          apPaterno: data.usuario_persona.apMaterno,
          apMaterno: data.usuario_persona.apPaterno,
          fechaNac: data.usuario_persona.fechaNac,
          sexo: data.usuario_persona.sexo,
          nombreTutor: data.usuario_persona.nombreTutor,
          apPaternoTutor: data.usuario_persona.apPaternoTutor,
          apMaternoTutor: data.usuario_persona.apMaternoTutor,
          fechaNacTutor: data.usuario_persona.fechaNacTutor,
          sexoTutor: data.usuario_persona.sexoTutor,
          telefonoTutor: data.usuario_persona.telefonoTutor,
          parentesco: data.usuario_persona.parentesco,
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
        this.error = "---"
      },(err) => {
        this.router.navigate(['/error']);
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
  
  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }

  irAtras(){
    this.router.navigate(['/paciente_lista/'+this.id]);
  }


    comprobarUsuarioLibre(){
      this._usuarioService.getUsuarios().subscribe((data) => {
        console.log("comprobarUsuarioLibre:",data)

        //buscar uno con el nombre
        var bandera=0;
        for(let i = 0;i<data.length;i++){
          if(data[i].usuario ==this.pacienteForm.get('usuario')?.value){
            //alert("El usuario ya Existe")
            bandera=1;
            this.toastr.warning(
              'El usuario ya Existe!',
              'Cambie el Nombre de usuario!'
            );
          }
        }
        if(bandera==0){
          return
        }
      })
  }

  esMayor(){
    let fechaNac = this.pacienteForm.get('fechaNac')?.value;
    var fecha_nacimiento = fechaNac;
    var hoy = new Date();
    var cumpleanos = new Date(fecha_nacimiento);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    if (edad >= 18) {
       this.mostrarDatosTutor=0;
    }else{
      this.mostrarDatosTutor=1;
    }
  }


comprobarDisponibilidad(){
  this._usuarioService.getUsuarios().subscribe((data) => {
  var bandera=0;
  for(let i = 0;i<data.length;i++){
    if(data[i].usuario ==this.pacienteForm.get('usuario')?.value && this.titulo=="Registrar Paciente"){
      bandera=1;
      this.toastr.warning(
        'Nombre de Usuario Ya Existe',
        'Escoja otro Nombre de Usuario!',
        {
          timeOut: 8000,
          progressBar: true,
        }
      );
    }  
  }//for
  if(bandera==0){
    this.toastr.success(
      'Nombre de Usuario Disponible',
      'Puede usar Este usuario',
      {
        timeOut: 8000,
        progressBar: true,
      }
    );
  }
});
}


}
