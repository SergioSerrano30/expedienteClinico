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

  checkAlergias=false;
  checkCirugias=false;
  checkTraumas=false;
  checkCongenitas=false;
  checkHereditarias=false;

  titulo = 'Registrar Historia';
  id: string;
  idUM: string;
  idHM:string;
  idPAC:string;
  usuario: Usuario | null;
  nombre: string;
  rol: string;
  tipoOperacion='Registrar Historia';
  errorPAC = ''
  errorHIS = '-'
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

  errorNumConsulta=0;
  errorNumeroTel=0;
  errorPeso=0;
  errorEstatura=0;


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
    this.rol = '';


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
      this.errorHIS = ""
      this.esEditar();
    }else{
      this._usuarioService.obtenerUsuario(this.idPAC).subscribe((data) => {
       //console.log(data);
       this.errorPAC = "---"
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
      let usuarios_idPaciente=this.idPAC;

      let pesoInt = parseFloat(peso);
      let estaturaInt = parseFloat(estatura);

      //borrar datos de los switch inhabilidados
      if(this.titulo=="Editar Historia"){
        if(this.varAlergias==false)
        alergias='';
        if(this.varCirugias==false)
        cirugias='';
        if(this.varTraFracturas==false)
        traFracturas='';
        if(this.varEnfCongenitas==false)
        enfCongenitas='';
        if(this.varEnfHereditarias==false)
        enfHereditarias='';
      }
     

      //Validaciones----------------------------
      if(emeCelular.match("^[0-9]+$")==null ){  this.toastr.warning(
        'Telefono No Valido',
        'Corrija el Telefono!'
      ); return}

      if(estaturaInt< 0.1 || estaturaInt>300){ this.toastr.warning(
        'Estatura No Valida',
        'Corrija la Estatura de la Persona!'
      );  
        return}
      
        if(pesoInt< 0.1 || pesoInt>999){ this.toastr.warning(
          'Peso No Valido',
          'Corrija el Peso de la Persona!'
        );  
          return}

          if(emeNombre==""){ this.toastr.warning(
            'Nombre de emergencia no valido',
            'Contacto Invalido!'
          );  
            return}
  
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
          OPERACION.tipoOperacion = "Editar Historia"
          this.toastr.info(
            'Historia modificado con éxito!',
            'Historia Actualizada!'
          );
          this.irHistorias()
        },(err) => {
          this.router.navigate(['/error']);
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
            this.irHistorias()
          });
      
     }
     //Guardar Operacion
     this._operacionesService.guardarOperacion(OPERACION).subscribe((data) => {
      this.toastr.success(
        'Se ha guardado la Operacion con Exito!','Operacion Registrada!'
      );
    });
   
      
  }

  esEditar() {
    if (this.idHM !== null) {
      
     this.titulo = 'Editar Historia';
     this.tipoOperacion='Editar Historia';

     this._usuarioService.obtenerUsuario(this.idPAC).subscribe((dataPaciente) => {
      this.errorPAC = "---"
     this._historiaServices.obtenerHistoria("Historia",this.idHM,"-").subscribe((data) => {
      this.errorHIS = "---"
       this.varCirugias=true;
       this.varAlergias=true;
       this.varTraFracturas=true;
       this.varEnfCongenitas=true;
       this.varEnfHereditarias=true;
       this.checkCirugias=true;
       this.checkAlergias=true;
       this.checkTraumas=true;
       this.checkCongenitas=true;
       this.checkHereditarias=true;

         if(data.cirugias==""){
          this.varCirugias=false;
          this.checkCirugias=false;
         }
          
         if(data.alergias==""){
          this.varAlergias=false;
          this.checkAlergias=false;
         }
          
         if(data.traFracturas==""){
          this.varTraFracturas=false;
          this.checkTraumas=false;
         }
          
         if(data.enfCongenitas==""){
          this.varEnfCongenitas=false;
          this.checkTraumas=false;
         }
          
         if(data.enfHereditarias==""){
          this.varEnfHereditarias=false;
          this.checkHereditarias=false;
         }
           

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
     },(err) => {
      this.router.navigate(['/error']);
    }) 
   },(err) => {
    this.router.navigate(['/error']);
  }) 
    }
    //Recupera la informacion y la manda al formulario
     console.log("------------>"+this.errorHIS)
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
        this.rol = this.usuario?.usuario_rol.desRol + '';
        if(this.rol != "Terapeuta"){
          this.router.navigate(['/error']);
        }
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }

  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }

  irHistorias(){
    this.router.navigate(['/historia_lista/'+this.id+'/'+this.idPAC])
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


  metodoTelefono(){
    var numeroTel = this.historiaForm.get('emeCelular')?.value
    var numeroTelVerificado="";
    var ExpRegSoloNumeros="^[0-9]+$";

    for(var i=0;i<numeroTel.length;i++){
      if( numeroTel.match(ExpRegSoloNumeros)!=null ){
        numeroTelVerificado+=numeroTel[i];
        i++;
      }else{
        this.historiaForm.setValue({
          telefonoTutor:  numeroTelVerificado.substring(0, numeroTelVerificado.length - 1)
        })
      }
    }
    
    if(numeroTel.length>9){
      this.historiaForm.setValue({
        telefonoTutor: numeroTel[0] + numeroTel[1] + numeroTel[2] + numeroTel[3] + numeroTel[4] + numeroTel[5] + numeroTel[6] + numeroTel[7] + numeroTel[8] + numeroTel[9] 
      })
  }
} //telefono

tecleoNumeroConsulta(){
  this.errorNumConsulta = 0
  var num= parseInt(this.historiaForm.get('numConsultasTotales')?.value);
  if(num==0 || num>999)
  this.errorNumConsulta = 1
}

tecleoNumeroTel(){
  this.errorNumeroTel = 0
  var num= parseInt(this.historiaForm.get('emeCelular')?.value);
  if(num<1000000000)
  this.errorNumeroTel = 1
}

tecleoEstatura(){
  this.errorEstatura = 0
  var num= parseInt(this.historiaForm.get('estatura')?.value);
  if(num<=0 || num>300)
  this.errorEstatura = 1
}

tecleoPeso(){
  this.errorPeso = 0
  var num= parseInt(this.historiaForm.get('peso')?.value);
  if(num<=0 || num>=300)
  this.errorPeso = 1
}



}
