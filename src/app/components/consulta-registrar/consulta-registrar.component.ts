import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Operacion } from 'src/app/models/operacion';
import { OperacionService } from 'src/app/services/operacion.service';


@Component({
  selector: 'app-consulta-registrar',
  templateUrl: './consulta-registrar.component.html',
  styleUrls: ['./consulta-registrar.component.css']
})
export class ConsultaRegistrarComponent implements OnInit {
  consultaForm: FormGroup;

  tipoOperacion = 'Registrar Nueva Consulta';
  titulo = 'Registrar Consulta';
  id: string;
  idUM: string;
  idCM:string;
  idH:string;
  usuario: Usuario | null;
  nombre: string;
  rol:string;
  varEspacio:string;
  listConsulta: Consulta[] = [];
  varNumconsulta: number;
  



  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _usuarioService: UsuarioService,
    private _operacionesService: OperacionService,
    private _consultasService: ConsultaService,
    private aRouter: ActivatedRoute,
   
    ) { 
    this.consultaForm = this.fb.group({
      descripcion: ['', Validators.required],
      ejerciciosCasa: ['', Validators.required],
     
    })
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.idCM = this.aRouter.snapshot.paramMap.get('idCM') + '';
    this.idH = this.aRouter.snapshot.paramMap.get('idH') + '';
    this.usuario = null;
    this.nombre = '';
    this.rol='';
    this.varEspacio=''
    this.varNumconsulta=0;
   

   

  }

  ngOnInit(): void {
    
    this.obtenerUsuario();
    if (this.idCM.length > 5) {
        this.esEditar();
    }else{
      this.obtenerConsultas();
    }
  }

  agregarConsulta(){
    let descripcion = this.consultaForm.get('descripcion')?.value;
    let ejerciciosCasa = this.consultaForm.get('ejerciciosCasa')?.value;
    let horaRegistro = this.obtenerHora();
    let fechaRegistro =this.obtenerFecha();


    let usuarios_idUsuario = this.id;
    let idHistoria=this.idH;

       //Crear Objetos
       const CONSULTA: Consulta = {
        numConsulta: this.varNumconsulta+"",
        descripcion: descripcion,
        ejerciciosCasa:ejerciciosCasa,
        fechaRegistro:fechaRegistro+"",
        horaRegistro:horaRegistro+'',
        estatus: "A",
        idHistoria:idHistoria,
        usuarios_idUsuario:usuarios_idUsuario

      }
      const OPERACION: Operacion = {
        fechaRegistro:this.obtenerFecha()+'',
        hora:this.obtenerHora()+'',
        tipoOperacion: this.tipoOperacion,
        usuarios_idUsuario: usuarios_idUsuario,
        //idHistoria:idHistoria
      };

     var guardado=false;

     if (this.idCM.length > 5) {
       //editamos
       
       this._consultasService.editarConsulta(this.idCM, CONSULTA).subscribe(
        (data) => {
          this.toastr.info(
            'Consulta modificado con éxito!',
            'Consulta Actualizada!'
          );
          //Guardar Operacion
          this._operacionesService.guardarOperacion(OPERACION).subscribe((data) => {
            this.toastr.success(
              'Se ha guardado la Operacion con Exito!','Operacion Registrada!'
            );
            //this.router.navigate(['/paciente_lista/' + this.id]);
          });
          //this.router.navigate(['/paciente_lista/' + this.id]);
        },
        (error) => {
          console.log(error);
          this.consultaForm.reset();
        }
      );
      this.regresar();
     }else{
            //Guardar
            this._consultasService.guardarConsulta(CONSULTA).subscribe((data) => {
              this.toastr.success(
                'Se ha guardado La Consulta  con éxito!',
                'Consulta registrada!');
                guardado=true;
              });
          //Guardar Operacion
            this._operacionesService.guardarOperacion(OPERACION).subscribe((data) => {
              this.toastr.success(
                'Se ha guardado la Operacion con Exito!','Operacion Registrada!'
              );
            });
            this.regresar();
     }
     
 
  }

  esEditar(){
      if (this.idCM !== null) { //Recupera la informacion y la manda al formulario
        this.titulo = 'Editar Consulta';
        this.tipoOperacion='Editar Consulta ya Registrada';

        this._consultasService.obtenerConsulta("Consulta",this.idCM).subscribe((data) => {
          this.varNumconsulta=data.numConsulta;
          this.consultaForm.setValue({
            descripcion: data.descripcion,
            ejerciciosCasa: data.ejerciciosCasa,
  
          });
        });
      }
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        console.log(data);
        console.log(data.usuario_persona.nombre);
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

    regresar(){
      this.router.navigate(["paciente_consultas/"+this.id+"/"+this.idH])
    }
  

  obtenerFecha(){
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var año = today.getFullYear();
    var year = today.getFullYear() - 18;
    var fechaHoyCorrecta: String;
  
    if (day < 9 && month < 9) {
      fechaHoyCorrecta = año + '-0' + month + '-0' + day;
    } else if (day < 9 && month > 9) {
      fechaHoyCorrecta = año + '-' + month + '-0' + day;
    } else if (day > 9 && month < 9) {
      fechaHoyCorrecta = año + '-0' + month + '-' + day;
    } else {
      fechaHoyCorrecta = año + '-' + month + '-' + day;
    } 
    
    return fechaHoyCorrecta;
  }
  
  obtenerHora(){
    var today = new Date();
    var hora = today.getHours();
    var minuto = today.getMinutes();
  
    var horaHoyCorrecta: String;
    if(hora<9 && minuto<9){
      horaHoyCorrecta= "0"+hora+":0"+minuto;
    }else if(hora<9 && minuto>9){
      horaHoyCorrecta= "0"+hora+":"+minuto;
    }else if(hora>9 && minuto<9){
      horaHoyCorrecta= hora+":0"+minuto;
    }else{
      horaHoyCorrecta= hora+":"+minuto;
    }
  
    return horaHoyCorrecta;
  }


  obtenerConsultas() {
    this._consultasService
      .obtenerConsulta('Historia_Activas', this.idH)
      .subscribe((data) => {
        this.listConsulta = data;
        this.varNumconsulta =this.listConsulta.length + 1;
      }
      ,(err) => {
        this.varNumconsulta = 1;
      }
      );

  }
  }