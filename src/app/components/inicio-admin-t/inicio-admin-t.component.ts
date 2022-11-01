import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { findIndex, Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PacienteService } from 'src/app/services/paciente.service';
import {Usuario} from 'src/app/models/usuario'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio-admin-t',
  templateUrl: './inicio-admin-t.component.html',
  styleUrls: ['./inicio-admin-t.component.css']
})
export class InicioAdminTComponent implements OnInit {
  listUsuarios: Usuario[] = [];

  id: string;
  usuario: Usuario | null;
  nombre: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _pacienteService: PacienteService,
    private aRouter: ActivatedRoute,
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

}