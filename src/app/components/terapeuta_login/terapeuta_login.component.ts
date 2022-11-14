import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import { Operacion } from 'src/app/models/operacion';
import { OperacionService } from 'src/app/services/operacion.service';

@Component({
  selector: 'app-login-d',
  templateUrl: './terapeuta_login.component.html',
  styleUrls: ['./terapeuta_login.component.css'],
})

export class LoginDComponent implements OnInit {
  loginForm: FormGroup;
  titulo = 'Registrar Paciente';
  listUsuarios: Usuario[] = [];
  intentos: number = 0;
  bloqueo="true";
  tipoOperacion = '';

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

  ngOnInit(): void {
    var bloquearBoton = document.getElementById('btnLogin');
  }

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
            this.router.navigate(['/terapeuta_inicio/' + usuarios[key]._id]);
            //console.log(usuarios[key]._id);
          } 
          else if(usuarios[key].usuario_rol.desRol === 'Administrador'){
            this.toastr.success(
              'Bienvenido(a): ' + usuarios[key].usuario_persona.nombre,
              'Acceso concedido'
            );
            this.router.navigate(['/admin_inicio/' + usuarios[key]._id]);
          }
        } else {
          this.toastr.warning(
            'Intentos: ' + ++this.intentos,
            'Credenciales incorrectas'
          );
          if (this.intentos === 3) {
            this.toastr.error('Has superado el número de intentos', 'Acceso denegado');
            setTimeout(this.reiniciarIntentos,5000);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  reiniciarIntentos(){
    this.router.navigate(['/principal/']);
  }
     


obtenerFecha(){
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var año = today.getFullYear();
  var year = today.getFullYear() - 18;
  var fechaHoyCorrecta: String;

  if (day < 9 && month < 9) {
    fechaHoyCorrecta = año + '-0' + month + '-0' + day;
  } else if (day < 9 && month > 9) {
    fechaHoyCorrecta = año + '-' + month + '-0' + day;
  } else if (day > 9 && month < 9) {
    fechaHoyCorrecta = año + '-0' + month + '-' + day;
  } else {
    fechaHoyCorrecta = año + '-' + month + '-' + day;
  } 

  return fechaHoyCorrecta;
}

obtenerHora(){
  var today = new Date();
  var hora = today.getHours();
  var minuto = today.getMinutes();

  var horaHoyCorrecta: String;
  if(hora<9 && minuto<9){
    horaHoyCorrecta= "0"+hora+":0"+minuto;
  }else if(hora<9 && minuto>9){
    horaHoyCorrecta= "0"+hora+":"+minuto;
  }else if(hora>9 && minuto<9){
    horaHoyCorrecta= hora+":0"+minuto;
  }else{
    horaHoyCorrecta= hora+":"+minuto;
  }

  return horaHoyCorrecta;
}

}