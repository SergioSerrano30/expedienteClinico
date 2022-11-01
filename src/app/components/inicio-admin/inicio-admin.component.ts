import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  id: string;
  usuarioForm: FormGroup;
  usuario: Usuario | null;
  nombre: string;
  constructor(
    private _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router:Router,
    private aRouter: ActivatedRoute) {
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
        console.log(data);
        console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
      });
    }
  }
  irTerapeutas(){
    this.router.navigate(['/inicio-admin-t/' + this.id])
  }
  irPacientes(){
    this.router.navigate(['/terapeuta-inicio-pacientes/' + this.id])
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
