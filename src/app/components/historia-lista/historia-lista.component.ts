import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Historia } from 'src/app/models/historia';
import { Operacion } from 'src/app/models/operacion';
import { Usuario } from 'src/app/models/usuario';
import { HistoriaService } from 'src/app/services/historia.service';
import { OperacionService } from 'src/app/services/operacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';

@Component({
  selector: 'app-historia-lista',
  templateUrl: './historia-lista.component.html',
  styleUrls: ['./historia-lista.component.css'],
})
export class HistoriaListaComponent implements OnInit {
  historiaGroup: FormGroup;
  busquedaGroup: FormGroup;
  listHistoria: Historia[] = [];
  listConsulta: Consulta[] = [];
  id: string;
  idPAC: string;
  usuario: Usuario | null;
  nombre: string;
  nombrePAC: string;
  rol: string;
  errorHis = ""
  errorPAC = ""
  ocultas = false;
  palabra: string;
  aux: string;
  varNumconsultas:number;
  consultasActuales:number;

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();
  hora = this.today.getHours();
  minuto = this.today.getMinutes();

  horaHoyCorrecta: String;
  fechaHoyCorrecta: String;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _historiaService: HistoriaService,
    private _usuarioService: UsuarioService,
    private _operacionesService: OperacionService,
    private _consultasService: ConsultaService,
    private aRouter: ActivatedRoute
  ) {
    this.busquedaGroup = fb.group({
      nombre: [''],
    });
    this.historiaGroup = fb.group({
      problematica: [''],
    });

    this.palabra = this.aRouter.snapshot.paramMap.get('todas') + '';
    if (this.palabra == 'null') {
      this.aux = 'A';
    } else {
      this.aux = 'N';
    }
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idPAC = this.aRouter.snapshot.paramMap.get('idPAC') + '';
    this.usuario = null;
    this.nombre = '';
    this.nombrePAC = '';
    this.rol = '';
    this.varNumconsultas=0;
    this.consultasActuales=0;

  
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
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerPaciente();
    this.obtenerHistoriasPaciente();
  }

  obtenerHistoriasPaciente() {
    this._historiaService
      .obtenerHistoria('Paciente_Activas', this.idPAC,"-")
      .subscribe((data) => {
        this.listHistoria = data;
        this.ocultas = false;
      },(err) => {
        this.router.navigate(['/error']);
      });
  }
  obtenerHistoriasPacienteOcultas() {
    this._historiaService
      .obtenerHistoria('Paciente_Ocultas', this.idPAC,"-")
      .subscribe((data) => {
        this.listHistoria = data;
        this.ocultas = true;
      },(err) => {
        this.router.navigate(['/error']);
      });
  }


  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
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
  obtenerPaciente() {
    if (this.idPAC !== '') {
      this._usuarioService.obtenerUsuario(this.idPAC).subscribe((data) => {
        this.nombrePAC = data.usuario_persona.nombre + '';
        this.errorPAC = "---"
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }

  irNuevaHistoria() {
    this.router.navigate(['/historia_registro/' + this.id + '/' + this.idPAC]);
  }
  irModificarHistoria(idHM: string | undefined) {
    this.router.navigate([
      '/historia_editar/' + this.id + '/' + this.idPAC + '/' + idHM,
    ]);
  }

  obtenerHistoriasPorProblematica() {
    let nombre = this.busquedaGroup.get('nombre')?.value;
    if (nombre == '') {
      this.obtenerHistoriasPaciente();
    } else {
      this._historiaService
      .obtenerHistoria('Paciente_Activas_Nombre', this.idPAC,nombre)
      .subscribe((data) => {
        this.listHistoria = data;
        this.errorHis = "---"
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }

  irConsultas(idH: string | undefined) {
    this.router.navigate(['/paciente_consultas/' + this.id + '/' + idH]);
  }

  irPacienteLista() {
    this.router.navigate(['/paciente_lista/' + this.id]);
  }

  irLogin() {
    this.router.navigate(['/terapeuta_login']);
  }


  ocultarHistoria(idH: string | undefined) {
    this._historiaService 
      .obtenerHistoria('Historia', idH + '',"-")
      .subscribe((data) => {
        const HISTORIA: Historia = {
          problematica: data.problematica,
          fecRegistro: data.fecRegistro + '',
          fecNacimiento: data.fecNacimiento,
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
          numConsultasTotales: data.numConsultasTotales,
          estatus: 'N',
          usuarios_idTerapeuta: data.usuarios_idTerapeuta,
          usuarios_idPaciente: data.usuarios_idPaciente,
        };

        //alert(HISTORIA.estatus);
        const OPERACION: Operacion = {
          fechaRegistro: this.fechaHoyCorrecta + '',
          hora: this.horaHoyCorrecta + '',
          tipoOperacion: 'Ocultar Historia',
          usuarios_idUsuario: this.id,
        };

        //Guardar Operacion
        this._operacionesService
          .guardarOperacion(OPERACION)
          .subscribe((data) => {
            this.toastr.success(
              'Se ha guardado la Operacion con Exito!',
              'Operacion Registrada!'
            );
          });

        this._historiaService
          .editarHistoria(idH + '', HISTORIA)
          .subscribe((data) => {
            this.toastr.success(
              'Se Oculto Correctamente la Historia!',
              'Historia Eliminada!'
            );
          });
          window.location.reload();
      });
      
  }

  activarHistoria(idH: string | undefined) {
    this._historiaService 
      .obtenerHistoria('Historia', idH + '',"-")
      .subscribe((data) => {
        const HISTORIA: Historia = {
          problematica: data.problematica,
          fecRegistro: data.fecRegistro + '',
          fecNacimiento: data.fecNacimiento,
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
          numConsultasTotales: data.numConsultasTotales,
          estatus: 'A',
          usuarios_idTerapeuta: data.usuarios_idTerapeuta,
          usuarios_idPaciente: data.usuarios_idPaciente,
        };

   
        const OPERACION: Operacion = {
          fechaRegistro: this.fechaHoyCorrecta + '',
          hora: this.horaHoyCorrecta + '',
          tipoOperacion: 'Mostrar Historia Ocultada',
          usuarios_idUsuario: this.id,
        };

        //Guardar Operacion
        this._operacionesService
          .guardarOperacion(OPERACION)
          .subscribe((data) => {
            this.toastr.success(
              'Se ha guardado la Operacion con Exito!',
              'Operacion Registrada!'
            );
          });

        this._historiaService
          .editarHistoria(idH + '', HISTORIA)
          .subscribe((data) => {
            this.toastr.success(
              'Se volverá a mostrar la Historia!',
              'Historia restablecida!'
            );
          });
          window.location.reload();
      });
      
  }

  
}


