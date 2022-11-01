import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-p-inicio',
  templateUrl: './paciente_inicio.component.html',
  styleUrls: ['./paciente_inicio.component.css'],
})
export class PInicioComponent implements OnInit {
  id: string;
  usuarioForm: FormGroup;
  usuario: Usuario | null;
  nombre: string;
  constructor(
    private _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
  }

  ngOnInit(): void {
    console.log('Desde inicio: ' + this.id);
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
  irLogin(){
    this.router.navigate(['/paciente_login'])
  }
}
