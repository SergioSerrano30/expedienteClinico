import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/models/consulta';
import { Usuario } from 'src/app/models/usuario';
import { ConsultaService } from 'src/app/services/consulta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terapeuta-consultas',
  templateUrl: './terapeuta-consultas.component.html',
  styleUrls: ['./terapeuta-consultas.component.css']
})
export class TerapeutaConsultasComponent implements OnInit {
  busquedaGroup: FormGroup;
  listConsulta: Consulta[] = [];
  id: string;
  usuarioForm: FormGroup;
  usuario: Usuario | null;
  nombre: string;
  rol: string;

  constructor( 
    private _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private aRouter: ActivatedRoute,
    private _consultaService: ConsultaService,
    private router:Router,
    private location: Location
    
  ) { 
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
    this.rol = ''

    this.busquedaGroup = fb.group({
      nombre: [''],
    });
  } 

  ngOnInit(): void {
    this.obtenerUsuario()
    this.obtenerConsultas()
  }
  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
        
      },(err) => {
        this.router.navigate(['/error']);
      }); 
    } 
  }

  irHistoriaLista(){
    //console.log(this.idPAC);
    this.location.back();
    //this.router.navigate(['/historia_lista/'+this.id+"/"+this.idPAC]);
  }

  obtenerConsultas() {
    this._consultaService
      .obtenerConsulta('Terapeuta', this.id)
      .subscribe((data) => {
        this.listConsulta = data;
        // this.idPAC = data.usuarios_idPaciente;
        console.log(this.listConsulta)
        console.log("----->"+this.listConsulta.length)
      });
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
