import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HistoriaService } from 'src/app/services/historia.service';
import { Historia } from 'src/app/models/historia';
import { ToastrService } from 'ngx-toastr';
import { Consulta } from 'src/app/models/consulta';
import { ConsultaService } from 'src/app/services/consulta.service';
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
  rol: string;

  porcentaje:number;
  numConsultaActual:number;
  numConsultasTotales:number;
  problematica:string;


  listHistoria: Historia[] = [];
  idUltimaHistoria:string;
  listConsulta: Consulta[] = [];
  idUltimaConsulta:string;

  constructor(
    private _usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
    private _historiaService: HistoriaService,
    private toastr: ToastrService,
    private _consultaService: ConsultaService,
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.usuario = null;
    this.nombre = '';
    this.rol = ''
    this.porcentaje=0;
    this.idUltimaHistoria="";
    this.idUltimaConsulta="";
    this.numConsultaActual=0;
    this.numConsultasTotales=0;
    this.problematica="";
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    this.obtenerHistoriasPaciente();
  }

  obtenerUsuario() {
    if (this.id !== '') {
      this._usuarioService.obtenerUsuario(this.id).subscribe((data) => {
        console.log(data);
        console.log(data.usuario_persona.nombre);
        this.usuario = data;
        this.nombre = this.usuario?.usuario_persona.nombre + '';
        this.rol = this.usuario?.usuario_rol.desRol+"";
        if(this.rol != "Paciente"){
          this.router.navigate(['/error']);
        }
      },(err) => {
        this.router.navigate(['/error']);
      });
    }
  }
  irLogin(){
    this.router.navigate(['/paciente_login'])
  }
  irPrincipal(){
    this.router.navigate(['/paciente_inicio/'+this.id]);
  }
  irConsultas(){
    this.router.navigate(['/paciente_historias/'+this.id]);
  }

  obtenerHistoriasPaciente() {
    this._historiaService
      .obtenerHistoria('Paciente_Activas', this.id,"-")
      .subscribe((data) => {
        this.listHistoria = data;
        console.log(">> obtenerHistoriasPaciente 1: ",data);
        this.numConsultasTotales=Number((data[data.length-1].numConsultasTotales))
        console.log(">> numConsultasTotales: ", this.numConsultasTotales);
        this.problematica=((data[data.length-1].problematica));

        this.obtenerConsultasPaciente((data[data.length-1]._id));
      
      

      },(err) => {
        this.router.navigate(['/error']);
      });
  }

  obtenerConsultasPaciente(idH:string){
      //console.log(">>desde obtenerConsultasPaciente: ",id)
        this._consultaService
          .obtenerConsulta('Historia_Activas', idH)
          .subscribe(
            (data) => {
              this.listConsulta = data;
              console.log(">>obtenerConsultasPaciente 1",data)
              this.numConsultaActual=Number(data[data.length-1].numConsulta)
              console.log(">>> numConsultaActual",this.numConsultaActual)
              this.porcentaje=(100/this.numConsultasTotales)*this.numConsultaActual;
              console.log(">>> porcentaje: ",this.porcentaje)
            },
            (err) => {
              console.log('Sin consultas');
            }
          );
  }


  
}
