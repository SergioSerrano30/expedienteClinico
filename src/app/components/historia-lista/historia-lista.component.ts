import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Historia } from 'src/app/models/historia';
import { Usuario } from 'src/app/models/usuario';
import { HistoriaService } from 'src/app/services/historia.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-historia-lista',
  templateUrl: './historia-lista.component.html',
  styleUrls: ['./historia-lista.component.css'],
})
export class HistoriaListaComponent implements OnInit {
  historiaGroup: FormGroup;
  busquedaGroup: FormGroup;
  listHistoria: Historia[] = [];
  id: string;
  idPAC: string;
  usuario: Usuario | null;
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
    private _historiaService: HistoriaService,
    private _usuarioService: UsuarioService,
    private aRouter: ActivatedRoute
  ) {
    this.busquedaGroup = fb.group({
      nombre: [''],
    });
    this.historiaGroup = fb.group({
      problematica: [''],
    });
    
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idPAC = this.aRouter.snapshot.paramMap.get('idPAC') + '';
    this.usuario = null;
    this.nombre = '';
    this.rol = ''

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
    this.obtenerHistoriasPaciente()
  }

  obtenerHistoriasPaciente() {
    this._historiaService
      .obtenerHistoria('Paciente', this.idPAC)
      .subscribe((data) => {
        this.listHistoria = data;
        console.log(this.listHistoria)
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


  irNuevaHistoria(){
    this.router.navigate(['/historia_registro/'+this.id+'/'+this.idPAC]);
  }
  irModificarHistoria(idHM: string| undefined){
    this.router.navigate(['/historia_editar/'+this.id+'/'+this.idPAC+"/"+idHM]);
  }

  irConsultas(idH: string| undefined){
    this.router.navigate(['/paciente_consultas/'+this.id+'/'+idH]);
  }
 
  irPacienteLista(){
    this.router.navigate(['/paciente_lista/'+this.id]);
  }

  irLogin(){
    this.router.navigate(['/terapeuta_login'])
  }



  ocultarHistoria(idH:string | undefined){
    this._historiaService.obtenerHistoria("Historia",idH+'').subscribe((data) => {
          const HISTORIA: Historia = {
            problematica:data.problematica,
            fecRegistro: data.fecharegistroString+'',
            fecNacimiento: data.fecNacimiento,
            peso: data.peso,
            estatura: data.estatura,
            emeNombre: data.emeNombre,
            emeParentesco: data.emeParentesco,
            emeCelular: data.emeCelular,
            alergias: data.alergias,
            cirugias: data.cirugias,
            traFracturas: data.traFracturas,
            enfCongenitas: data.enfCongenitas,
            enfHereditarias: data.enfHereditarias,
            otros: data.otros,
            observaciones: data.observaciones,
            numConsultasTotales: data.numConsultasTotales,
            estatus:"N",
            usuarios_idTerapeuta: data.usuarios_idTerapeuta,
            usuarios_idPaciente: data.usuarios_idPaciente,
          };
     
          alert(HISTORIA.estatus);
          console.log(data);

     this._historiaService.editarHistoria(idH+'',HISTORIA).subscribe((data) => {
          // this.toastr.success(
          //   'Se Oculto Correctamente la Historia!',
          //   'historia Eliminada!'
          // );
          alert("Historia Ocultada Correctamente");
          
        });
      });
  }
}
  
