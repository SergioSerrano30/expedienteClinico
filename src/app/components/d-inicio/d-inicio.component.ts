import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Expediente } from 'src/app/models/expediente';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { Paciente } from 'src/app/models/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-d-inicio',
  templateUrl: './d-inicio.component.html',
  styleUrls: ['./d-inicio.component.css']
})
export class DInicioComponent implements OnInit {
  listaExpedientes: Expediente[] = [];
  listaPacientes: Paciente[] = []
  constructor(
    public auth: AuthService,
    private _expedienteService: ExpedienteService,
    private _pacienteService: PacienteService, 
     private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.obtenerPacientes();
    this.obtenerExpedientes();
  }
  obtenerExpedientes(){
    this._expedienteService.getExpedientes().subscribe(data => {
      console.log(data);
      this.listaExpedientes = data;
    },error => {
      console.log(error);
    });    
  }
  eliminarExpediente(id:any){
    this._expedienteService.eliminarExpediente(id).subscribe(data => {
      this.toastr.error('Se ha eliminado correctamente','Expediente eliminado');
      this.obtenerExpedientes();
    },error =>{
      this.toastr.error(error,'Error')
    })
  }

  obtenerPacientes(){
    this._pacienteService.getPacientes().subscribe(data => {
      console.log(data);
      this.listaPacientes = data;
    },error => {
      console.log(error);
    });    
  }

  logOut(){
    this.auth.logout()
}
  

}
