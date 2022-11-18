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
  selector: 'app-paciente-historias',
  templateUrl: './paciente-historias.component.html',
  styleUrls: ['./paciente-historias.component.css'],
})
export class PacienteHistoriasComponent implements OnInit {
  historiaGroup: FormGroup;
  busquedaGroup: FormGroup;
  listHistoria: Historia[] = [];
  id: string;
  usuario: Usuario | null;
  nombre: string;
  rol: string;

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
    private aRouter: ActivatedRoute
  ) {
    this.busquedaGroup = fb.group({
      nombre: [''],
    });
    this.historiaGroup = fb.group({
      problematica: [''],
    });

    
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
    this.rol = '';

    //alert(this.palabra);

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
    this.obtenerHistoriasPaciente();
  }

  obtenerHistoriasPaciente() {
    this._historiaService
      .obtenerHistoria('Paciente_Activas', this.id,"-")
      .subscribe((data) => {
        this.listHistoria = data;
        console.log(data)
      },(err) => {
        this.router.navigate(['/error']);
      });
  }



  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        // console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }

  irConsultas(idH: string | undefined) {
    this.router.navigate(['/paciente_consultas/' + this.id + '/' + idH]);
  }

  irLogin() {
    this.router.navigate(['/terapeuta_login']);
  }

  
  irInicio(){
    let rol = this.usuario?.usuario_rol.desRol;
    switch (rol) {
      case "Paciente":
        this.router.navigate(['/paciente_inicio/' + this.id])
        break;
        case "Administrador":
        this.router.navigate(['/admin_inicio/' + this.id])
        break;
        case "Terapeuta":
        this.router.navigate(['/terapeuta_inicio/' + this.id])
        break;
      
      default:
        break;
    }
  }
}
