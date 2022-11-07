import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-terapeuta',
  templateUrl: './terapeuta_inicio.component.html',
  styleUrls: ['./terapeuta_inicio.component.css'],
})
export class TerapeutaComponent implements OnInit {
  id: string;
  usuarioForm: FormGroup;
  usuario: Usuario | null;
  nombre: string;
  constructor(
    private _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private router:Router
  ) { 
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
  }

  ngOnInit(): void {
    this.obtenerUsuario();
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
  irPacientes(){
    this.router.navigate(['/paciente_lista/'+this.id]);
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
  irPrincipal(){
    this.router.navigate(['/terapeuta_inicio/'+this.id]);
  }
}
