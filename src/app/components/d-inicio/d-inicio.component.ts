import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
// import { Expediente } from 'src/app/models/expediente';
// import { ExpedienteService } from 'src/app/services/expediente.service';
// import { Paciente } from 'src/app/models/paciente';
// import { PacienteService } from 'src/app/services/paciente.service';
//import { AuthService } from '@auth0/auth0-angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Usuario} from 'src/app/models/usuario'

@Component({
  selector: 'app-d-inicio',
  templateUrl: './d-inicio.component.html',
  styleUrls: ['./d-inicio.component.css'],
})
export class DInicioComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  constructor(
    private _usuarioService: UsuarioService,
    private toastr: ToastrService
  ) 
  {}

  ngOnInit(): void {
    // this.obtenerPacientes();
    // this.obtenerExpedientes();
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this._usuarioService.getUsuarios().subscribe(data => {
            console.log(data);
            this.toastr.success('Usuarios cargados con éxito','Usuarios cargados');
            this.listUsuarios =data;
          },error => {
            console.log(error);
          });
  }

  

}
