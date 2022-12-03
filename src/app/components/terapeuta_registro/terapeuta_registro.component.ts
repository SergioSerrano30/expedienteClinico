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
import { Operacion } from 'src/app/models/operacion';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-registro-d',
  templateUrl: './terapeuta_registro.component.html',
  styleUrls: ['./terapeuta_registro.component.css'],
})
export class RegistroDComponent implements OnInit {
  usuarioForm: FormGroup;
  titulo = 'Registrar Terapeuta';
  id: string;
  idUM: string;
  usuario: Usuario | null;
  nombre: string;
  rol = ''
  bandera=0;

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();
  year = this.today.getFullYear() - 18;
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
    this.usuarioForm = this.fb.group({
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

    if (this.hora < 9 && this.minuto < 9) {
      this.horaHoyCorrecta = '0' + this.hora + ':0' + this.minuto;
    } else if (this.hora < 9 && this.minuto > 9) {
      this.horaHoyCorrecta = '0' + this.hora + ':' + this.minuto;
    } else if (this.hora > 9 && this.minuto < 9) {
      this.horaHoyCorrecta = this.hora + ':0' + this.minuto;
    } else {
      this.horaHoyCorrecta = this.hora + ':' + this.minuto;
    }
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
        //console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
        if(this.rol != "Administrador"){
          this.router.navigate(['/error']);
        }
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }
  guardarTerapeuta() {
    //Comprobar Disponibilidad Usuario
    this._usuarioService.getUsuarios().subscribe((data) => {
      console.log("comprobarUsuarioLibre:",data)
      //buscar uno con el nombre 
      this.bandera=0;
      for(let i = 0;i<data.length;i++){
        if(data[i].usuario ==this.usuarioForm.get('usuario')?.value && this.titulo=='Registrar Terapeuta'){
          this.bandera=1;
        }
      }
    })

    if(this.bandera==1){
      this.toastr.warning(
        'Nombre de Usuario Ya Existe',
        'Escoja otro Nombre de Usuario!',
        {
          timeOut: 8000,
          progressBar: true,
        }
      );
     
    }else{

    let act = 'S';
    let idRol_PK = 2;
    let desRol = 'Terapeuta';
    let usuario = this.usuarioForm.get('usuario')?.value;
    let password = this.usuarioForm.get('password')?.value;
    let nombre = this.usuarioForm.get('nombre')?.value;
    let apPaterno = this.usuarioForm.get('apPaterno')?.value;
    let apMaterno = this.usuarioForm.get('apMaterno')?.value;
    let fechaNac = this.usuarioForm.get('fechaNac')?.value;
    let sexo = this.usuarioForm.get('sexo')?.value;
    let nombreTutor = this.usuarioForm.get('nombre')?.value;
    let apPaternoTutor = this.usuarioForm.get('apPaterno')?.value;
    let apMaternoTutor = this.usuarioForm.get('apMaterno')?.value;
    let fechaNacTutor = this.usuarioForm.get('fechaNac')?.value;
    let sexoTutor = this.usuarioForm.get('sexo')?.value;
    let telefonoTutor = this.usuarioForm.get('telefonoTutor')?.value;
    let parentesco = this.usuarioForm.get('parentesco')?.value;

    let calle = this.usuarioForm.get('calle')?.value;
    let numero_EXT = this.usuarioForm.get('numero_EXT')?.value;
    let numero_INT = this.usuarioForm.get('numero_INT')?.value;
    let colonia = this.usuarioForm.get('colonia')?.value;
    let entrecalle1 = this.usuarioForm.get('entrecalle1')?.value;
    let entrecalle2 = this.usuarioForm.get('entrecalle2')?.value;
    let referencia = this.usuarioForm.get('referencia')?.value;
    let pais = this.usuarioForm.get('pais')?.value;
    let estado = this.usuarioForm.get('estado')?.value;
    let municipio = this.usuarioForm.get('municipio')?.value;

    let tipoOperacion = 'Registrar Terapeuta';
    if (this.idUM.length > 5) {
      tipoOperacion = 'Editar Terapeuta';
    }
    let fechaRegistro = this.fechaHoyCorrecta + '';
    let hora = this.horaHoyCorrecta + '';
    let usuarios_idUsuario = this.id;

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
      telefonoTutor:telefonoTutor,
      parentesco:parentesco,
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
    if (this.passFormatoCorrecto(password)) {
      //Calcular edad
      var fecha_nacimiento = fechaNac;
      var hoy = new Date();
      var cumpleanos = new Date(fecha_nacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      if (edad >= 18) {
        //guardamos operacion
        this.guardarPersonaOperacion(OPERACION);
        if (this.idUM.length > 5) {
          //editamos
          this._usuarioService.editarUsuario(this.idUM, USUARIO).subscribe(
            (data) => {
              this.toastr.info(
                'Terapeuta modificado con éxito!',
                'Terapeuta modificado!'
              );
              this.router.navigate(['/terapeuta_lista/' + this.id]);
            },
            (error) => {
              console.log(error);
              this.usuarioForm.reset();
            }
          );
        } else {
          //guardamos terapeuta
          this.guardarPersona(PERSONA, DOMICILIO);
          this._usuarioService.guardarUsuario(USUARIO).subscribe((data) => {
            this.toastr.success(
              'Se ha guardado el terapeuta con éxito!',
              'Terapeuta registrado!'
              
            );
            this.router.navigate(['/terapeuta_lista/' + this.id]);
          });
        }
        
      } else {
        //else esMayorDeEdad
        this.toastr.warning(
          'Debe ser Mayor de edad',
          'Mayoria de edad no cumplida!',
          {
            timeOut: 8000,
            progressBar: true,
          }
        );
      }
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
  }

  guardarPersonaOperacion(op: Operacion) {
    this._operacionesService.guardarOperacion(op).subscribe((data) => {
      // this.router.navigate(['/paciente_lista/' + this.id]);
    },(err) => {
      this.router.navigate(['/error']);
    });
  }

  esEditar() {
    this.titulo = 'Editar Terapeuta';
    this._usuarioService.obtenerUsuario(this.idUM).subscribe((data) => {
      this.usuarioForm.setValue({
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
    },(err) => {
      this.router.navigate(['/error']);
    });
  }
  guardarPersona(per: Persona, dom: Domicilio) {
    //console.log(per);
    this.guardarDomicilio(dom);
    this._personaService.guardarPersona(per).subscribe((data) => {
      //this.router.navigate(['/terapeuta-inicio']);
    });
  }
  guardarDomicilio(dom: Domicilio) {
    //console.log(dom);
    this._domicilioService.guardarDomicilio(dom).subscribe((data) => {

      //this.router.navigate(['/terapeuta-inicio']);
    });
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
    this.router.navigate(['/terapeuta_lista/'+this.id]);
  }

  comprobarUsuarioLibre(){
    this._usuarioService.getUsuarios().subscribe((data) => {
      console.log("comprobarUsuarioLibre:",data)

      //buscar uno con el nombre
      var bandera=0;
      for(let i = 0;i<data.length;i++){
        if(data[i].usuario ==this.usuarioForm.get('usuario')?.value){
          //alert("El usuario ya Existe")
          bandera=1;
        }
      }
      if(bandera==1){
        this.toastr.warning(
          'El usuario ya Existe!',
          'Cambie el Nombre de usuario!'
        );
        return
      }
    })
}


comprobarDisponibilidad(){
  this._usuarioService.getUsuarios().subscribe((data) => {
  var bandera=0;
  for(let i = 0;i<data.length;i++){
    if(data[i].usuario ==this.usuarioForm.get('usuario')?.value && this.titulo=='Registrar Terapeuta'){
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
