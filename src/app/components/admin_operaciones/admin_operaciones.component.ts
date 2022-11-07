import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Operacion } from 'src/app/models/operacion';
import { Usuario } from 'src/app/models/usuario';
import { OperacionService } from 'src/app/services/operacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin-operaciones',
  templateUrl: './admin_operaciones.component.html',
  styleUrls: ['./admin_operaciones.component.css'],
})
export class AdminOperacionesComponent implements OnInit {
  listOperaciones: Operacion[] = [];
  listOperacionesNombreU: Operacion[] = [];

  id: string;
  usuario: Usuario | null;
  nombre: string;


  constructor(
    private _opercionService: OperacionService,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerOperaciones();
    
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

  obtenerOperaciones() {
    this._opercionService.getOperaciones().subscribe(data => {
            //console.log(data);
            //console.log(data.length)
            //this.toastr.success('Usuarios cargados con éxito','Usuarios cargados');
            
            
            this.listOperaciones =data;
            this.listOperaciones.forEach(ops =>{
              this._usuarioService.obtenerUsuario(ops.usuario_idUsuario).subscribe((data) => {
                //console.log(data);
                const OPERACION:Operacion={
                  fechaRegistro: ops.fechaRegistro,
                  hora: ops.hora,
                  tipoOperacion: ops.tipoOperacion,
                  usuario_idUsuario: data.usuario_persona.nombre
                }
                this.listOperacionesNombreU.push(OPERACION)
                console.log(OPERACION)
              });
            })
            this.obtenerOperacionesNombre();
            //console.log(data[0].usuario)
          },error => {
            console.log(error);
          });
          
  }  
  

  obtenerOperacionesNombre(){
    


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
  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }

}