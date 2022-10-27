import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { findIndex, Observable } from 'rxjs';
// import { Expediente } from 'src/app/models/expediente';
// import { ExpedienteService } from 'src/app/services/expediente.service';
// import { Paciente } from 'src/app/models/paciente';
// import { PacienteService } from 'src/app/services/paciente.service';
//import { AuthService } from '@auth0/auth0-angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Usuario} from 'src/app/models/usuario'
import { Usuario_Rol } from 'src/app/models/usuario_rol';

@Component({
  selector: 'app-d-inicio',
  templateUrl: './d-inicio.component.html',
  styleUrls: ['./d-inicio.component.css'],
})
export class DInicioComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  listUsuarios_Rol: Usuario_Rol[] = [];
  constructor(
    private _usuarioService: UsuarioService,
    private toastr: ToastrService
  ) 
  {}

  ngOnInit(): void {
    // this.obtenerPacientes();
    // this.obtenerExpedientes();
    this.obtenerUsuarios();
    this.obtenerRoles();
    //this.fnchola();
  }
  fnchola(){
    console.log("Hola");
    this.listUsuarios.forEach(lista =>{
      console.log(lista.usuario_rol.desRol)
    })
  }

  obtenerUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
            console.log(data);
            //console.log(data.length)
            this.toastr.success('Usuarios cargados con éxito','Usuarios cargados');
            this.listUsuarios =data;
          },error => {
            console.log(error);
          });
  }
  obtenerRoles(){
    this._usuarioService.getUsuarios().subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        //console.log(index);
        //console.log(data[index].usuario_rol[0].desRol);
        let rol = data[index].usuario_rol;
        this.listUsuarios_Rol.push(rol);
      }
      //console.log(this.listUsuarios_Rol);
      //this.toastr.success('Roles cargados con éxito','Roles cargados');
            
      //console.log(data.length)
    },error => {
      console.log(error);
    });
  }
  
  
}
