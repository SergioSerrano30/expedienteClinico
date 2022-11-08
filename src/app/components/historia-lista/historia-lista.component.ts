import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Historia } from 'src/app/models/historia';
import { Usuario } from 'src/app/models/usuario';
import { HistoriaService } from 'src/app/services/historia.service';

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

  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth() + 1;
  año = this.today.getFullYear();

  fechaHoyCorrecta: String;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _historiaService: HistoriaService,
    private aRouter: ActivatedRoute
  ) {
    this.busquedaGroup = fb.group({
      nombre: [''],
    });
    this.historiaGroup = fb.group({
      problema: [''],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id') + '';
    this.idPAC = this.aRouter.snapshot.paramMap.get('idPAC') + '';
    this.usuario = null;
    this.nombre = '';

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
}
