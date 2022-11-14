import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-terapeuta-consultas',
  templateUrl: './terapeuta-consultas.component.html',
  styleUrls: ['./terapeuta-consultas.component.css']
})
export class TerapeutaConsultasComponent implements OnInit {
  id: string;
  usuarioForm: FormGroup;
  usuario: Usuario | null;
  nombre: string;

  constructor( private _usuarioService: UsuarioService,
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
  }
  irConsultaRegistrar(){
    alert(this.id);
    this.router.navigate(['/consulta_registro/'+this.id]);
  }

  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }

  irPrincipal(){
    this.router.navigate(['/terapeuta_inicio/'+this.id]);
  }
}
