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
    private _historiaServices: HistoriaService,
    private _usuarioService: UsuarioService,
    private _operacionesService: OperacionService,
    private aRouter: ActivatedRoute,
  ) { 
    this.historiaForm = this.fb.group({
      nombre: ['', Validators.required],
      apPaterno: ['', Validators.required],
      apMaterno: ['', Validators.required],
      fechaNac: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
      estatura: ['', Validators.required],
      eme_Nombre: ['', Validators.required],
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
     })
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.usuario = null;
    this.nombre = '';

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
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if (this.idUM.length > 5) {
      this.esEditar();
    }
  }

  agregarHistoria(){
      let act = 'S';
      let idRol_PK = 3;
      let desRol = 'Paciente';
      let problema = "problema X"
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
  
      let tipoOperacion = 'Registrar Nueva Historia';
      let fechaRegistro = this.today;
      let fecharegistroString= fechaRegistro.toString();
      let hora = '12:12';
      let usuario_idUsuario = this.idUM;

       //Calcular Edad con cumpleaños
      var fecha_nacimiento='2000-11-11';
      var hoy = new Date();
      var cumpleanos = new Date(fecha_nacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();

      //Crear Objetos
      const HISTORIA: Historia = {
        problema: problema,
        fechaRegistro: fecharegistroString,
        fechaNacimiento: fechaNacimiento,
        edad: edad.toString(),
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
        usuario_idUsuario: usuario_idUsuario,
        persona_idPersona: usuario_idUsuario,
      }

      const OPERACION: Operacion = {
        fechaRegistro: fecharegistroString,
        hora: hora,
        tipoOperacion: tipoOperacion,
        usuario_idUsuario: usuario_idUsuario,
      };

     var guardado=false;
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

  esEditar() {
    if (this.idUM !== null) {//Recupera la informacion y la manda al formulario
      this.titulo = 'Editar Paciente';
      this._historiaServices.obtenerHistoria("Historia",this.idUM).subscribe((data) => {
        this.historiaForm.setValue({
          fechaRegistro: data.fecharegistroString,
          fechaNacimiento: data.fechaNacimiento,
          edad: data.edad,
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
          usuario_idUsuario: data.usuario_idUsuario,
          persona_idPersona: data.usuario_idUsuario,
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



}
