import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Historia } from 'src/app/models/historia';
import { HistoriaService } from 'src/app/services/historia.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Operacion } from 'src/app/models/operacion';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-nueva-historia',
  templateUrl: './historia_registro.component.html',
  styleUrls: ['./historia_registro.component.css']
})
export class NuevaHistoriaComponent implements OnInit {
  historiaForm: FormGroup;

  titulo = 'Registrar Nueva Historia';
  id: string;
  idUM: string;
  idHM:string;
  usuario: Usuario | null;
  nombre: string;

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();
  year = this.today.getFullYear() - 18;
  year2 = this.year - 100;
  fechaHoy:String;
  fechaMin:String;

  hora = this.today.getHours();
  minuto = this.today.getMinutes();

  fechaHoyCorrecta: String;
  horaHoyCorrecta: String;
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _historiaServices: HistoriaService,
    private _usuarioService: UsuarioService,
    private _operacionesService: OperacionService,
    private aRouter: ActivatedRoute
  ) { 
    this.historiaForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      peso: ['', Validators.required],
      estatura: ['', Validators.required],
      emeNombre: ['', Validators.required],
      emeParentesco: ['', Validators.required],
      emeCelular: ['', Validators.required],
      alergias: ['', Validators.required],
      cirugias: ['', Validators.required],
      traumasFracturas: ['', Validators.required],
      enfCongenitas: ['', Validators.required],
      enfHereditarias: ['', Validators.required],
      observaciones: ['', Validators.required],
      otros: ['', Validators.required],
      numConsultasTotales: ['', Validators.required],
      problema: ['', Validators.required],
     });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.idHM = this.aRouter.snapshot.paramMap.get('idHM') + '';
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
    this.obtenerUsuario();
    if (this.idHM.length > 5) {
      this.esEditar();
    }
  }

  agregarHistoria(){
      let act = 'S';
      let idRol_PK = 3;
      let desRol = 'Paciente';

      let fechaNacimiento = this.historiaForm.get('fechaNacimiento')?.value;
      let peso = this.historiaForm.get('peso')?.value;
      let estatura = this.historiaForm.get('estatura')?.value;
      let emeNombre = this.historiaForm.get('emeNombre')?.value;
      let emeCelular = this.historiaForm.get('emeCelular')?.value;
      let emeParentesco = this.historiaForm.get('emeParentesco')?.value;
      let alergias = this.historiaForm.get('alergias')?.value;
      let cirugias = this.historiaForm.get('cirugias')?.value;
      let traumasFracturas = this.historiaForm.get('traumasFracturas')?.value;
      let enfCongenitas = this.historiaForm.get('enfCongenitas')?.value;
      let enfHereditarias = this.historiaForm.get('enfHereditarias')?.value;
      let otros = this.historiaForm.get('otros')?.value;
      let observaciones = this.historiaForm.get('observaciones')?.value;
      let numConsultasTotales = this.historiaForm.get('numConsultasTotales')?.value;
      let problema = this.historiaForm.get('problema')?.value;
  
      let tipoOperacion = 'Registrar Nueva Historia';
      let fechaRegistro = this.today;
      let fecharegistroString= fechaRegistro.toString();
      let hora = '12:12';
      let usuarios_idTerapeuta = this.id;
      
      // alert("id :"+this.id);
      // alert("idUM :"+this.idUM);
      let usuarios_idPaciente=this.idUM;
      let estatus="este es el status";

       //Calcular Edad con cumpleaños
      // var fecha_nacimiento='2000-11-11';
      // var hoy = new Date();
      // var cumpleanos = new Date(fecha_nacimiento);
      // var edad = hoy.getFullYear() - cumpleanos.getFullYear();

      //Crear Objetos
      const HISTORIA: Historia = {
        problema:problema,
        fechaRegistro: fecharegistroString,
        fechaNacimiento: fechaNacimiento,
        //edad: edad.toString(),
        peso: peso,
        estatura: estatura,
        emeNombre: emeNombre,
        emeParentesco: emeParentesco,
        emeCelular: emeCelular,
        alergias: alergias,
        cirugias: cirugias,
        traumasFracturas: traumasFracturas,
        enfCongenitas: enfCongenitas,
        enfHereditarias: enfHereditarias,
        otros: otros,
        observaciones: observaciones,
        numConsultasTotales: numConsultasTotales,
        estatus:estatus,
        usuarios_idTerapeuta: usuarios_idTerapeuta,
        usuarios_idPaciente: usuarios_idPaciente,
      }

      const OPERACION: Operacion = {
        fechaRegistro: fecharegistroString,
        hora: hora,
        tipoOperacion: tipoOperacion,
        usuarios_idUsuario: usuarios_idTerapeuta,
      };

     var guardado=false;
     if (this.idHM.length > 5) {
        //editamos
       this._historiaServices.editarHistoria(this.idHM, HISTORIA).subscribe(
        (data) => {
          this.toastr.info(
            'Historia modificado con éxito!',
            'Historia Actualizada!'
          );
          //this.router.navigate(['/paciente_lista/' + this.id]);
        },
        (error) => {
          console.log(error);
          this.historiaForm.reset();
        }
      );
     }else{
        //Guardar
        this._historiaServices.guardarHistoria(HISTORIA).subscribe((data) => {
          this.toastr.success(
            'Se ha guardado La historia  con éxito!',
            'Historia registrada!');
            guardado=true;
          });
      //Guardar Operacion
        this._operacionesService.guardarOperacion(OPERACION).subscribe((data) => {
          this.toastr.success(
            'Se ha guardado la Operacion con Exito!','Operacion Registrada!'
          );
        });
     }
      
  }

  esEditar() {
    //alert("id->"+this.id+"  idUM->"+this.idUM+"  idHM->"+this.idHM); 
         if (this.idHM !== null) {//Recupera la informacion y la manda al formulario
          this.titulo = 'Editar Historia';

          this._historiaServices.obtenerHistoria(this.idHM).subscribe((data) => {
            // alert(data.emeCelular);
            
            // console.log(data.apPaterno);
            // console.log(data.apMaterno);
            // console.log(data.fechaNac);
            // console.log(data.sexo);
            console.log(data);
            this.historiaForm.setValue({
              nombre:"nombre",
              apPaterno:"apPaterno",
              apMaterno:"amaterno",
              sexo:"sexo",
              problema: data.problema,
              //fechaRegistro: "2020-02-02",
              fechaNacimiento:"2020-02-02",
              peso: data.peso,
              estatura: data.estatura,
              emeNombre: data.emeNombre,
              emeParentesco: data.emeParentesco,
              emeCelular: data.emeCelular,
              alergias: data.alergias,
              cirugias: data.cirugias,
              traumasFracturas: data.traumasFracturas,
              enfCongenitas: data.enfCongenitas,
              enfHereditarias: data.enfHereditarias,
              otros: data.otros,
              observaciones: data.observaciones,
              numConsultasTotales: data.numConsultasTotales           
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

  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }

obtenerDatos(){
  // this._usuarioService.obtenerUsuario(this.idUM).subscribe((data) => {
  //   this.historiaForm.setValue({
  //     nombre: data.usuario_persona.nombre,
  //     apPaterno: data.usuario_persona.apMaterno
  //   });
  // });

  this._historiaServices.obtenerHistoria(this.idHM).subscribe((data) => {
    this.historiaForm.setValue({
      problema:data.problema,
      //edad: data.edad,
      nombre:"nombre",

      peso: data.peso,
      estatura: data.estatura,
      emeNombre: data.emeNombre,
      emeParentesco: data.emeParentesco,
      emeCelular: data.emeCelular,
      alergias: data.alergias,
      cirugias: data.cirugias,
      traumasFracturas: data.traumasFracturas,
      enfCongenitas: data.enfCongenitas,
      enfHereditarias: data.enfHereditarias,
      otros: data.otros,
      observaciones: data.observaciones,
      numConsultasTotales: data.numConsultasTotales,
      // status:data.status,
      // usuario_idUsuario: data.usuario_idUsuario,
      // persona_idPersona: data.usuario_idUsuario,
    });
  });



}

}
