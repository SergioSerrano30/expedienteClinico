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
  idPAC:string;
  usuario: Usuario | null;
  nombre: string;
  tipoOperacion='Registrar Nueva Historia';

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

  varCirugias=false;
  varAlergias=false;
  varTraFracturas=false;
  varEnfCongenitas=false;
  varEnfHereditarias=false;


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
      fecNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      peso: ['', Validators.required],
      estatura: ['', Validators.required],
      emeNombre: ['', Validators.required],
      emeParentesco: ['', Validators.required],
      emeCelular: ['', Validators.required],
      alergias: ['', Validators.required],
      cirugias: ['', Validators.required],
      traFracturas: ['', Validators.required],
      enfCongenitas: ['', Validators.required],
      enfHereditarias: ['', Validators.required],
      observaciones: ['', Validators.required],
      otros: ['', Validators.required],
      numConsultasTotales: ['', Validators.required],
      problematica: ['', Validators.required],
     });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.idPAC = this.aRouter.snapshot.paramMap.get('idPAC') + '';
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
    }else{
      this._usuarioService.obtenerUsuario(this.idPAC).subscribe((data) => {
       //console.log(data);
        this.historiaForm.setValue({
          nombre: data.usuario_persona.nombre,
          apPaterno: data.usuario_persona.apPaterno,
          apMaterno: data.usuario_persona.apMaterno,
          fecNacimiento: data.usuario_persona.fechaNac,
          sexo: data.usuario_persona.sexo,

          peso: "",
          estatura :"",
          emeNombre :"",
          emeCelular :"",
          emeParentesco :"",
          alergias:"",
          cirugias :"",
          traFracturas :"",
          enfCongenitas:"",
          enfHereditarias :"",
          otros :"",
          observaciones :"",
          numConsultasTotales:"",
          problematica :"",
          // usuario: data.usuario,
          // password: data.password,
          // calle: data.usuario_persona.persona_domicilio.calle,
          // numero_EXT: data.usuario_persona.persona_domicilio.numero_EXT,
          // numero_INT: data.usuario_persona.persona_domicilio.numero_INT,
          // colonia: data.usuario_persona.persona_domicilio.colonia,
          // entrecalle1: data.usuario_persona.persona_domicilio.entrecalle1,
          // entrecalle2: data.usuario_persona.persona_domicilio.entrecalle2,
          // referencia: data.usuario_persona.persona_domicilio.referencia,
          // municipio: data.usuario_persona.persona_domicilio.municipio,
          // estado: data.usuario_persona.persona_domicilio.estado,
          // pais: data.usuario_persona.persona_domicilio.pais,
        });
      });
    }

  }

  

  agregarHistoria(){
      let act = 'S';
      let idRol_PK = 3;
      let desRol = 'Paciente';
      let fecNacimiento = this.historiaForm.get('fecNacimiento')?.value;
      let peso = this.historiaForm.get('peso')?.value;
      let estatura = this.historiaForm.get('estatura')?.value;
      let emeNombre = this.historiaForm.get('emeNombre')?.value;
      let emeCelular = this.historiaForm.get('emeCelular')?.value;
      let emeParentesco = this.historiaForm.get('emeParentesco')?.value;
      let alergias = this.historiaForm.get('alergias')?.value;
      let cirugias = this.historiaForm.get('cirugias')?.value;
      let traFracturas = this.historiaForm.get('traFracturas')?.value;
      let enfCongenitas = this.historiaForm.get('enfCongenitas')?.value;
      let enfHereditarias = this.historiaForm.get('enfHereditarias')?.value;
      let otros = this.historiaForm.get('otros')?.value;
      let observaciones = this.historiaForm.get('observaciones')?.value;
      let numConsultasTotales = this.historiaForm.get('numConsultasTotales')?.value;
      let problematica = this.historiaForm.get('problematica')?.value;

      let fecharegistroString= this.fechaHoyCorrecta;
      let hora = this.horaHoyCorrecta;
      let usuarios_idTerapeuta = this.id;
      // alert("id :"+this.id);
      // alert("idUM :"+this.idUM);
      let usuarios_idPaciente=this.idPAC;
  
      //Crear Objetos
      const HISTORIA: Historia = {
        problematica:problematica,
        fecRegistro: fecharegistroString+'',
        fecNacimiento: fecNacimiento,
        peso: peso,
        estatura: estatura,
        emeNombre: emeNombre,
        emeParentesco: emeParentesco,
        emeCelular: emeCelular,
        alergias: alergias,
        cirugias: cirugias,
        traFracturas: traFracturas,
        enfCongenitas: enfCongenitas,
        enfHereditarias: enfHereditarias,
        otros: otros,
        observaciones: observaciones,
        numConsultasTotales: numConsultasTotales,
        estatus:'A',
        usuarios_idTerapeuta: usuarios_idTerapeuta,
        usuarios_idPaciente: usuarios_idPaciente,
      }

      const OPERACION: Operacion = {
        fechaRegistro: this.fechaHoyCorrecta+'',
        hora: this.horaHoyCorrecta+'',
        tipoOperacion: this.tipoOperacion,
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
    if (this.idHM !== null) {
      
     this.titulo = 'Editar Historia';
     this.tipoOperacion='Editar Historia ya registrada';

     this._usuarioService.obtenerUsuario(this.idPAC).subscribe((dataPaciente) => {
     this._historiaServices.obtenerHistoria("Historia",this.idHM).subscribe((data) => {
       this.varCirugias=true;
       this.varAlergias=true;
       this.varTraFracturas=true;
       this.varEnfCongenitas=true;
       this.varEnfHereditarias=true;

         if(data.cirugias=="")
           this.varCirugias=false;
         if(data.alergias=="")
           this.varAlergias=false;
         if(data.traFracturas=="")
           this.varTraFracturas=false;
         if(data.enfCongenitas=="")
           this.varEnfCongenitas=false;
         if(data.enfHereditarias=="")
           this.varEnfHereditarias=false;
       
      


     //saber que switch habilitar
     //--------No funciono-------------------
     // if(data.alergias==="")
     //   this.varAlergias=false;
     //   else
     //   this.varAlergias=true;
     // if(data.cirugias="")
     //   this.varCirugias=false;
     //   else
     //   this.varCirugias=true;

     // if(data.traFracturas==!"")
     //   this.varTraFracturas=true;
     // if(data.enfCongenitas==!"")
     //   this.varEnfCongenitas=true;
     // if(data.enfHereditarias==!"")
     //   this.varEnfHereditarias=true;


       //console.log(data);
       this.historiaForm.setValue({
         nombre: dataPaciente.usuario_persona.nombre,
         apPaterno: dataPaciente.usuario_persona.apPaterno,
         apMaterno: dataPaciente.usuario_persona.apMaterno,
         fecNacimiento: dataPaciente.usuario_persona.fechaNac,
         sexo: dataPaciente.usuario_persona.sexo,

         problematica: data.problematica,
         peso: data.peso,
         estatura: data.estatura,
         emeNombre: data.emeNombre,
         emeParentesco: data.emeParentesco,
         emeCelular: data.emeCelular,
         alergias: data.alergias,
         cirugias: data.cirugias,
         traFracturas: data.traFracturas,
         enfCongenitas: data.enfCongenitas,
         enfHereditarias: data.enfHereditarias,
         otros: data.otros,
         observaciones: data.observaciones,
         numConsultasTotales: data.numConsultasTotales  
       })
     }) 
   }) 
    }
    //Recupera la informacion y la manda al formulario
     
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

  cambiarEstado1(){
    if(this.varAlergias)
    this.varAlergias=false;
    else
    this.varAlergias=true;
  }
  cambiarEstado2(){
    if(this.varCirugias)
    this.varCirugias=false;
    else
    this.varCirugias=true;
  }
  cambiarEstado3(){
    if(this.varTraFracturas)
    this.varTraFracturas=false;
    else
    this.varTraFracturas=true;
  }
  cambiarEstado4(){
    if(this.varEnfCongenitas)
    this.varEnfCongenitas=false;
    else
    this.varEnfCongenitas=true;
  }
  cambiarEstado5(){
    if(this.varEnfHereditarias)
    this.varEnfHereditarias=false;
    else
    this.varEnfHereditarias=true;
  }


}
