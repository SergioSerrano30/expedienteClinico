import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { findIndex, Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TerapeutaService } from 'src/app/services/terapeuta.service';
import {Usuario} from 'src/app/models/usuario'
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
 
@Component({
  selector: 'app-inicio-admin-t',
  templateUrl: './terapeuta_lista.component.html',
  styleUrls: ['./terapeuta_lista.component.css']
})
export class InicioAdminTComponent implements OnInit {
  listUsuarios: Usuario[] = [];
  busquedaForm: FormGroup;
  id: string;
  usuario: Usuario | null;
  nombre: string;
 
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _terapeutaService: TerapeutaService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) 
  {
    this.busquedaForm = this.fb.group({
      nombre: ['']
    })
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
 
  obtenerUsuarios() {
    this._terapeutaService.getTerapeutas().subscribe(data => {
            //console.log(data);
            //console.log(data.length)
            //this.toastr.success('Usuarios cargados con éxito','Usuarios cargados');
            this.listUsuarios =data;
            //console.log(data[0].usuario)
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
  obtenerTerapeutaPorNombre(){
    let nombre = this.busquedaForm.get('nombre')?.value
    if(nombre==""){
      this.obtenerUsuarios()
    }else{
      this._usuarioService.obtenerUsuarioPorNombre("Terapeuta",nombre).subscribe((data)=>{
        this.listUsuarios = data
      }) 
    }
    
  }

  irNuevoTerapeuta(){
    this.router.navigate(['/terapeuta_registro/'+this.id]);
  } 
  irModificarTerapeuta(idUM:string|undefined){
    this.router.navigate(['/terapeuta_editar/'+this.id+'/'+idUM]);
  }
  irInicio(){
    let rol = this.usuario?.usuario_rol.desRol;
    console.log(rol)
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
  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }
 
}