import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { findIndex, Observable } from 'rxjs';
// import { Expediente } from 'src/app/models/expediente';
// import { ExpedienteService } from 'src/app/services/expediente.service';
// import { Paciente } from 'src/app/models/paciente';
// import { PacienteService } from 'src/app/services/paciente.service';
//import { AuthService } from '@auth0/auth0-angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PacienteService } from 'src/app/services/paciente.service';
import {Usuario} from 'src/app/models/usuario'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-d-inicio',
  templateUrl: './t-inicio.component.html',
  styleUrls: ['./t-inicio.component.css'],
})
export class TInicioComponent implements OnInit {
  listUsuarios: Usuario[] = [];

  id: string;
  usuario: Usuario | null;
  nombre: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _pacienteService: PacienteService,
    private aRouter: ActivatedRoute,
    private router:Router,
    private toastr: ToastrService
  ) 
  {
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
  }

  ngOnInit(): void {
    // this.obtenerPacientes();
    // this.obtenerExpedientes();
    this.obtenerUsuarios();
    this.obtenerUsuario();
    //this.fnchola();
  }
  fnchola(){
    //console.log("Hola");
    // let dom = this.listUsuarios[0].usuario_persona[0].persona_domicilio[0].calle;
    // console.log(dom);
     
  }
 
  obtenerUsuarios() {
    this._pacienteService.getPacientes().subscribe(data => {
            console.log(data);
            //console.log(data.length)
            //this.toastr.success('Usuarios cargados con éxito','Usuarios cargados');
            this.listUsuarios =data;
            console.log(data[0].usuario)
          },error => {
            console.log(error);
          });
  }

  // obtenerPacientesActivos(){
  //   this._pacienteService.getPacientesActivos().subscribe(data => {
  //     console.log(data);
  //     //console.log(data.length)
  //     //this.toastr.success('Usuarios cargados con éxito','Usuarios cargados');
  //     this.listUsuarios =data;
  //   },error => {
  //     console.log(error);
  //   });
  // }
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
  // irModificarPaciente(idSelec:string|un){
  //   this.router.navigate(['/editar-paciente/'+this.id]);
  // }
  irNuevoPaciente(){
    this.router.navigate(['/registro-paciente/'+this.id+'/']);
  }
  irModificarPaciente(idUM:string|undefined){
    this.router.navigate(['/editar-paciente/'+this.id+'/'+idUM]);
  }
  irInicio(){
    let rol = this.usuario?.usuario_rol.desRol;
    switch (rol) {
      case "Paciente":
        this.router.navigate(['/paciente-inicio/' + this.id])
        break;
        case "Administrador":
        this.router.navigate(['/admin-inicio/' + this.id])
        break;
        case "Terapeuta":
        this.router.navigate(['/terapeuta-inicio/' + this.id])
        break;
    
      default:
        break;
    } 
  }
  irLoginD(){
    this.router.navigate(['/loginD'])
  }

  

}
