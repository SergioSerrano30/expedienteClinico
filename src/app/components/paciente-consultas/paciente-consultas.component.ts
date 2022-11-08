import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from 'src/app/models/consulta';
import { Historia } from 'src/app/models/historia';
import { Usuario } from 'src/app/models/usuario';
import { ConsultaService } from 'src/app/services/consulta.service';
import { HistoriaService } from 'src/app/services/historia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-paciente-consultas',
  templateUrl: './paciente-consultas.component.html',
  styleUrls: ['./paciente-consultas.component.css']
})
export class PacienteConsultasComponent implements OnInit {
  consultaGroup: FormGroup;
  busquedaGroup: FormGroup;
  listConsulta: Consulta[] = [];
  id: string;
  idH: string;
  usuario: Usuario | null;
  historia: Historia | null;
  nombre: string;
  rol: string;

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();

  fechaHoyCorrecta: String;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _consultaService: ConsultaService,
    private _usuarioService: UsuarioService,
    private _historiaService: HistoriaService,
    private aRouter: ActivatedRoute
  ) { 
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idH = this.aRouter.snapshot.paramMap.get('idH') + '';
    this.usuario = null;
    this.historia = null;
    this.nombre = '';
    this.rol = ''

    this.busquedaGroup = fb.group({
      nombre: [''],
    });
    this.consultaGroup = fb.group({
      problema: [''],
    });

    if (this.day < 9 && this.month < 9) {
      this.fechaHoyCorrecta = this.año + '-0' + this.month + '-0' + this.day;
    } else if (this.day < 9 && this.month > 9) {
      this.fechaHoyCorrecta = this.año + '-' + this.month + '-0' + this.day;
    } else if (this.day > 9 && this.month < 9) {
      this.fechaHoyCorrecta = this.año + '-0' + this.month + '-' + this.day;
    } else {
      this.fechaHoyCorrecta = this.año + '-' + this.month + '-' + this.day;
    }
  }

  ngOnInit(): void {
    this.obtenerUsuario()
    this.obtenerHistoria()
    this.obtenerConsultas()
  }

  obtenerConsultas() {
    this._consultaService
      .obtenerConsulta('Historia', this.idH)
      .subscribe((data) => {
        this.listConsulta = data;
        console.log(this.listConsulta)
      });
  }
  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        console.log(data);
        //console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol + '';
      }); 
    } 
  }
  obtenerHistoria(){
    this._historiaService.obtenerHistoria("Historia",this.idH).subscribe((data) => {
      this.historia = data;
      console.log(this.historia);
      console.log("->"+this.historia?.usuarios_idPaciente);
    })
  }
 
  irNuevaConsulta(){
    this.router.navigate(['/consulta_registro/'+this.id+'/'+this.idH]);
  }
  irModificarConsulta(idCM: string| undefined){
    this.router.navigate(['/historia_editar/'+this.id+'/'+this.idH+"/"+idCM]);
  }
 
  irHistoriaLista(){
    this.router.navigate(['/historia_lista/'+this.id+"/"+this.historia?.usuarios_idPaciente]);
  }

  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }
}
