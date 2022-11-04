import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-historia',
  templateUrl: './nueva-historia.component.html',
  styleUrls: ['./nueva-historia.component.css']
})
export class NuevaHistoriaComponent implements OnInit {
  historiaForm: FormGroup;



  constructor(
    private fb: FormBuilder,
  ) { 
    this.historiaForm = this.fb.group({})
  }

  ngOnInit(): void {
    
  }

  agregarHistoria(){
    
  }

  irInicio(){

  }


  
}
