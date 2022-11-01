import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-d',
  templateUrl: './terapeuta_login.component.html',
  styleUrls: ['./terapeuta_login.component.css'],
})
export class LoginDComponent implements OnInit {
  loginForm: FormGroup;
  listUsuarios: Usuario[] = [];
  intentos: number = 0;
  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  autenticar() {
    let usuario = this.loginForm.get('usuario')?.value;
    let password = this.loginForm.get('password')?.value;

    this._usuarioService.getUsuarios().subscribe(
      (data) => {
        console.log(data);
        this.listUsuarios = data;
        let usuarios = this.listUsuarios;
        let i = 0;
        let key = -1;
        while (i < usuarios.length) {
          if (
            usuario === usuarios[i].usuario &&
            password === usuarios[i].password &&
            usuarios[i].activo === 'S' &&
            (usuarios[i].usuario_rol.desRol === 'Terapeuta' ||
              usuarios[i].usuario_rol.desRol === 'Administrador')
          ) {
            key = i;
            i = usuarios.length; //Deja de evaluar
          }
          i++;
        }
        if (key != -1) {
          if (usuarios[key].usuario_rol.desRol === 'Terapeuta') {
            this.toastr.success(
              'Bienvenido(a): ' + usuarios[key].usuario_persona.nombre,
              'Acceso concedido'
            );
            this.router.navigate(['/terapeuta-inicio/' + usuarios[key]._id]);
            //console.log(usuarios[key]._id);
          } 
          else if(usuarios[key].usuario_rol.desRol === 'Administrador'){
            this.toastr.success(
              'Bienvenido(a): ' + usuarios[key].usuario_persona.nombre,
              'Acceso concedido'
            );
            this.router.navigate(['/admin-inicio/' + usuarios[key]._id]);
          }
        } else {
          this.toastr.warning(
            'Intentos: ' + ++this.intentos,
            'Credenciales incorrectas'
          );
          if (this.intentos === 3) {
            this.toastr.error(
              'Has superado el número de intentos',
              'Acceso denegado'
            );
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
