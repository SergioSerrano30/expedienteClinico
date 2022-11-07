import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consulta-registrar',
  templateUrl: './consulta-registrar.component.html',
  styleUrls: ['./consulta-registrar.component.css']
})
export class ConsultaRegistrarComponent implements OnInit {
  consultaForm: FormGroup;

  constructor( private fb: FormBuilder) { 
    this.consultaForm = this.fb.group({})
  }

  ngOnInit(): void {
  }

  agregarConsulta(){
    
  }

  irInicio(){

  }

  irLogin(){
    
  }
}
