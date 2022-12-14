import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { findIndex, Observable } from 'rxjs';
// import { Expediente } from 'src/app/models/expediente';
// import { ExpedienteService } from 'src/app/services/expediente.service';
// import { Paciente } from 'src/app/models/paciente';
// import { PacienteService } from 'src/app/services/paciente.service';
//import { AuthService } from '@auth0/auth0-angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-d-inicio',
  templateUrl: './paciente_lista.component.html',
  styleUrls: ['./paciente_lista.component.css'],
})
export class TInicioComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  busquedaForm: FormGroup;
  @ViewChild('word') wordS: ElementRef | undefined;
  id: string;
  usuario: Usuario | null;
  nombre: string;
  rol: string;

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _pacienteService: PacienteService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.busquedaForm = this.fb.group({
      nombre: [''],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
    this.rol = '';
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerUsuarios();
  }
  denegarAcceso(idPAC: string | undefined) {
    this._usuarioService.obtenerUsuario(idPAC + '').subscribe((data) => {
      const PACIENTE: Usuario = data;
      console.log(PACIENTE);
      PACIENTE.activo = "N"
      this._usuarioService.editarUsuario(idPAC+'', PACIENTE).subscribe(
        (data) => {
          this.obtenerUsuarios();
          this.toastr.info(
            'Se le ha denegado el acceso al sistema',
            'Acceso Denegado!'
          );
          this.router.navigate(['/paciente_lista/' + this.id]);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  concederAcceso(idPAC: string | undefined) {
    this._usuarioService.obtenerUsuario(idPAC + '').subscribe((data) => {
      const PACIENTE: Usuario = data;
      console.log(PACIENTE);
      PACIENTE.activo = "S"
      this._usuarioService.editarUsuario(idPAC+'', PACIENTE).subscribe(
        (data) => {
          this.obtenerUsuarios();
          this.toastr.info(
            'Se le ha concedido el acceso al sistema',
            'Acceso Concedido!'
          );
          this.router.navigate(['/paciente_lista/' + this.id]);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  obtenerUsuarios() {
    this._pacienteService.getPacientes().subscribe(
      (data) => {
 
        this.listUsuarios = data;
      }
      ,(err) => {
        this.router.navigate(['/error']);
      }
    );
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        //console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
        if(this.rol == "Paciente"){
          this.router.navigate(['/error']);
        }
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }
  obtenerPacientePorNombre() {
    let nombre = this.busquedaForm.get('nombre')?.value;
    if (nombre == '') {
      this.obtenerUsuarios();
    } else {
      this._usuarioService
        .obtenerUsuarioPorNombre('Paciente', nombre)
        .subscribe((data) => {
          this.listUsuarios = data;
        },(err) => {
          this.router.navigate(['/error']);
        });
    }
  }
  // irModificarPaciente(idSelec:string|un){
  //   this.router.navigate(['/editar-paciente/'+this.id]);
  // }
  irNuevoPaciente() {
    this.router.navigate(['/paciente_registro/' + this.id + '/']);
  }

  irModificarPaciente(idUM: string | undefined) {
    this.router.navigate(['/paciente_editar/' + this.id + '/' + idUM]);
  }

  irHistoriaPaciente(idUM: string | undefined) {
    this.router.navigate(['/historia_lista/' + this.id + '/' + idUM]);
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

  irLogin() {
    this.router.navigate(['/terapeuta_login']);
  }

  irHistoriaRegistro(idUM: string | undefined) {
    this.router.navigate(['/historia_registro/' + this.id + '/' + idUM]);
  }
}
