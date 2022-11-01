import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Usuario} from 'src/app/models/usuario'
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  listUsuarios: Usuario[] = []
  intentos:number = 0;
  arc: HTMLElement | null

  constructor(private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router:Router,
    @Inject(DOCUMENT) archivo: Document) {
      this.loginForm = this.fb.group({
        usuario: ['',Validators.required],
        password: ['',Validators.required],
        
      }),
      this.arc = archivo.getElementById('login');
     }

 
    ngOnInit(): void {}

    autenticar(){
      let usuario = this.loginForm.get('usuario')?.value;
      let password = this.loginForm.get('password')?.value;

      this._usuarioService.getUsuarios().subscribe(data => {
        console.log(data);
        this.listUsuarios =data;
        let usuarios = this.listUsuarios;
        let i = 0;
        let key = -1;
        while (i<usuarios.length) {
          if(usuario === usuarios[i].usuario && password === usuarios[i].password && usuarios[i].activo==="S" && usuarios[i].usuario_rol.desRol === "Paciente"){
            key=i
            i=usuarios.length //Deja de evaluar
          }
          i++;
        }
        if(key!=-1){
          this.toastr.success('Bienvenido(a): '+usuarios[key].usuario_persona.nombre, 'Acceso concedido');
          this.router.navigate(['/paciente-inicio/'+usuarios[key]._id]);
          //console.log(usuarios[key]._id);
        }else{
          this.toastr.warning('Intentos: '+ ++this.intentos, 'Credenciales incorrectas');
          if(this.intentos===3){
            this.toastr.error('Has superado el número de intentos', 'Acceso denegado');
            
          }
        } 
      },error => {
        console.log(error);
      });
      
    }



}
