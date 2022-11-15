import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/models/consulta';
import { Historia } from 'src/app/models/historia';
import { Usuario } from 'src/app/models/usuario';
import { ConsultaService } from 'src/app/services/consulta.service';
import { HistoriaService } from 'src/app/services/historia.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Operacion } from 'src/app/models/operacion';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-paciente-consultas',
  templateUrl: './paciente-consultas.component.html',
  styleUrls: ['./paciente-consultas.component.css']
})
export class PacienteConsultasComponent implements OnInit {
  consultaGroup: FormGroup;
  busquedaGroup: FormGroup;
  listConsulta: Consulta[] = [];
  id: string;
  idH: string;
  idCE:string;
  idPAC:string;
  usuario: Usuario | null;
  historia: Historia | null;
  nombre: string;
  rol: string;
  numConsultas = this.obtenerConsultas();

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();
  hora = this.today.getHours();
  minuto = this.today.getMinutes();
  
  fechaHoyCorrecta: String;
  horaHoyCorrecta: String;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _consultaService: ConsultaService,
    private _operacionesService: OperacionService,
    private _usuarioService: UsuarioService,
    private _historiaService: HistoriaService,
    private location: Location,
    private aRouter: ActivatedRoute
  ) { 
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idH = this.aRouter.snapshot.paramMap.get('idH') + '';
    this.idCE = this.aRouter.snapshot.paramMap.get('idCE') + '';
    this.idPAC = ''
    this.usuario = null;
    this.historia = null;
    this.nombre = '';
    this.rol = ''

    this.busquedaGroup = fb.group({
      nombre: [''],
    });
    this.consultaGroup = fb.group({
      problema: [''],
    });

    if (this.day < 9 && this.month < 9) {
      this.fechaHoyCorrecta = this.año + '-0' + this.month + '-0' + this.day;
    } else if (this.day < 9 && this.month > 9) {
      this.fechaHoyCorrecta = this.año + '-' + this.month + '-0' + this.day;
    } else if (this.day > 9 && this.month < 9) {
      this.fechaHoyCorrecta = this.año + '-0' + this.month + '-' + this.day;
    } else {
      this.fechaHoyCorrecta = this.año + '-' + this.month + '-' + this.day;
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

    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idH = this.aRouter.snapshot.paramMap.get('idH') + '';
  }

  ngOnInit(): void {
    this.obtenerUsuario()
    // this.obtenerHistoria()
    this.obtenerConsultas()
  }

  obtenerConsultas() {
    this._consultaService
      .obtenerConsulta('Historia_Activas', this.idH)
      .subscribe((data) => {
        this.listConsulta = data;
        return this.listConsulta.length;

      });
  }

  obtenerConsultasOcultas() {
    this._consultaService
      .obtenerConsulta('Historia_Ocultas', this.idH)
      .subscribe((data) => {
        this.listConsulta = data;
      });
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
      }); 
    } 
  } 
  // obtenerHistoria(){
  //   this._historiaService.obtenerHistoria("Historia_Activa",this.idH,"-").subscribe((data) => {
  //     this.historia = data;
  //     console.log(this.historia);
  //     console.log("->"+this.historia?.usuarios_idPaciente);
  //   })
  // }
 
  irNuevaConsulta(){
    this.router.navigate(['/consulta_registro/'+this.id+'/'+this.idH]);
  }

  irModificarConsulta(idCM: string| undefined){
    //alert(idCM);
    this.router.navigate(['/consulta_editar/'+this.id+'/'+this.idH+"/"+idCM]);
    
  }
 
  irHistoriaLista(){
    //console.log(this.idPAC);
    this.location.back();
    //this.router.navigate(['/historia_lista/'+this.id+"/"+this.idPAC]);
  }

  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }

  eliminarConsulta(ident:string | undefined){
    this._consultaService.obtenerConsulta("Consulta",ident+'').subscribe((data) => {
      const CONSULTA: Consulta = {
        numConsulta: data.numConsulta,
        descripcion: data.descripcion,
        ejerciciosCasa: data.ejerciciosCasa,
        fechaRegistro: data.fechaRegistro,
        horaRegistro: data.horaRegistro,
        estatus: "N",
        idHistoria: data.idHistoria,
        usuarios_idUsuario: data.usuarios_idUsuario
      }

      const OPERACION: Operacion = {
        fechaRegistro: this.fechaHoyCorrecta + '',
        hora: this.horaHoyCorrecta + '',
        tipoOperacion: 'Ocultar Consulta',
        usuarios_idUsuario: this.id,
      };
      console.log(CONSULTA)
      console.log(OPERACION)
      
        //Guardar Operacion
        this._operacionesService
          .guardarOperacion(OPERACION)
          .subscribe((data) => {
            this.toastr.success(
              'Se ha guardado la Operacion con Exito!',
              'Operacion Registrada!'
            );
          });
      this._consultaService.editarConsulta(ident+'',CONSULTA).subscribe((data) => {
        this.toastr.success(
          'Se Elimino Correctamente la Consulta!',
          'Consulta Eliminada!'
        );
        window.location.reload()
      });
      
    })
    

  }
  activarConsulta(ident:string | undefined){
    this._consultaService.obtenerConsulta("Consulta",ident+'').subscribe((data) => {
      const CONSULTA: Consulta = {
        numConsulta: data.numConsulta,
        descripcion: data.descripcion,
        ejerciciosCasa: data.ejerciciosCasa,
        fechaRegistro: data.fechaRegistro,
        horaRegistro: data.horaRegistro,
        estatus: "A",
        idHistoria: data.idHistoria,
        usuarios_idUsuario: data.usuarios_idUsuario
      }

      const OPERACION: Operacion = {
        fechaRegistro: this.fechaHoyCorrecta + '',
        hora: this.horaHoyCorrecta + '',
        tipoOperacion: 'Activar Consulta',
        usuarios_idUsuario: this.id,
      };
      console.log(CONSULTA)
      console.log(OPERACION)
      
        //Guardar Operacion
        this._operacionesService
          .guardarOperacion(OPERACION)
          .subscribe((data) => {
            this.toastr.success(
              'Se ha guardado la Operacion con Exito!',
              'Operacion Registrada!'
            );
          });
      this._consultaService.editarConsulta(ident+'',CONSULTA).subscribe((data) => {
        this.toastr.success(
          'Se Activó Correctamente la Consulta!',
          'Consulta Activada!'
        );
        window.location.reload()
      });
      
    })
    

  }

 
}


