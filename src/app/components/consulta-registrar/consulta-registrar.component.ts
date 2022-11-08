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

  titulo = 'Registrar Consulta';
  id: string;
  idUM: string;
  idCM:string;
  usuario: Usuario | null;
  nombre: string;

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();
  year = this.today.getFullYear() - 18;
  year2 = this.year - 100;

  hora = this.today.getHours();
  minuto = this.today.getMinutes();

  // fechaHoy: String;
  // fechaMin: String;
  // fechaHoyCorrecta: String;
  // horaHoyCorrecta: String;


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
      numConsulta: ['', Validators.required],
      descripcion: ['', Validators.required],
      ejerciciosCasa: ['', Validators.required],
      horaRegistro: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idUM = this.aRouter.snapshot.paramMap.get('idUM') + '';
    this.idCM = this.aRouter.snapshot.paramMap.get('idCM') + '';
    this.usuario = null;
    this.nombre = '';
    //alert("constructor this.id:" +this.id);
   

  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if (this.idCM.length > 5) {
        this.esEditar();
    }
  }

  agregarConsulta(){
    let numConsulta = this.consultaForm.get('numConsulta')?.value;
    let descripcion = this.consultaForm.get('descripcion')?.value;
    let ejerciciosCasa = this.consultaForm.get('ejerciciosCasa')?.value;
    let horaRegistro = this.consultaForm.get('horaRegistro')?.value;
  
    let tipoOperacion = 'Registrar Nueva Consulta';
    //let fechaRegistro = this.today;
    let fechaRegistro = "2000-12-12";
    let fecharegistroString= fechaRegistro.toString();
    let hora = horaRegistro;
    let usuarios_idUsuario = this.id;
   


    let usuarios_idUsuario='usuarios_idUsuarios';
    let idHistoria="xxx"

       //Crear Objetos
       const CONSULTA: Consulta = {
        numConsulta: numConsulta,
        descripcion: descripcion,
        ejerciciosCasa:ejerciciosCasa,
        fechaRegistro:"2020-12-12",
        horaRegistro:horaRegistro,
        idHistoria:idHistoria,
        usuarios_idUsuario:usuarios_idUsuario

      }
      const OPERACION: Operacion = {
        fechaRegistro: fecharegistroString,
        hora: hora,
        tipoOperacion: tipoOperacion,
        usuarios_idUsuario: usuarios_idUsuario,
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
          //this.router.navigate(['/paciente_lista/' + this.id]);
        },
        (error) => {
          console.log(error);
          this.consultaForm.reset();
        }
      );
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
              //this.router.navigate(['/paciente_lista/' + this.id]);
            });
     }
     
 
  }

  esEditar(){
      if (this.idCM !== null) { //Recupera la informacion y la manda al formulario
        this.titulo = 'FORMULARIO: Editar Consulta';

        this._consultasService.obtenerConsulta("Consulta",this.idUM).subscribe((data) => {
          this.consultaForm.setValue({
            numConsulta: data.numConsulta,
            descripcion: data.descripcion,
            ejerciciosCasa: data.ejerciciosCasa,
           //fechaRegistro: data.fechaRegistro,
            fechaRegistro: "2000-12-12",
            horaRegistro: data.horaRegistro
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
      });
    }
  }

  irInicio(){

  }

  irLogin(){
    
  }
}
