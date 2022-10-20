import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Expediente } from 'src/app/models/expediente';
import { ExpedienteService } from 'src/app/services/expediente.service';

@Component({
  selector: 'app-editar-expediente',
  templateUrl: './editar-expediente.component.html',
  styleUrls: ['./editar-expediente.component.css']
})
export class EditarExpedienteComponent implements OnInit {
  expedienteForm: FormGroup;
  id: string | null;
  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private _expedienteService: ExpedienteService,
    private aRouter: ActivatedRoute) { 
    this.expedienteForm = this.fb.group({
      curp: ['',Validators.required],
      peso: ['',Validators.required],
      altura: ['',Validators.required],
      presion: ['',Validators.required],
      padecimiento: ['',Validators.required],
      medicacion: ['',Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.llenarCampos();
  }

  modificarExpediente(){
    let date: Date = new Date();
    
    const EXPEDIENTE: Expediente = {
      curp: this.expedienteForm.get('curp')?.value,
      peso:  this.expedienteForm.get('peso')?.value,
      altura:  this.expedienteForm.get('altura')?.value,
      presion:  this.expedienteForm.get('presion')?.value,
      padecimiento:  this.expedienteForm.get('padecimiento')?.value,
      medicacion:  this.expedienteForm.get('medicacion')?.value,
      
      doctor:  'TEST DOCTOR',
      fecha:  date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear()
    }

    //Editar producto
    if(this.id!==null){
      this._expedienteService.editarExpediente(this.id,EXPEDIENTE).subscribe(data =>{
        this.toastr.info('Expediente editado','Editado con éxito')
        this.router.navigate(['/doctor-inicio']);
      })
    }
  }
  llenarCampos(){
    if(this.id!==null){
      this._expedienteService.obtenerExpediente(this.id).subscribe(data =>{
          this.expedienteForm.setValue({
            curp: data.curp,
            peso: data.peso,
            altura: data.altura,
            presion: data.presion,
            padecimiento: data.padecimiento,
            medicacion: data.medicacion
          })
      })
    }
    
  }

}
